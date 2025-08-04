'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiEdit, FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const identitySectionsData = [
  {
    id: '01',
    title: 'Mission',
    content: '',
  },
  {
    id: '02',
    title: 'Value',
    content: '',
  },
  {
    id: '03',
    title: 'Purpose',
    content: "",
  },
];

export default function IdentityPage() {
  const [sections, setSections] = useState(identitySectionsData);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<{ id: string; title: string; content: string } | null>(null);
  const [editedContent, setEditedContent] = useState('');

  const handleEditClick = (section: typeof identitySectionsData[0]) => {
    setActiveSection(section);
    setEditedContent(section.content);
    setOpen(true);
  };

  const handleSave = () => {
    if (!activeSection) return;
    const updated = sections.map((sec) =>
      sec.id === activeSection.id ? { ...sec, content: editedContent } : sec
    );
    setSections(updated);
    setOpen(false);
  };

  const handleMoreInfo = () => {
    // Logic for more info can be added here
    console.log("More info clicked");
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
                // Edit button when content exists
                <Button
                  variant="link"
                  className="flex items-center gap-1 text-[#22398A]"
                  onClick={() => handleEditClick(section)}
                >
                  <FiEdit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              ) : (
                // Add button when content is empty
                <Button
                  variant="default"
                  className="bg-[#22398A] hover:bg-[#1a2c6c] flex items-center gap-1"
                  onClick={() => handleEditClick(section)}
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
              <div className="grid gap-4 h-full">
                <Textarea
                  id="description"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Enter description..."
                  className="w-full h-full resize-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end p-4 gap-4">
              <Button
                variant="link"
                onClick={handleMoreInfo}
                className=" text-[#22398A]"
              >
                More Info
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#22398A] hover:bg-[#22398A] text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
}
