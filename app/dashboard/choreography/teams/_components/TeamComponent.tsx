"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link, MoreHorizontal, Plus, X } from "lucide-react"
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
import * as Radix from "@radix-ui/react-slot"
import { useRouter } from "next/navigation"

type Team = {
  id: string;
  teamName: string;
  headcount: string;
  teamAllocation: string;
  teamAvailability: string;
  talentNeed: string;
  skillNeed: string[];
  members: string[];
};

const TeamComponentPage = () => {
  // State for teams list and modal
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<Omit<Team, 'id'> & { id: string }>({
    id: '',
    teamName: '',
    headcount: '',
    teamAllocation: '',
    teamAvailability: '',
    talentNeed: '',
    skillNeed: [],
    members: [],
  });

  // Input states for tags
  const [skillInput, setSkillInput] = useState("");
  const [memberInput, setMemberInput] = useState("");

  // Handlers
  const handleAddNew = () => {
    setEditingTeam(null);
    setFormData({
      id: '',
      teamName: '',
      headcount: '',
      teamAllocation: '',
      teamAvailability: '',
      talentNeed: '',
      skillNeed: [],
      members: [],
    });
    setSkillInput("");
    setMemberInput("");
    setIsModalOpen(true);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData(team);
    setSkillInput("");
    setMemberInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const handleSave = () => {
    if (!formData.teamName.trim()) return;

    if (editingTeam) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id ? formData : team
        )
      );
    } else {
      setTeams([
        ...teams,
        {
          ...formData,
          id: Date.now().toString(),
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const handleModalDelete = () => {
    if (editingTeam) {
      handleDelete(editingTeam.id);
      setIsModalOpen(false);
    }
  };

  // Tag handlers
  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skillNeed: [...formData.skillNeed, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skillNeed: formData.skillNeed.filter((_, i) => i !== index)
    });
  };

  const addMember = () => {
    if (memberInput.trim()) {
      setFormData({
        ...formData,
        members: [...formData.members, memberInput.trim()]
      });
      setMemberInput("");
    }
  };

  const removeMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index)
    });
  };

  // UI helpers
  const getCardColor = (index: number) => {
    return index % 2 === 0 ? "bg-[#7DD3FC]" : "bg-[#1B2E83]";
  };

  const getTextColor = (index: number) => {
    return index % 2 === 0 ? "text-gray-800" : "text-white";
  };

  const handleView = (teamName: string) => {
    //! Navigate to the team details page
    router.push(`/dashboard/choreography/teams/${teamName}`);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-end gap-2 mb-4 text-sm text-gray-600">
        <span>Foundation</span>
        <span>{">"}</span>
        <span className="text-gray-900">Team</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Team&apos;s Dashboard</h2>
      </div>

      {/* Team Dashboard Content */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Headcounts</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {teams.reduce((sum, team) => sum + parseInt(team.headcount || '0'), 0)}
          </p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Teams</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">{teams.length}</p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Allocations</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {teams.length > 0
              ? (teams.reduce((sum, team) => sum + parseFloat(team.teamAllocation || '0'), 0) / teams.length + '%')
              : '0.00%'}
          </p>
        </div>
        <div className="md:w-[50%] w-[100%] h-24 md:grow bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">The following skills are lacking</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {teams.length > 0
              ? Array.from(new Set(teams.flatMap(team => team.skillNeed))).join(', ') || 'None'
              : 'No skills data'}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-start mb-4 gap-4">
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Availability</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {teams.reduce((sum, team) => sum + parseInt(team.teamAvailability || '0'), 0)}
          </p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Talent Need</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {teams.reduce((sum, team) => sum + parseInt(team.talentNeed || '0'), 0)}
          </p>
        </div>
      </div>

      {/* Team List Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-gray-900">Team List</h3>
        <Button
          variant="link"
          className="text-sm text-primary font-medium flex items-center gap-1"
          onClick={handleAddNew}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first Team.</p>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Team
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team, index) => (
            <Card
              key={team.id}
              className={`${getCardColor(index)} ${getTextColor(index)} relative border-0`}
            >
              <CardContent className="p-4 text-sm font-medium">
                <div className="pr-8">
                  <h4 className="font-bold mb-2">Team Name: {team.teamName}</h4>
                  <div className="text-xs mb-1">Headcount: {team.headcount}</div>
                  <div className="text-xs mb-1">Allocation: {team.teamAllocation} %</div>
                  <div className="text-xs mb-1">Availability: {team.teamAvailability} %</div>
                  <div className="text-xs mb-1">Talent Need: {team.talentNeed}</div>
                  {/* <div className="text-xs mb-1">
                    Skills: {team.skillNeed.join(', ') || 'None'}
                  </div>
                  <div className="text-xs">
                    Members: {team.members.join(', ') || 'None'}
                  </div> */}
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
                        onClick={() => handleDelete(team.teamName)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="link" onClick={() => handleView(team.teamName)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Team Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="bg-[#1B2E83] text-white p-4 -m-6 mb-4 rounded-t-lg">
            <DialogTitle className="text-lg font-medium">
              {editingTeam ? "Edit Team" : "Add New Team"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name*</Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="Marketing Team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headcount">Headcount</Label>
              <Input
                id="headcount"
                type="number"
                value={formData.headcount}
                onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamAllocation">Allocation (%)</Label>
              <Input
                id="teamAllocation"
                type="number"
                value={formData.teamAllocation}
                onChange={(e) => setFormData({ ...formData, teamAllocation: e.target.value })}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamAvailability">Availability (%)</Label>
              <Input
                id="teamAvailability"
                type="number"
                value={formData.teamAvailability}
                onChange={(e) => setFormData({ ...formData, teamAvailability: e.target.value })}
                placeholder="80"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="talentNeed">Talent Need</Label>
              <Input
                id="talentNeed"
                value={formData.talentNeed}
                onChange={(e) => setFormData({ ...formData, talentNeed: e.target.value })}
                placeholder="3 new developers"
              />
            </div>
          </div>

          {/* Skills Input - Radix-based */}
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {formData.skillNeed.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 flex-1 min-w-[100px]">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add skill and press Enter"
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <Radix.Slot>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSkill}
                    className="h-8 px-3"
                  >
                    Add
                  </Button>
                </Radix.Slot>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.skillNeed.length} skill(s) entered
            </p>
          </div>

          {/* Members Input - Radix-based */}
          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {formData.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs flex items-center"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 flex-1 min-w-[100px]">
                <Input
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addMember();
                    }
                  }}
                  placeholder="Add member and press Enter"
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <Radix.Slot>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMember}
                    className="h-8 px-3"
                  >
                    Add
                  </Button>
                </Radix.Slot>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.members.length} member(s) entered
            </p>
          </div>

          <div className="flex justify-between pt-4">
            {editingTeam ? (
              <Button
                variant="outline"
                onClick={handleModalDelete}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Delete Team
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleSave}
              disabled={!formData.teamName.trim()}
              className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
            >
              {editingTeam ? "Update Team" : "Add Team"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamComponentPage;