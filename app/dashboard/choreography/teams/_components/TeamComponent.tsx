"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { BsInboxes } from "react-icons/bs"
import {
  ITeam,
  useCreateChoreographTeamMutation,
  useDeleteChoreographTeamMutation,
  useGetAllChoreographTeamsQuery,
  useUpdateChoreographTeamMutation
} from "@/redux/api/choreograph/choreographApi"
import toast from "react-hot-toast"
import { useGetAllOrganizationUsersQuery } from "@/redux/api/OrganizationUser/organizationUserApi"

const TeamComponentPage = () => {
  const router = useRouter()

  // Queries
  const { data, isLoading } = useGetAllChoreographTeamsQuery()
  const [createTeam] = useCreateChoreographTeamMutation()
  const [updateTeam] = useUpdateChoreographTeamMutation()
  const [deleteTeam] = useDeleteChoreographTeamMutation()
  const { data: orgUsers } = useGetAllOrganizationUsersQuery()

  const teams = data?.data?.teams || []

  // State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<ITeam | null>(null)
  const [formData, setFormData] = useState<Omit<ITeam, "_id" | "createdAt" | "updatedAt">>({
    teamName: "",
    description: "",
    members: [],
  })
  const [memberInput, setMemberInput] = useState("")

  const resetForm = () => {
    setEditingTeam(null)
    setFormData({ teamName: "", description: "", members: [] })
    setMemberInput("")
  }

  const handleAddNew = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleEdit = (team: ITeam) => {
    setEditingTeam(team)
    setFormData({
      teamName: team.teamName,
      description: team.description,
      members: team.members.map((m: any) =>
        typeof m === "string" ? m : m._id
      ),
    })
    setIsModalOpen(true)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTeam(id).unwrap()
      toast.success("Team deleted successfully!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Delete failed")
    }
  }

  const handleSave = async () => {
    try {
      if (!formData.teamName.trim()) {
        toast.error("Team name is required")
        return
      }

      const payload = {
        ...formData,
        members: formData.members.map((m) => String(m)),
      }

      if (editingTeam) {
        await updateTeam({ id: editingTeam._id, body: payload }).unwrap()
        toast.success("Team updated successfully!")
      } else {
        await createTeam(payload).unwrap()
        toast.success("Team created successfully!")
      }

      setIsModalOpen(false)
      resetForm()
      router.refresh()
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  }

  const handleModalDelete = async () => {
    if (editingTeam) {
      await handleDelete(editingTeam._id)
      setIsModalOpen(false)
      router.refresh()
    }
  }

  const addMember = () => {
    if (!memberInput) return
    if (formData.members.includes(memberInput)) {
      toast.error("This member is already added to the team")
      return
    }
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, memberInput],
    }))
    setMemberInput("")
  }

  const removeMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }))
  }

  const getCardColor = (index: number) =>
    index % 2 === 0 ? "bg-[#7DD3FC]" : "bg-[#1B2E83]"
  const getTextColor = (index: number) =>
    index % 2 === 0 ? "text-[#231F20]" : "text-white!"

  const handleView = (teamName: string) => {
    console.log("teamName: ", teamName)
    router.push(`/dashboard/choreography/teams/${teamName}`)
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Team&apos;s Dashboard
        </h2>
      </div>

      {/* ! Dashboard Metrics */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Headcounts</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.reduce((sum, team) => sum + parseInt(team.headcount || '0'), 0)} */}
            50
          </p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Teams</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">{teams.length}</p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Allocations</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.length > 0
              ? (teams.reduce((sum, team) => sum + parseFloat(team.teamAllocation || '0'), 0) / teams.length + '%')
              : '0.00%'} */}
            25 %
          </p>
        </div>
        <div className="md:w-[50%] w-[100%] h-24 md:grow bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">The following skills are lacking</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* {teams.length > 0
              ? Array.from(new Set(teams.flatMap(team => team.skillNeed))).join(', ') || 'None'
              : 'No skills data'} */}
            Lead for Marketing
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-start mb-4 gap-4">
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Availability</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.reduce((sum, team) => sum + parseInt(team.teamAvailability || '0'), 0)} */}
            10 %
          </p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Talent Need</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.reduce((sum, team) => sum + parseInt(team.talentNeed || '0'), 0)} */}
            Sales
          </p>
        </div>
      </div>

      {/* Team List */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-gray-900">Team List</h3>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <BsInboxes className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first Team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team, index) => (
            <Card
              key={team._id}
              className={`${getCardColor(index)} ${getTextColor(index)} relative border-0`}
            >
              <CardContent className="p-4 text-sm font-medium">
                <div className="pr-8">
                  <h4 className="mb-2 text-lg ">
                    <span className="font-bold">Team Name:</span> {team.teamName}
                  </h4>
                  <div className="text-base mb-1">
                    <span className="font-bold">Description:</span> {team.description}
                  </div>
                  <div className="text-base mb-1">
                    <span className="font-bold">Members:</span> {team.members?.length || 0}
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 ${getTextColor(index)} hover:bg-white/10`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white text-black">
                      <DropdownMenuItem onClick={() => handleEdit(team)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(team._id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end items-center">
                <Button variant="ghost" onClick={() => handleView(team.teamName)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="bg-[#1B2E83] text-white p-4 -m-6 mb-4 rounded-t-lg">
            <DialogTitle className="text-lg font-medium">
              {editingTeam ? "Edit Team" : "Create Team"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-lg">Team Name*</Label>
                <Input
                  className="mt-4.5 p-2"
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, teamName: e.target.value }))
                  }
                  placeholder="Enter team name..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg">Description*</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Add details..."
                  className="w-full border rounded-md p-2 h-32 resize-none"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <Label className="text-lg">Add Team Members</Label>
              <div className="flex flex-row gap-2">
                <select
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  className="flex-1 border rounded-md item-center justify-between p-2 -m-1 w-[50%]"
                >
                  <option value="">Select a member...</option>
                  {orgUsers?.map((user) => (
                    <option
                      key={user._id}
                      value={user.userId._id}
                      disabled={formData.members.includes(user.userId._id)}
                    >
                      {user.userId.userName} ({user.userId.email})
                    </option>
                  ))}
                </select>
                <Button type="button" onClick={addMember}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.members.map((memberId, index) => {
                  const memberInfo = orgUsers?.find((u) => u.userId._id === memberId)
                  return (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {memberInfo ? memberInfo.userId.userName : String(memberId)}
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6">
            {editingTeam && (
              <Button
                variant="outline"
                onClick={handleModalDelete}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Delete Team
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={!formData.teamName.trim()}
              className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
            >
              {editingTeam ? "Update Team" : "Create Team"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TeamComponentPage

