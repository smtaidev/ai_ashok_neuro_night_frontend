"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiEdit, FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Drawer from "../../blueprint/vision/_comoponents/DrawarModal";
import { identitySectionsData, renderDrawerBlocks, renderDrawerMission } from "./_components/identity-utils";


export default function IdentityPage() {
  const [sections, setSections] = useState(identitySectionsData);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<{
    id: string;
    title: string;
    content: string;
    drawerContent: { title: string; description: string };
  } | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  const handleEditClick = (section: (typeof identitySectionsData)[0]) => {
    setActiveSection(section);
    setEditedContent(section.content);
    setOpen(true);
  };

  const handleSave = () => {
    if (!activeSection) return;
    const updated = sections.map((sec) =>
      sec.id === activeSection.id ? { ...sec, content: editedContent } : sec
    );
    setSections(updated as any);
    setOpen(false);
  };

  const handleMoreInfoClick = () => {
    if (activeSection) {
      setOpenDrawerId(activeSection.id);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawerId(null);
  };

  return (
    <div className="p-6 min-h-screen bg-[#f9fafb]">
      <div className="flex justify-end mb-4 text-sm text-muted-foreground">
        <span className="text-muted-foreground">Foundation &gt; </span>
        <span className="ml-1 font-medium text-primary">Identity</span>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardContent className="flex justify-between items-start p-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#22398A] text-white flex items-center justify-center font-semibold text-sm">
                  {section.id}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.content}
                  </p>
                </div>
              </div>
              {section.content ? (
                <Button
                  variant="link"
                  className="flex items-center gap-1 text-[#22398A]"
                  onClick={() => handleEditClick(section as any)}
                >
                  <FiEdit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="bg-[#22398A] hover:bg-[#1a2c6c] flex items-center gap-1"
                  onClick={() => handleEditClick(section as any)}
                >
                  <FiPlus className="h-4 w-4" />
                  <span>Add {section.title}</span>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 sm:max-w-2xl w-11/12 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            {/* Header - Blue Background */}
            <div className="bg-blue-800 text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">
                Edit {activeSection?.title}
              </DialogTitle>
            </div>

            {/* Content Area */}
            <div className="px-4 py-6 mb-4 h-60">
              <Textarea
                id="description"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder={`Enter ${activeSection?.title} description...`}
                className="w-full h-full resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end p-4 gap-4">
              <DialogClose asChild>
                <Button
                  variant="link"
                  onClick={handleMoreInfoClick}
                  className=" text-[#22398A]"
                >
                  More Info
                </Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                className="bg-[#22398A] hover:bg-[#22398A]/90 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Single Drawer Component */}
      {activeSection && (
        <Drawer
          isOpen={openDrawerId === activeSection.id}
          onClose={handleCloseDrawer}
          title={activeSection.title}
        >
          <div className="p-4 bg-white">
            <div className="text-gray-700 space-y-6">
              {renderDrawerMission(activeSection.drawerContent.description).map(
                (item, index) => (
                  <MissionDrawerContent key={index} data={item} />
                )
              )}
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

function MissionDrawerContent({ data }: { data: string }) {
  const blocks = renderDrawerBlocks(data);

  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        if (block.type === "html") {
          return (
            <div
              key={idx}
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          );
        }

        const lines = block.content.split("\n");
        const isList = lines.every((line) => line.trim().startsWith("-"));

        if (isList) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1">
              {lines.map((li, i) => (
                <li key={i}>{li.replace(/^-/, "").trim()}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="text-muted-foreground">
            {block.content}
          </p>
        );
      })}
    </div>
  );
}
