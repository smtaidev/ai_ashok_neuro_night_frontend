"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Grid3X3, BarChart3, Pause, HelpCircle, X } from "lucide-react"
import { IObjective, IObjectiveRequest, useCreateObjectiveMutation } from "@/redux/api/choreograph/objectivesApi"
import dynamic from "next/dynamic"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetAllOrganizationUsersQuery } from "@/redux/api/OrganizationUser/organizationUserApi"
import { useGetAllMembersQuery } from "@/redux/api/choreograph/teamMemberApi"
import { useGetAllChoreographTeamsQuery } from "@/redux/api/choreograph/choreographApi"
import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi"
import CardView from "./CardView"
import TimelineView from "./TimelineView"
import toast from "react-hot-toast"

const StructureView = dynamic(() => import("./StructureView"), {
  ssr: false,
  loading: () => <p className="text-center py-4">Loading tree...</p>,
})

interface ObjectComponentProps {
  data?: IObjective[];
}

const ObjectivesPage = ({ data }: ObjectComponentProps) => {
  const [currentView, setCurrentView] = useState<"card" | "structure" | "timeline">("card")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // form state - Updated to use arrays for members
  const [formData, setFormData] = useState<IObjectiveRequest>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    progress: "",
    fundingAllocated: "",
    envSocialIssues: "No",
    risksAssociated: "No",
    riskDetails: { lavel: "Low", description: "" },
    potentialChallenges: { lavel: "Low", description: "" },
    objectiveOwner: "",
    assignedTeamMembers: [] as string[], // Explicitly typed as string array
    invitedTeamMembers: [] as string[],   // Explicitly typed as string array
    crossTeamCollaboration: "No",
    businessGoals: "",
    termType: "Annual",
    specificStrategic: "Yes",
    necessaryResources: "Yes",
    additionalTalent: "",
  });

  // Helper function to check if member is already assigned
  const isAssignedMember = (memberId: string) => {
    return Array.isArray(formData.assignedTeamMembers) && formData.assignedTeamMembers.includes(memberId);
  };

  // Generic input handler for most fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handler for adding assigned members
  const handleAddAssignedMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMemberId = e.target.value;
    if (selectedMemberId && !formData.assignedTeamMembers.includes(selectedMemberId)) {
      setFormData(prev => ({
        ...prev,
        assignedTeamMembers: [...prev.assignedTeamMembers, selectedMemberId],
        // Remove from invited if they were there
        invitedTeamMembers: Array.isArray(prev.invitedTeamMembers) ? prev.invitedTeamMembers.filter((id: string) => id !== selectedMemberId) : []
      }));
    }
    // Reset select to placeholder
    e.target.value = "";
  };

  // Handler for adding invited members
  const handleAddInvitedMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMemberId = e.target.value;
    if (selectedMemberId && !formData.invitedTeamMembers.includes(selectedMemberId)) {
      setFormData(prev => ({
        ...prev,
        invitedTeamMembers: [...prev.invitedTeamMembers, selectedMemberId]
      }));
    }
    // Reset select to placeholder
    e.target.value = "";
  };
  const removeAssignedMember = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      assignedTeamMembers: Array.isArray(prev.assignedTeamMembers) ? prev.assignedTeamMembers.filter((_: string, index: number) => index !== indexToRemove) : []
    }));
  };

  // Remove invited member - simplified since we ensure arrays above
  const removeInvitedMember = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      invitedTeamMembers: Array.isArray(prev.invitedTeamMembers) ? prev.invitedTeamMembers.filter((_: string, index: number) => index !== indexToRemove) : []
    }));
  };

  // Helper function to get member name
  const getMemberName = (memberId: string) => {
    const teamMember = teamMembers?.data?.find(m => m._id === memberId);
    return teamMember?.userName || memberId;
  };

  // for nested objects (riskDetails, potentialChallenges)
  const handleNestedChange = (
    field: "riskDetails" | "potentialChallenges",
    key: "lavel" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [key]: value,
      },
    }))
  }

  const getViewTitle = () => {
    switch (currentView) {
      case "card": return "Card View"
      case "structure": return "Structure View"
      case "timeline": return "Timeline View"
      default: return "Card View"
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "card": return <CardView />
      case "structure": return <StructureView />
      case "timeline": return <TimelineView />
      default: return <CardView />
    }
  }

  const { data: orgUsers } = useGetAllOrganizationUsersQuery();
  const { data: teams } = useGetAllChoreographTeamsQuery();
  const teamId = teams?.data?.teams?.[0]?._id;

  const { data: teamMembers } = useGetAllMembersQuery(
    { teamId: teamId || "" },
    { skip: !teamId }
  );
  const { data: businessGoals } = useGetBusinessGoalsQuery();

  const [createObjective] = useCreateObjectiveMutation();


  const handleSubmit = async () => {
    try {
      const result = await createObjective(formData).unwrap()
      if (result) {
        toast.success("Objective created successfully!")
      }
      setIsModalOpen(false)
    } catch (err) {
      toast.error("Unknown Error")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Objectives</h1>
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          {/* <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
            Objective Impact Summary
          </Button> */}
          <Button className="bg-[#22398A] cursor-pointer text-white" onClick={() => setIsModalOpen(true)}>
            Add objective
          </Button>
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant={currentView === "card" ? "default" : "outline"}
              size="sm"
              className={`p-2 ${currentView === "card" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
              onClick={() => setCurrentView("card")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={currentView === "structure" ? "default" : "outline"}
              size="sm"
              className={`p-2 ${currentView === "structure" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
              onClick={() => setCurrentView("structure")}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant={currentView === "timeline" ? "default" : "outline"}
              size="sm"
              className={`p-2 ${currentView === "timeline" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
              onClick={() => setCurrentView("timeline")}
            >
              <Pause className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {currentView === "card" && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">{getViewTitle()}</h2>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
                  Filter by Priority
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Priorities</DropdownMenuItem>
                <DropdownMenuItem>Urgent</DropdownMenuItem>
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
                  Filter by Status
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Statuses</DropdownMenuItem>
                <DropdownMenuItem>On Track</DropdownMenuItem>
                <DropdownMenuItem>At Risk</DropdownMenuItem>
                <DropdownMenuItem>Overdue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {renderCurrentView()}

      {/* Add Objective Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0 border-0 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Add an objective</DialogTitle>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
              {/* Left side */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input name="title" value={formData.title} onChange={handleChange} placeholder="Add Title..." />
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add Details..."
                    className="w-full border rounded-md p-3"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Objective Timeline *</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority *</Label>
                    <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border rounded-md p-3">
                      <option>Select Priority</option>
                      <option>Urgent</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Progress *</Label>
                    <Input name="progress" value={formData.progress} onChange={handleChange} placeholder="Planning Phase" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Funding Allocated *</Label>
                  <Input name="fundingAllocated" value={formData.fundingAllocated} onChange={handleChange} placeholder="ie. 100" />
                </div>
                <div className="space-y-2">
                  <Label>Environmental & Social Issues?</Label>
                  <select name="envSocialIssues" value={formData.envSocialIssues} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>If yes, explain</Label>
                  <textarea
                    name="envSocialDetails"
                    value={formData.envSocialDetails}
                    onChange={handleChange}
                    placeholder="Add Details..."
                    className="w-full border rounded-md p-3 mt-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Risks Associated?</Label>
                  <select name="risksAssociated" value={formData.risksAssociated} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Risk Mitigation</Label>
                  <Input
                    placeholder="Risk Level"
                    value={formData.riskDetails?.lavel}
                    onChange={(e) => handleNestedChange("riskDetails", "lavel", e.target.value)}
                  />
                  <textarea
                    placeholder="Risk Description"
                    value={formData.riskDetails?.description}
                    onChange={(e) => handleNestedChange("riskDetails", "description", e.target.value)}
                    className="w-full border rounded-md p-3 mt-2"
                  />
                </div>
              </div>

              {/* Right side */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Objective Owner</Label>
                  <select name="objectiveOwner" value={formData.objectiveOwner} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option value="">Please Select</option>
                    {orgUsers?.map((user) => (
                      <option key={user._id} value={user._id}>{user.userId.userName}</option>
                    ))}
                  </select>
                </div>

                {/* Assign Team Members Section */}
                <div className="space-y-2">
                  <Label>Assign Team Member</Label>
                  <select
                    name="assignedTeamMembers"
                    onChange={handleAddAssignedMember}
                    className="w-full border rounded-md p-3"
                    defaultValue=""
                  >
                    <option value="">Please Select</option>
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
                  <Label>Cross-team Collaboration?</Label>
                  <select name="crossTeamCollaboration" value={formData.crossTeamCollaboration} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                {/* Invite Members Section */}
                <div className="space-y-2">
                  <Label>Invite Members</Label>
                  <select
                    name="invitedTeamMembers"
                    onChange={handleAddInvitedMember}
                    className="w-full border rounded-md p-3"
                    defaultValue=""
                  >
                    <option value="">Please Select</option>
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
                  <Label>Business Goals</Label>
                  <select name="businessGoals" value={formData.businessGoals} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option value="">Select</option>
                    {businessGoals?.data?.map((goal) => (
                      <option key={goal._id} value={goal._id}>{goal.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Term Type</Label>
                  <select name="termType" value={formData.termType} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>Please select</option>
                    <option>Annual</option>
                    <option>Long-term</option>
                    <option>Short-term</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Specific & Strategic?</Label>
                  <select name="specificStrategic" value={formData.specificStrategic} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Resources Available?</Label>
                  <select name="necessaryResources" value={formData.necessaryResources} onChange={handleChange} className="w-full border rounded-md p-3">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Additional Talent Needed</Label>
                  <textarea
                    name="additionalTalent"
                    value={formData.additionalTalent}
                    onChange={handleChange}
                    placeholder="Add Details..."
                    className="w-full border rounded-md p-3 mt-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Potential Challenges</Label>
                  <Input
                    placeholder="Challenge Level"
                    value={formData.potentialChallenges?.lavel}
                    onChange={(e) => handleNestedChange("potentialChallenges", "lavel", e.target.value)}
                  />
                  <textarea
                    placeholder="Challenge Description"
                    value={formData.potentialChallenges?.description}
                    onChange={(e) => handleNestedChange("potentialChallenges", "description", e.target.value)}
                    className="w-full border rounded-md p-3 mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 gap-4">
              <Button onClick={handleSubmit} className="bg-[#22398A] hover:bg-[#22398A]/90 text-white">
                Save Objective
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ObjectivesPage