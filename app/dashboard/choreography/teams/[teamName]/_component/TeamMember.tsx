"use client";

import { useGetSingleTeamByTeamNameQuery } from "@/redux/api/choreograph/choreographApi";
import {
  ITeamMember,
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useUpdateTeamMemberMutation,
} from "@/redux/api/choreograph/teamMemberApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash, Plus, X } from "lucide-react";
import { useGetAllOrganizationUsersQuery } from "@/redux/api/OrganizationUser/organizationUserApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";

// interface TeamMemberPageProps {
//   teamName: string;
// }

const TeamMemberPage = ({ teamName }: { teamName: string }) => {
  const { data, error, isLoading, refetch } = useGetSingleTeamByTeamNameQuery(teamName);

  const [createTeamMember] = useCreateTeamMemberMutation();
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const [deleteMember] = useDeleteTeamMemberMutation();
  const { data: orgUsers } = useGetAllOrganizationUsersQuery();


  console.log("user: ", orgUsers);
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState<ITeamMember | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<ITeamMember | null>(null);

  const [formData, setFormData] = useState({
    memberId: "",
    location: "",
    skills: [] as string[],
    teamRole: "",
    type: "",
    availability: 0,
  });
  const [skillInput, setSkillInput] = useState("");

  // Reset modal state
  const resetForm = () => {
    setEditingTeamMember(null);
    setFormData({
      memberId: "",
      location: "",
      skills: [],
      teamRole: "",
      type: "",
      availability: 0,
    });
    setSkillInput("");
  };

  // Add new member (open modal)
  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Edit existing member (open modal with prefilled data)
  const handleEdit = (teamMember: ITeamMember) => {
    setEditingTeamMember(teamMember);
    setFormData({
      memberId: teamMember._id, // keep ref for update
      location: teamMember.location,
      skills: teamMember.skills || [],
      teamRole: teamMember.teamRole,
      type: teamMember.type,
      availability: Number(teamMember.availability) || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (memberId: string) => {
    if (!data?.data) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return; // stop if user cancels

    try {
      await deleteMember({ choreographId: data.data._id, memberId }).unwrap();
      toast.success("Member deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete member");
    }
  };

  // Save form (create or update)
  const handleSave = async () => {
    if (!data?.data) return;

    try {
      const payload = {
        ...formData,
        skills: formData.skills.filter((s) => s.trim() !== ""),
        availability: Number(formData.availability),
      };

      if (editingTeamMember) {
        await updateTeamMember({
          teamId: data.data._id,
          memberId: editingTeamMember._id,
          body: payload,
        }).unwrap();
        toast.success("Member updated successfully");
      } else {
        await createTeamMember({
          choreographId: data.data._id,
          body: payload,
        }).unwrap();
        toast.success("Member created successfully");
      }

      setIsModalOpen(false);
      resetForm();
      refetch();
    } catch {
      toast.error("Failed to save member");
    }
  };

  // Skills helpers
  const addSkill = () => {
    if (!skillInput.trim()) return;
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillInput] }));
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const team = data?.data;
  const members = team?.members || [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#0b1c33]">
          Team Members of {team?.teamName}
        </h1>
        <Button
          className="bg-[#1E3A8A] hover:bg-[#22398A] text-white flex items-center gap-2"
          onClick={handleAddNew}
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </Button>
      </div>

      {/* Table */}
      {members.length === 0 ? (
        <p className="text-[#0b1c33] text-center">No members found in this team.</p>
      ) : (
        <Card className="w-full overflow-x-auto bg-[#fff] rounded-2xl border border-black">
          <CardContent className="p-0">
            <table className="min-w-full text-lg text-left">
              <thead className="text-[#0b1c33] uppercase border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Team Role</th>
                  <th className="px-6 py-4">Skills</th>
                  <th className="px-6 py-4">Availability</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member: any) => (
                  <tr key={member._id} className="border-b border-gray-800">
                    <td className="px-6 py-4 text-[#0b1c33]">{member.userName}</td>
                    <td className="px-6 py-4 text-[#0b1c33]">{member.email}</td>
                    <td className="px-6 py-4 text-[#0b1c33]">{member.teamRole}</td>
                    <td className="px-6 py-4 text-[#0b1c33]">
                      {member.skills?.length > 0 ? member.skills.join(", ") : "--"}
                    </td>
                    <td className="px-6 py-4 text-[#0b1c33]">{member.availability}%</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-green-700 hover:bg-green-600"
                        onClick={() => setViewModal(member)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#1E3A8A] hover:bg-[#22398A] text-white"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleDelete(member._id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0 border-0 w-11/12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">
                {editingTeamMember ? "Edit Member" : "Add Member"}
              </DialogTitle>
            </div>

            <div className="px-4 py-6 mb-4 space-y-4">
              <Label className="text-xl">Select Member</Label>
              <select
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                className="w-full border rounded-md p-3 text-xl"
              >
                <option value="">Choose a member...</option>
                {orgUsers?.map((user) => (
                  <option key={user._id} value={user.userId._id}>
                    {user.userId.userName} ({user.userId.email})
                  </option>
                ))}
              </select>

              <Label className="text-xl">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
                className="text-xl p-3"
              />

              <Label className="text-xl">Team Role</Label>
              <Input
                value={formData.teamRole}
                onChange={(e) => setFormData({ ...formData, teamRole: e.target.value })}
                placeholder="e.g. Developer"
                className="text-xl p-3"
              />

              <Label className="text-xl">Type</Label>
              <Input
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="permanent/contract"
                className="text-xl p-3"
              />

              <Label className="text-xl">Availability (%)</Label>
              <Input
                type="number"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: Number(e.target.value) })}
                placeholder="e.g. 80"
                className="text-xl p-3"
              />

              {/* Skills */}
              <Label className="text-xl">Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add skill"
                  className="text-xl p-3"
                />
                <Button type="button" className="text-xl" onClick={addSkill}>
                  Add
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-xl"
                  >
                    {skill}
                    <X className="w-4 h-4 cursor-pointer" onClick={() => removeSkill(index)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end p-4 gap-4">
              <Button
                onClick={handleSave}
                className="bg-[#22398A] hover:bg-[#22398A]/90 text-white text-xl"
              >
                {editingTeamMember ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      {/* View Modal */}
      <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
        <DialogContent className="p-0 border-0 sm:max-w-2xl w-11/12 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Member Details</DialogTitle>
            </div>

            {viewModal && (
              <div className="px-4 py-6 mb-4 space-y-2">
                <p className="text-xl"><strong>Name:</strong> {viewModal.userName}</p>
                <p className="text-xl"><strong>Email:</strong> {viewModal.email}</p>
                <p className="text-xl"><strong>Role:</strong> {viewModal.teamRole}</p>
                <p className="text-xl"><strong>Location:</strong> {viewModal.location}</p>
                <p className="text-xl"><strong>Type:</strong> {viewModal.type}</p>
                <p className="text-xl"><strong>Availability:</strong> {viewModal.availability}%</p>
                <p className="text-xl"><strong>Skills:</strong> {viewModal.skills?.join(", ")}</p>
              </div>
            )}

            <div className="flex justify-end p-4 gap-4">
              <Button
                variant="link"
                onClick={() => setViewModal(null)}
                className="text-[#22398A] text-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default TeamMemberPage;




