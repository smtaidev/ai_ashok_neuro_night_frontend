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
                    {objective.startDate} - {objective.endDate}
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
          <p className="text-sm text-gray-600 mt-2">
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
        <DialogContent className="p-0 border-0 max-w-4xl max-h-[90vh]">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Edit Objective</DialogTitle>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 max-h-[75vh] overflow-y-auto">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Add Title..."
                    className={formErrors.title ? "border-red-500" : ""}
                  />
                  {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add Details..."
                    className={`w-full border rounded-md p-3 resize-none ${formErrors.description ? "border-red-500" : "border-gray-300"} focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]`}
                    rows={4}
                  />
                  {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Objective Timeline *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={formErrors.startDate ? "border-red-500" : ""}
                      />
                      {formErrors.startDate && <p className="text-red-500 text-xs mt-1">{formErrors.startDate}</p>}
                    </div>
                    <div>
                      <Input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className={formErrors.endDate ? "border-red-500" : ""}
                      />
                      {formErrors.endDate && <p className="text-red-500 text-xs mt-1">{formErrors.endDate}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className={`w-full border rounded-md p-3 ${formErrors.priority ? "border-red-500" : "border-gray-300"} focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]`}
                    >
                      <option value="">Select Priority</option>
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    {formErrors.priority && <p className="text-red-500 text-sm">{formErrors.priority}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="progress">Progress *</Label>
                    <Input
                      id="progress"
                      name="progress"
                      value={formData.progress}
                      onChange={handleChange}
                      placeholder="e.g., Planning Phase"
                      className={formErrors.progress ? "border-red-500" : ""}
                    />
                    {formErrors.progress && <p className="text-red-500 text-sm">{formErrors.progress}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingAllocated">Funding Allocated *</Label>
                  <Input
                    id="fundingAllocated"
                    name="fundingAllocated"
                    value={formData.fundingAllocated}
                    onChange={handleChange}
                    placeholder="e.g., $100,000"
                    className={formErrors.fundingAllocated ? "border-red-500" : ""}
                  />
                  {formErrors.fundingAllocated && <p className="text-red-500 text-sm">{formErrors.fundingAllocated}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="envSocialIssues">Environmental & Social Issues?</Label>
                  <select
                    id="envSocialIssues"
                    name="envSocialIssues"
                    value={formData.envSocialIssues}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {formData.envSocialIssues === "Yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="envSocialDetails">Environmental & Social Details</Label>
                    <textarea
                      id="envSocialDetails"
                      name="envSocialDetails"
                      value={formData.envSocialDetails}
                      onChange={handleChange}
                      placeholder="Explain the environmental and social considerations..."
                      className="w-full border border-gray-300 rounded-md p-3 resize-none focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                      rows={3}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="risksAssociated">Risks Associated?</Label>
                  <select
                    id="risksAssociated"
                    name="risksAssociated"
                    value={formData.risksAssociated}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {formData.risksAssociated === "Yes" && (
                  <div className="space-y-2">
                    <Label>Risk Details</Label>
                    <select
                      value={formData.riskDetails?.lavel || ""}
                      onChange={(e) => handleNestedChange("riskDetails", "lavel", e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-3 mb-2 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                    >
                      <option value="">Select Risk Level</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <textarea
                      placeholder="Describe the risk and mitigation strategies..."
                      value={formData.riskDetails?.description || ""}
                      onChange={(e) => handleNestedChange("riskDetails", "description", e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-3 resize-none focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objectiveOwner">Objective Owner</Label>
                  <select
                    id="objectiveOwner"
                    name="objectiveOwner"
                    value={formData.objectiveOwner}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="">Please Select</option>
                    {Array.isArray(orgUsers) &&
                      orgUsers.map((user: any) => (
                        <option key={user._id} value={user._id}>
                          {user.userId?.userName || user.userName || "Unknown User"}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Assign Team Members */}
                <div className="space-y-2">
                  <Label htmlFor="assignedMembers">Assign Team Members</Label>
                  <select
                    id="assignedMembers"
                    onChange={handleAddAssignedMember}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                    defaultValue=""
                  >
                    <option value="">Please Select</option>
                    {Array.isArray(teamMembers?.data) &&
                      teamMembers?.data?.map((member: any) => (
                        <option
                          key={member._id}
                          value={member._id}
                          disabled={formData.assignedTeamMembers.includes(member._id)}
                          className={formData.assignedTeamMembers.includes(member._id) ? "text-gray-400" : ""}
                        >
                          {member.userName}
                        </option>
                      ))}
                  </select>

                  {formData.assignedTeamMembers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.isArray(formData.assignedTeamMembers) &&
                        formData.assignedTeamMembers.map((memberId: string, index: number) => (
                          <div
                            key={`assigned-${index}`}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                          >
                            {getMemberName(memberId)}
                            <button
                              type="button"
                              onClick={() => removeAssignedMember(index)}
                              className="hover:text-red-600 transition-colors"
                              aria-label="Remove assigned member"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crossTeamCollaboration">Cross-team Collaboration?</Label>
                  <select
                    id="crossTeamCollaboration"
                    name="crossTeamCollaboration"
                    value={formData.crossTeamCollaboration}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* Invite Members */}
                <div className="space-y-2">
                  <Label htmlFor="invitedMembers">Invite Members</Label>
                  <select
                    id="invitedMembers"
                    onChange={handleAddInvitedMember}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                    defaultValue=""
                  >
                    <option value="">Please Select</option>
                    {Array.isArray(teamMembers?.data) &&
                      teamMembers?.data?.map((member: any) => (
                        <option
                          key={member._id}
                          value={member._id}
                          disabled={isAssignedMember(member._id) || formData.invitedTeamMembers.includes(member._id)}
                          className={
                            isAssignedMember(member._id) || formData.invitedTeamMembers.includes(member._id)
                              ? "text-gray-400 bg-gray-50"
                              : ""
                          }
                        >
                          {member.userName} {isAssignedMember(member._id) ? "(Already Assigned)" : ""}
                        </option>
                      ))}
                  </select>

                  {formData.invitedTeamMembers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.isArray(formData.invitedTeamMembers) &&
                        formData.invitedTeamMembers.map((memberId: string, index: number) => (
                          <div
                            key={`invited-${index}`}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                          >
                            {getMemberName(memberId)}
                            <button
                              type="button"
                              onClick={() => removeInvitedMember(index)}
                              className="hover:text-red-600 transition-colors"
                              aria-label="Remove invited member"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessGoals">Business Goals</Label>
                  <select
                    id="businessGoals"
                    name="businessGoals"
                    value={formData.businessGoals}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="">Select Business Goal</option>
                    {Array.isArray(businessGoals?.data) &&
                      businessGoals?.data?.map((goal: any) => (
                        <option key={goal._id} value={goal._id}>
                          {goal.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="termType">Term Type</Label>
                  <select
                    id="termType"
                    name="termType"
                    value={formData.termType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="">Please select</option>
                    <option value="Annual">Annual</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specificStrategic">Specific & Strategic?</Label>
                  <select
                    id="specificStrategic"
                    name="specificStrategic"
                    value={formData.specificStrategic}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="necessaryResources">Resources Available?</Label>
                  <select
                    id="necessaryResources"
                    name="necessaryResources"
                    value={formData.necessaryResources}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalTalent">Additional Talent Needed</Label>
                  <textarea
                    id="additionalTalent"
                    name="additionalTalent"
                    value={formData.additionalTalent}
                    onChange={handleChange}
                    placeholder="Describe any additional talent or skills needed..."
                    className="w-full border border-gray-300 rounded-md p-3 resize-none focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Potential Challenges</Label>
                  <select
                    value={formData.potentialChallenges?.lavel || ""}
                    onChange={(e) => handleNestedChange("potentialChallenges", "lavel", e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 mb-2 focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                  >
                    <option value="">Select Challenge Level</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <textarea
                    placeholder="Describe potential challenges and how to address them..."
                    value={formData.potentialChallenges?.description || ""}
                    onChange={(e) => handleNestedChange("potentialChallenges", "description", e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 resize-none focus:border-[#22398A] focus:outline-none focus:ring-1 focus:ring-[#22398A]"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">* Required fields</div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleModalClose}
                  disabled={isUpdating}
                  className="px-6 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-[#22398A] hover:bg-[#1a2c73] text-white px-6"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Objective"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardView
