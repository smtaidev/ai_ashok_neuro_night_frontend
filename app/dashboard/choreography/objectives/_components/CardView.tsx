"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MoreHorizontal, X, Loader2, Edit, Trash2 } from "lucide-react"
import {
  type IObjective,
  type IObjectiveRequest,
  useDeleteObjectiveMutation,
  useGetAllObjectivesQuery,
  useUpdateObjectiveMutation,
} from "@/redux/api/choreograph/objectivesApi"
import { useGetAllMembersQuery } from "@/redux/api/choreograph/teamMemberApi"
import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi"
import { useGetAllChoreographTeamsQuery } from "@/redux/api/choreograph/choreographApi"
import { useGetAllOrganizationUsersQuery } from "@/redux/api/OrganizationUser/organizationUserApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/utils/formatDate"

interface FormErrors {
  [key: string]: string
}

interface ApiError {
  data?: {
    message?: string
  }
  message?: string
}

const CardView: React.FC = () => {
  // State Management
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingObjective, setEditingObjective] = useState<IObjective | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const router = useRouter()

  const [formData, setFormData] = useState<IObjectiveRequest>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    progress: "",
    fundingAllocated: "",
    envSocialIssues: "No",
    envSocialDetails: "",
    risksAssociated: "No",
    riskDetails: { lavel: "", description: "" },
    objectiveOwner: "",
    assignedTeamMembers: [],
    invitedTeamMembers: [],
    crossTeamCollaboration: "No",
    businessGoals: "",
    termType: "",
    specificStrategic: "Yes",
    necessaryResources: "Yes",
    additionalTalent: "",
    potentialChallenges: { lavel: "", description: "" },
  })

  // API Hooks
  const {
    data: objectivesData,
    isLoading: isLoadingObjectives,
    error: objectivesError,
    refetch: refetchObjectives,
  } = useGetAllObjectivesQuery()

  // const startTarikh = objectivesData?.data?.objectives?.[0]?.startDate
  // const endTarikh = objectivesData?.data?.objectives?.[0]?.endDate

  const [updateObjective, { isLoading: isUpdating }] = useUpdateObjectiveMutation()
  const [deleteObjective, { isLoading: isDeleting }] = useDeleteObjectiveMutation()

  const { data: orgUsers, isLoading: isLoadingUsers } = useGetAllOrganizationUsersQuery()
  const { data: teams, isLoading: isLoadingTeams } = useGetAllChoreographTeamsQuery()
  const { data: businessGoals, isLoading: isLoadingGoals } = useGetBusinessGoalsQuery()

  console.log("Business Goals: ", businessGoals?.data);

  // Dynamic team selection
  const teamId = useMemo(() => teams?.data?.teams?.[0]?._id, [teams])

  const { data: teamMembers, isLoading: isLoadingMembers } = useGetAllMembersQuery(
    { teamId: teamId || "" },
    { skip: !teamId },
  )

  // Computed values
  const objectives = useMemo(() => objectivesData?.data || [], [objectivesData])
  const isLoadingAnyData = isLoadingUsers || isLoadingTeams || isLoadingGoals || (teamId && isLoadingMembers)

  // Utility Functions
  const getPriorityColor = useCallback((priority: string): string => {
    const priorityColors: Record<string, string> = {
      Urgent: "bg-red-50 text-red-600 border border-red-200",
      High: "bg-orange-50 text-orange-600 border border-orange-200",
      Medium: "bg-yellow-50 text-yellow-600 border border-yellow-200",
      Low: "bg-gray-50 text-gray-600 border border-gray-200",
    }
    return priorityColors[priority] || priorityColors["Low"]
  }, [])


  const calculateProgressPercentage = useCallback((progress: string): number => {
    const match = progress.match(/\d+/)
    return match ? Math.min(Math.max(Number.parseInt(match[0], 10), 0), 100) : 0
  }, [])


  const getMemberName = useCallback(
    (memberId: string): string => {
      const member = teamMembers?.data?.find((m: any) => m._id === memberId)
      return member?.userName || "Unknown Member"
    },
    [teamMembers],
  )

  const isAssignedMember = useCallback(
    (memberId: string): boolean => {
      return formData.assignedTeamMembers.includes(memberId)
    },
    [formData.assignedTeamMembers],
  )

  // Form Validation
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {}

    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.startDate) {
      errors.startDate = "Start date is required"
    }

    if (!formData.endDate) {
      errors.endDate = "End date is required"
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.endDate = "End date must be after start date"
    }

    if (!formData.priority) {
      errors.priority = "Priority is required"
    }

    if (!formData.progress.trim()) {
      errors.progress = "Progress is required"
    }

    if (!formData.fundingAllocated.trim()) {
      errors.fundingAllocated = "Funding allocation is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  // Event Handlers
  const handleEdit = useCallback((objective: IObjective): void => {
    setEditingObjective(objective)

    setFormData({
      title: objective.title,
      description: objective.description,
      startDate: objective.startDate.split("T")[0],
      endDate: objective.endDate.split("T")[0],
      priority: objective.priority,
      progress: objective.progress,
      fundingAllocated: objective.fundingAllocated,
      envSocialIssues: objective.envSocialIssues,
      envSocialDetails: objective.envSocialDetails || "",
      risksAssociated: objective.risksAssociated,
      riskDetails: objective.riskDetails || { lavel: "", description: "" },
      objectiveOwner: objective.objectiveOwner,
      assignedTeamMembers: Array.isArray(objective.assignedTeamMembers)
        ? objective.assignedTeamMembers
        : [objective.assignedTeamMembers].filter(Boolean),
      invitedTeamMembers: Array.isArray(objective.invitedTeamMembers)
        ? objective.invitedTeamMembers
        : [objective.invitedTeamMembers].filter(Boolean),
      crossTeamCollaboration: objective.crossTeamCollaboration,
      businessGoals: objective.businessGoals,
      termType: objective.termType,
      specificStrategic: objective.specificStrategic,
      necessaryResources: objective.necessaryResources,
      additionalTalent: objective.additionalTalent || "",
      potentialChallenges: objective.potentialChallenges || { lavel: "", description: "" },
    })

    setFormErrors({})
    setIsModalOpen(true)
    router.refresh()
  }, [])

  const handleDelete = useCallback(
    async (objectiveId: string): Promise<void> => {
      try {
        await deleteObjective(objectiveId).unwrap()
        await refetchObjectives()
        toast.success("Delete Objective")
        setDeleteConfirmId(null)
        router.refresh()
      } catch (error) {
        const apiError = error as ApiError
        console.error("Error deleting objective:", error)
        alert(apiError?.data?.message || "Failed to delete objective. Please try again.")
      }
    },
    [deleteObjective, refetchObjectives],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target
      setFormData((prev: any) => ({ ...prev, [name]: value }))

      // Clear specific error when user starts typing
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: "" }))
      }
    },
    [formErrors],
  )

  const handleNestedChange = useCallback((parentField: string, childField: string, value: string): void => {
    setFormData((prev: any) => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField as keyof typeof prev] as object),
        [childField]: value,
      },
    }))
  }, [])

  const handleAddAssignedMember = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const memberId = e.target.value
      if (memberId && !formData.assignedTeamMembers.includes(memberId)) {
        setFormData((prev: any) => ({
          ...prev,
          assignedTeamMembers: [...prev.assignedTeamMembers, memberId],
        }))
      }
      e.target.value = ""
    },
    [formData.assignedTeamMembers],
  )

  const handleAddInvitedMember = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const memberId = e.target.value
      if (memberId && !formData.invitedTeamMembers.includes(memberId)) {
        setFormData((prev: any) => ({
          ...prev,
          invitedTeamMembers: [...prev.invitedTeamMembers, memberId],
        }))
      }
      e.target.value = ""
    },
    [formData.invitedTeamMembers],
  )

  const removeAssignedMember = useCallback((index: number): void => {
    setFormData((prev: any) => ({
      ...prev,
      assignedTeamMembers: prev.assignedTeamMembers.filter((_: string, i: number) => i !== index),
    }))
  }, [])

  const removeInvitedMember = useCallback((index: number): void => {
    setFormData((prev: any) => ({
      ...prev,
      invitedTeamMembers: prev.invitedTeamMembers.filter((_: string, i: number) => i !== index),
    }))
  }, [])

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!editingObjective || !validateForm()) {
      return
    }

    try {
      await updateObjective({
        id: editingObjective._id,
        body: formData,
      }).unwrap()

      await refetchObjectives()
      toast.success("Update Objective")
      setIsModalOpen(false)
      setEditingObjective(null)
      resetForm()
    } catch (error) {
      const apiError = error as ApiError
      console.error("Error updating objective:", error)
      alert(apiError?.data?.message || "Failed to update objective. Please try again.")
    }
  }, [editingObjective, formData, updateObjective, refetchObjectives, validateForm])

  const resetForm = useCallback((): void => {
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "",
      progress: "",
      fundingAllocated: "",
      envSocialIssues: "No",
      envSocialDetails: "",
      risksAssociated: "No",
      riskDetails: { lavel: "", description: "" },
      objectiveOwner: "",
      assignedTeamMembers: [],
      invitedTeamMembers: [],
      crossTeamCollaboration: "No",
      businessGoals: "",
      termType: "",
      specificStrategic: "Yes",
      necessaryResources: "Yes",
      additionalTalent: "",
      potentialChallenges: { lavel: "", description: "" },
    })
    setFormErrors({})
  }, [])

  const handleModalClose = useCallback((): void => {
    setIsModalOpen(false)
    setEditingObjective(null)
    resetForm()
  }, [resetForm])

  // Loading States
  if (isLoadingObjectives) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading objectives...</span>
      </div>
    )
  }

  if (objectivesError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>Error loading objectives. Please refresh the page or try again later.</AlertDescription>
      </Alert>
    )
  }

  if (isLoadingAnyData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {objectives.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No objectives found. Create your first objective to get started.</p>
        </Card>
      ) : (
        objectives.map((objective: any) => {
          const progressPercentage = calculateProgressPercentage(objective.progress)

          return (
            <Card
              key={objective._id}
              className="p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Title and Description */}
                <div className="flex-1 min-w-0 max-w-[200px]">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{objective.title}</h3>
                  <p className="text-base text-gray-500 truncate">{objective.description}</p>
                </div>

                {/* Priority Badge */}
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className={`${getPriorityColor(objective.priority)} text-lg px-2 py-1 font-medium`}
                  >
                    {objective.priority}
                  </Badge>
                </div>

                {/* Status Badge - Always show "Overdue" in pink as per reference */}
                <div className="flex-shrink-0">
                  <Badge className="bg-pink-50 text-pink-600 border border-pink-200 text-lg px-2 py-1 font-medium">
                    {formatDate(objective.startDate)} to {formatDate(objective.endDate)}
                  </Badge>
                </div>

                {/* Finance Button */}
                <div className="flex-shrink-0">
                  <Button className="bg-[#3B4CB8] hover:bg-[#2d3a8c] text-white text-xs px-3 py-1 h-7 font-medium">
                    {businessGoals?.data?.find((goal: any) => goal._id === objective.businessGoals)?.assigned_functions || "N/A"}
                  </Button>
                </div>


                <div className="flex flex-col min-w-[140px]">
                  <p className="text-lg font-medium text-gray-900 mb-1">{progressPercentage}% Complete</p>
                  <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                    <div
                      className="h-full rounded bg-blue-900"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 h-6 w-6 hover:bg-gray-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleEdit(objective)} className="cursor-pointer">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={() => setDeleteConfirmId(objective._id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {isDeleting && deleteConfirmId === objective._id ? "Deleting..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          )
        })
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p className="text-xl! text-[#231F20] mt-2">
            Are you sure you want to delete this objective? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Objective Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="p-0 border-0 max-w-6xl!">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Add an objective</DialogTitle>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
              {/* Left side */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Title<span className="text-red-500">*</span></Label>
                  <Input name="title" value={formData.title} onChange={handleChange} placeholder="Add Title..." className="w-full bg-[#F8FBFF] border border-blue-100 p-4 text-lg h-13"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Description<span className="text-red-500">*</span></Label>
                  <Textarea
                    placeholder="Add Details....."
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    className="w-full min-h-[150px] bg-[#F8FBFF] border border-blue-100 p-4 text-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Objective Timeline<span className="text-red-500">*</span></Label>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="mb-2">Start Date</Label>
                      <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-[#F8FBFF] border border-blue-100 p-4 text-lg h-13"
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2">End Date</Label>
                      <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full bg-[#F8FBFF] border border-blue-100 p-4 text-lg h-13"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-lg font-bold">Priority<span className="text-red-500">*</span></Label>
                    <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border rounded-md p-3"
                      required
                    >
                      <option>Select Priority</option>
                      <option>Urgent</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-lg font-bold">Progress(in %)<span className="text-red-500">*</span></Label>
                    <Input name="progress" value={formData.progress} onChange={handleChange} placeholder="ie. 10"
                      className="w-full p-4 text-lg h-13"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Funding allocated toward achieving this objective?<span className="text-red-500">*</span></Label>
                  <Input name="fundingAllocated" value={formData.fundingAllocated} onChange={handleChange} placeholder="ie. 100"
                    className="w-full p-4 text-lg h-13"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-bold">Are there any environmental and social issues that must be addressed while accomplishing this objective.</Label>
                  <select name="envSocialIssues" value={formData.envSocialIssues} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-lg">If yes, please explain the environmental and social issues that need to addressing</Label>
                  <Textarea
                    placeholder="Add Details....."
                    value={formData.envSocialDetails}
                    name="envSocialDetails"
                    className="w-full min-h-[150px] bg-[#F8FBFF] border border-blue-100 p-4 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-lg" >Are there any risks associated with this objective?</Label>
                  <select name="risksAssociated" value={formData.risksAssociated} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-lg">
                    If yes, please explain the risk and any risk mitigation.
                  </Label>

                  {/* Impact Level */}
                  <div>
                    <div className="flex items-center gap-6 mt-2">
                      <p className="font-semibold">Impact</p>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impactRiskMitigation"
                          value="High"
                          checked={formData.riskDetails?.lavel === "High"}
                          onChange={(e) => handleNestedChange("riskDetails", "lavel", e.target.value)}
                          className="h-4 w-4 accent-red-500"
                        />
                        <span className="text-sm">High</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impactRiskMitigation"
                          value="Medium"
                          checked={formData.riskDetails?.lavel === "Medium"}
                          onChange={(e) => handleNestedChange("riskDetails", "lavel", e.target.value)}
                          className="h-4 w-4 accent-yellow-500"
                        />
                        <span className="text-sm">Medium</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impactRiskMitigation"
                          value="Low"
                          checked={formData.riskDetails?.lavel === "Low"}
                          onChange={(e) => handleNestedChange("riskDetails", "lavel", e.target.value)}
                          className="h-4 w-4 accent-gray-600"
                        />
                        <span className="text-sm">Low</span>
                      </label>
                    </div>

                  </div>
                  <Textarea
                    placeholder="Add Details....."
                    value={formData.riskDetails?.description}
                    onChange={(e) => handleNestedChange("riskDetails", "description", e.target.value)}
                    className="w-full min-h-[150px] bg-[#F8FBFF] border border-blue-100 rounded-2xl p-4 text-lg"
                  />
                </div>
              </div>

              {/* Right side */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-lg">Objective Owner</Label>
                  <select name="objectiveOwner" value={formData.objectiveOwner} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option value="">Please Select Name(s)</option>
                    {orgUsers?.map((user) => (
                      <option key={user._id} value={user._id}>{user.userId.userName}</option>
                    ))}
                  </select>
                </div>

                {/* Assign Team Members Section */}
                <div className="space-y-2">
                  <Label className="font-bold text-lg">Assign team member to accomplish this objective</Label>
                  <select
                    name="assignedTeamMembers"
                    onChange={handleAddAssignedMember}
                    className="w-full border rounded-md p-3"
                    defaultValue=""
                  >
                    <option value="">Please Select Name(s)</option>
                    {teamMembers?.data.map((m) => (
                      <option
                        key={m._id}
                        value={m._id}
                        disabled={formData.assignedTeamMembers.includes(m._id)}
                      >
                        {m.userName}
                      </option>
                    ))}
                  </select>

                  {/* Display selected assigned members */}
                  {formData.assignedTeamMembers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.isArray(formData.assignedTeamMembers) && formData.assignedTeamMembers.map((memberId: string, index: number) => (
                        <div
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {getMemberName(memberId)}
                          <button
                            type="button"
                            onClick={() => removeAssignedMember(index)}
                            className="hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-lg">Dose this objective require cross-function team collaboration?</Label>
                  <select name="crossTeamCollaboration" value={formData.crossTeamCollaboration} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                {/* Invite Members Section */}
                <div className="space-y-2">
                  <Label className="font-bold text-lg">If yes, invite team members from other function’s</Label>
                  <select
                    name="invitedTeamMembers"
                    onChange={handleAddInvitedMember}
                    className="w-full border rounded-md p-3"
                    defaultValue=""
                  >
                    <option value="">Please Select Name(s)</option>
                    {teamMembers?.data?.map((m) => (
                      <option
                        key={m._id}
                        value={m._id}
                        disabled={isAssignedMember(m._id) || formData.invitedTeamMembers.includes(m._id)}
                        className={isAssignedMember(m._id) ? "text-gray-400 bg-gray-100" : ""}
                      >
                        {m.userName} {isAssignedMember(m._id) ? "(Already Assigned)" : ""}
                      </option>
                    ))}
                  </select>

                  {/* Display selected invited members */}
                  {formData.invitedTeamMembers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.isArray(formData.invitedTeamMembers) && formData.invitedTeamMembers.map((memberId: string, index: number) => (
                        <div
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {getMemberName(memberId)}
                          <button
                            type="button"
                            onClick={() => removeInvitedMember(index)}
                            className="hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-lg">What business goals is this objective tied to?</Label>
                  <select name="businessGoals" value={formData.businessGoals} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option value="">Select Functionality</option>
                    {businessGoals?.data?.map((goal) => (
                      <option key={goal._id} value={goal._id}>{goal.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-lg">Is this a long-term or short-term objective</Label>
                  <select name="termType" value={formData.termType} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>Please select</option>
                    <option>Annual</option>
                    <option>Long-term</option>
                    <option>Short-term</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-lg">Is this objective both specific and strategic?</Label>
                  <select name="specificStrategic" value={formData.specificStrategic} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-lg">Do we possess the necessary resources (human and material) to accomplish this objective.</Label>
                  <select name="necessaryResources" value={formData.necessaryResources} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-lg">If not, then explain what talent or other resources we need.</Label>
                  <Textarea
                    placeholder="Add Details....."
                    name="additionalTalent"
                    value={formData.additionalTalent}
                    onChange={handleChange}
                    className="w-full min-h-[150px] bg-[#F8FBFF] border border-blue-100 rounded-2xl p-4 text-lg"
                  />

                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-lg">
                    What potential challenges or roadblocks do we expect to encounter while achieving this objective?
                  </Label>

                  {/* Impact Level */}
                  <div>
                    <div className="flex items-center gap-6 mt-2">
                      <p className="font-semibold">Impact</p>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impactRoadblock"
                          value="High"
                          checked={formData.potentialChallenges?.lavel === "High"}
                          onChange={(e) => handleNestedChange("potentialChallenges", "lavel", e.target.value)}
                          className="h-4 w-4 accent-red-500"
                        />
                        <span className="text-sm">High</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impactRoadblock"
                          value="Medium"
                          checked={formData.potentialChallenges?.lavel === "Medium"}
                          onChange={(e) => handleNestedChange("potentialChallenges", "lavel", e.target.value)}
                          className="h-4 w-4 accent-yellow-500"
                        />
                        <span className="text-sm">Medium</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="impactRoadblock"
                          value="Low"
                          checked={formData.potentialChallenges?.lavel === "Low"}
                          onChange={(e) => handleNestedChange("potentialChallenges", "lavel", e.target.value)}
                          className="h-4 w-4 accent-gray-600"
                        />
                        <span className="text-sm">Low</span>
                      </label>
                    </div>

                  </div>
                  <Textarea
                    placeholder="Add Details....."
                    value={formData.potentialChallenges?.description}
                    onChange={(e) => handleNestedChange("potentialChallenges", "description", e.target.value)}
                    className="w-full min-h-[150px] bg-[#F8FBFF] border border-blue-100 rounded-2xl p-4 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 gap-4">
              <Button onClick={handleSubmit} className="bg-[#22398A] hover:bg-[#22398A]/90 text-lg text-white">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardView
