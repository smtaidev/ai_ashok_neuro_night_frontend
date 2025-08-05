"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Capability {
  id: number
  text: string
  type: "core" | "differentiating"
}

export default function CapabilityComponent() {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCapability, setEditingCapability] = useState<Capability | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    type: "" as "core" | "differentiating" | "",
  })

  const handleAddNew = () => {
    setEditingCapability(null)
    setFormData({ text: "", type: "" })
    setIsModalOpen(true)
  }

  const handleEdit = (capability: Capability) => {
    setEditingCapability(capability)
    setFormData({ text: capability.text, type: capability.type })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setCapabilities(capabilities.filter((cap) => cap.id !== id))
  }

  const handleSave = () => {
    if (!formData.text.trim() || !formData.type) return

    if (editingCapability) {
      // Update existing capability
      setCapabilities(
        capabilities.map((cap: any) =>
          cap.id === editingCapability.id ? { ...cap, text: formData.text, type: formData.type } : cap,
        ),
      )
    } else {
      // Add new capability
      const newCapability: Capability = {
        id: Math.max(...capabilities.map((c) => c.id), 0) + 1,
        text: formData.text,
        type: formData.type,
      }
      setCapabilities([...capabilities, newCapability])
    }

    setIsModalOpen(false)
    setFormData({ text: "", type: "" })
    setEditingCapability(null)
  }

  const handleModalDelete = () => {
    if (editingCapability) {
      handleDelete(editingCapability.id)
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
        <Button
          variant="link"
          className="text-sm text-primary font-medium flex items-center gap-1"
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
                key={item.id}
                className={`${getCardColor(item.type, index)} ${getTextColor(item.type, index)} relative border-0`}
              >
                <CardContent className="p-4 text-sm font-medium">
                  <div className="pr-8">{item.text}</div>
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="text-xs opacity-75 mr-2">Edit</span>
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
                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600">
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
            <Button variant="link" className="text-sm text-primary font-medium">
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
                {editingCapability ? "Edit capability" : "Add New capabilitie"}
              </DialogTitle>

            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="capability-text" className="sr-only">
                Capability Text
              </Label>
              <Input
                id="capability-text"
                placeholder="Enter your capabilitie"
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
              >
                Delete
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleSave}
              disabled={!formData.text.trim() || !formData.type}
              className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
