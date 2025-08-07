'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiEdit, FiPlus } from 'react-icons/fi';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ZeroInSectionsData } from '../../_components/dummyData';
import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';
import { MissionDrawerContent, renderDrawerMission } from '../../_components/drawer-utils';


interface Section {
  id: string;
  title: string;
  buttonTitle: string;
  content: string;
  drawerContent: { title: string; description: string };
}

export default function ZeroInComponent() {
  const [sections, setSections] = useState(ZeroInSectionsData);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<typeof sections[0] | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  const handleEditClick = (section: typeof sections[0]) => {
    setActiveSection(section);
    setEditedContent(section.content);
    setOpen(true);
  };

  const handleSave = () => {
    if (!activeSection) return;
    const updated = sections.map((sec: any) =>
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
    <div className="dashboard-container bg-[#f9fafb]">
      <div className="flex justify-end mb-4 text-sm text-muted-foreground">
        <span className="text-muted-foreground">Foundation &gt; </span>
        <span className="ml-1 font-medium text-primary">Zero In</span>
      </div>

      <div className="space-y-4">
        {sections.map((section: any) => (
          <Card key={section.id}>
            <CardContent className="flex justify-between items-start flex-col md:flex-row gap-4 p-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#22398A] text-white flex items-center justify-center font-semibold md:text-sm text-base">
                  {section.id}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.content || 'No content added yet.'}
                  </p>
                </div>
              </div>

              <Button
                variant={section.content ? 'link' : 'default'}
                className={`flex items-center gap-1 ${section.content ? 'text-[#22398A]' : 'bg-[#22398A] hover:bg-[#1a2c6c] text-white'
                  }`}
                onClick={() => handleEditClick(section)}
              >
                {section.content ? <FiEdit className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                <span>{section.content ? 'Edit' : `Add ${section.buttonTitle}`}</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for editing */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 sm:max-w-2xl w-11/12 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-blue-800 text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">
                Edit {activeSection?.title}
              </DialogTitle>
            </div>

            <div className="px-4 py-6 mb-4 h-60">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder={`Enter ${activeSection?.title} description...`}
                className="w-full h-full resize-none"
              />
            </div>

            <div className="flex justify-end p-4 gap-4">
              <DialogClose asChild>
                <Button
                  variant="link"
                  onClick={handleMoreInfoClick}
                  className="text-[#22398A]"
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

      {/* Drawer Info */}
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
  );
}
