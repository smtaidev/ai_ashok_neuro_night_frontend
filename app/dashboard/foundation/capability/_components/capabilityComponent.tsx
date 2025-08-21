"use client";

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ICapability, useDeleteSingleFoundationCapabilityMutation, useGetCapabilitiesDataQuery, usePatchFoundationCapabilitiesMutation, usePatchSingleFoundationCapabilityMutation } from "@/redux/api/foundation/foundationApi"
import toast from 'react-hot-toast';
import { Textarea } from "@/components/ui/textarea"
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import { MissionDrawerContent, renderDrawerMission } from "../../_components/drawer-utils";
import { CapabilitiesData } from "../../_components/dummyData";


interface LocalCapability {
  _id: string
  text: string
  type: "core" | "differentiating"
}

interface Section {
  id: string;
  title: string;
  buttonTitle: string;
  content: string;
  drawerContent: { title: string; description: string };
}

export default function CapabilityComponent() {
  const [capabilities, setCapabilities] = useState<LocalCapability[]>([])
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCapability, setEditingCapability] = useState<LocalCapability | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    type: "" as "core" | "differentiating" | "",
  })

  // API hooks
  const { data: capabilitiesData, isLoading, error, refetch } = useGetCapabilitiesDataQuery()
  const [patchCapabilities, { isLoading: isSaving }] = usePatchFoundationCapabilitiesMutation()
  const [deleteSingleFoundationCapability] = useDeleteSingleFoundationCapabilityMutation();
  const [patchSingleCapability] = usePatchSingleFoundationCapabilityMutation();

  // console.log("Capability result: ", capabilitiesData?.data);

  // Transform API data to local format
  useEffect(() => {

    if (capabilitiesData?.success && capabilitiesData?.data) {
      const transformedCapabilities: LocalCapability[] = capabilitiesData?.data.map((cap: ICapability) => ({
        _id: cap._id,
        text: cap.capability,
        type: cap.type as "Core" | "differentiating"
      }))
      setCapabilities(transformedCapabilities)
    }
  }, [capabilitiesData])
  // console.log("transformedCapabilities: ", transformedCapabilities)


  const handleAddNew = () => {
    setEditingCapability(null)
    setFormData({ text: "", type: "" })
    setIsModalOpen(true)
  }

  const handleEdit = (capability: LocalCapability) => {
    setEditingCapability(capability)
    setFormData({ text: capability.text, type: capability.type })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteSingleFoundationCapability(id);
      console.log("Delete capability with ID:", result)

      // Remove from local state immediately for better UX
      setCapabilities(capabilities.filter((cap) => cap._id !== id))

      // You'll need to implement actual delete API call here
      // await deleteCapability(id).unwrap()

    } catch (error) {
      console.error("Failed to delete capability:", error)
      // Revert local state on error
      await refetch()
    }
  }

  const handleSave = async () => {
    if (!formData.text.trim() || !formData.type) return;

    const wordCount = formData.text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 10) {
      toast.error("Oops! It looks like the name is over the 10 words limit...");
      return;
    }

    try {
      const payload = {
        capability: formData.text,
        type: formData.type,
      };

      if (editingCapability) {
        // Update existing
        await patchSingleCapability({ id: editingCapability._id, body: payload }).unwrap();
      } else {
        // Create new
        await patchCapabilities(payload).unwrap();
      }

      await refetch();

      setIsModalOpen(false);
      setFormData({ text: "", type: "" });
      setEditingCapability(null);

    } catch (error) {
      console.error("Failed to save capability:", error);
      toast.error("Failed to save capability. Please try again.");
    }
  };


  const handleModalDelete = async () => {
    if (editingCapability) {
      await handleDelete(editingCapability._id)
      setIsModalOpen(false)
      setFormData({ text: "", type: "" })
      setEditingCapability(null)
    }
  }

  const getCardColor = (type: string, index: number) => {
    if (type === "core") {
      return index % 2 === 0 ? "bg-[#7DD3FC]" : "bg-[#1B2E83]"
    } else {
      return index % 2 === 0 ? "bg-[#1B2E83]" : "bg-[#7DD3FC]"
    }
  }

  const getTextColor = (type: string, index: number) => {
    if (type === "core") {
      return index % 2 === 0 ? "text-gray-800" : "text-white"
    } else {
      return index % 2 === 0 ? "text-white" : "text-gray-800"
    }
  }
  const handleMoreInfoClick = () => {
    // always show the first section from CapabilitiesData (you can expand later)
    const section = CapabilitiesData[0];
    setActiveSection(section as Section);
    setOpenDrawerId(section.id);
  };
  const handleCloseDrawer = () => {
    setOpenDrawerId(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="text-gray-500">Loading capabilities...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="text-red-500">Error loading capabilities. Please try again.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-end gap-2 mb-4 text-sm text-gray-600">
        <span>Foundation</span>
        <span>{">"}</span>
        <span className="text-gray-900">Capability</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Capability</h2>

        {/* variant="link" */}
        {/* className="text-sm text-primary font-medium flex items-center gap-1" */}
        <Button
          onClick={handleAddNew}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Content */}
      {capabilities.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No capabilities yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first capability.</p>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Capability
          </Button>
        </div>
      ) : (
        // Capabilities Grid
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {capabilities.map((item, index) => (
              <Card
                key={item._id}
                className={`${getCardColor(item.type, index)} ${getTextColor(item.type, index)} relative border-0`}
              >
                <CardContent className="p-4 text-sm font-medium">
                  <div className="pr-4">Team Name: {item.text}</div>
                  <div className="pr-4">Type: {item.type}</div>
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-6 w-6 ${getTextColor(item.type, index)} hover:bg-white/10`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white text-black">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item._id)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-6">
            <Button variant="link" className="text-sm text-primary font-medium" onClick={() => handleMoreInfoClick()}>
              More Info
            </Button>
          </div>
        </>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="bg-[#1B2E83] text-white p-4 -m-6 mb-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-medium">
                {editingCapability ? "Edit capability" : "Add New capability"}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="capability-text" className="sr-only">
                Capability Text
              </Label>
              <Textarea
                id="capability-text"
                placeholder="Enter your capability"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="capability-type" className="sr-only">
                Capability Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: "core" | "differentiating") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="differentiating">Differentiating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            {editingCapability ? (
              <Button
                variant="outline"
                onClick={handleModalDelete}
                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                disabled={isSaving}
              >
                Delete
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleSave}
              disabled={!formData.text.trim() || !formData.type || isSaving}
              className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {activeSection && (
        <Drawer
          isOpen={openDrawerId === activeSection.id}
          onClose={handleCloseDrawer}
          title={activeSection.title}
        >
          <div className="p-4 bg-white">
            <div className="text-gray-700 space-y-6">
              {renderDrawerMission(activeSection.drawerContent.description).map(
                (item: any, index: any) => (
                  <MissionDrawerContent key={index} data={item} />
                )
              )}
            </div>
          </div>
        </Drawer>
      )}

    </div>
  )
}