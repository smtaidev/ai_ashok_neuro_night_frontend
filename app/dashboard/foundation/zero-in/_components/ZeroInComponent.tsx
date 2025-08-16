'use client';

import { useState, useEffect } from 'react';
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
import { useGetZeroInDataQuery, usePatchFoundationZeroInMutation } from '@/redux/api/foundation/foundationApi';
import toast from 'react-hot-toast';

interface Section {
  id: string;
  title: string;
  buttonTitle: string;
  content: string;
  drawerContent: { title: string; description: string };
}

export default function ZeroInComponent() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);

  const { data: zeroInRes, isLoading: isFetching, refetch } = useGetZeroInDataQuery();
  const [sections, setSections] = useState<Section[]>([...ZeroInSectionsData]);
  const [patchZeroIn, { isLoading }] = usePatchFoundationZeroInMutation();

  useEffect(() => {
    // Check if data exists and is an array with at least one item
    if (zeroInRes?.data && Array.isArray(zeroInRes.data) && zeroInRes.data.length > 0) {
      const zeroInData = zeroInRes.data[0].zeroIn;
      const updated = [...ZeroInSectionsData].map((sec) => {
        if (sec.title.toLowerCase().includes('target customer')) {
          return { ...sec, content: zeroInData.targetCustomer || '' };
        }
        if (sec.title.toLowerCase().includes('customer need')) {
          return { ...sec, content: zeroInData.keyCustomerNeed || '' };
        }
        if (sec.title.toLowerCase().includes('value proposition')) {
          return { ...sec, content: zeroInData.valueProposition || '' };
        }
        return sec;
      });
      setSections(updated);
    }
  }, [zeroInRes]);

  const getFieldNameFromSection = (section: Section): string => {
    const title = section.title.toLowerCase();
    if (title.includes('target customer')) return 'targetCustomer';
    if (title.includes('customer need')) return 'keyCustomerNeed';
    if (title.includes('value proposition')) return 'valueProposition';
    return '';
  };

  const handleEditClick = async (section: Section) => {
    setLoadingSection(section.id);

    try {
      // Refetch the latest data from API
      const response = await refetch();

      if (response.data?.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const latestZeroInData = response.data.data[0].zeroIn;

        // Get the latest content for the specific section
        let latestContent = '';
        const fieldName = getFieldNameFromSection(section);

        if (fieldName === 'targetCustomer') {
          latestContent = latestZeroInData.targetCustomer || '';
        } else if (fieldName === 'keyCustomerNeed') {
          latestContent = latestZeroInData.keyCustomerNeed || '';
        } else if (fieldName === 'valueProposition') {
          latestContent = latestZeroInData.valueProposition || '';
        }

        // Update the section with latest content
        const updatedSection = { ...section, content: latestContent };
        setActiveSection(updatedSection);
        setEditedContent(latestContent);

        // Also update the sections state to reflect latest data
        setSections(prevSections =>
          prevSections.map(sec =>
            sec.id === section.id ? { ...sec, content: latestContent } : sec
          )
        );
      } else {
        // Fallback to current section content if API call fails
        setActiveSection(section);
        setEditedContent(section.content);
      }

      setOpen(true);
    } catch (error) {
      console.error('Error fetching latest section data:', error);
      toast.error('Failed to fetch latest data');

      // Fallback to current section content
      setActiveSection(section);
      setEditedContent(section.content);
      setOpen(true);
    } finally {
      setLoadingSection(null);
    }
  };

  const handleSave = async () => {
    if (!activeSection) return;

    // Get the field name from the section
    const fieldName = getFieldNameFromSection(activeSection);

    if (!fieldName) {
      toast.error('Invalid section field');
      return;
    }

    const payload = {
      [fieldName]: editedContent
    };

    try {
      await patchZeroIn(payload).unwrap();

      setSections(prevSections =>
        prevSections.map(sec =>
          sec.id === activeSection.id ? { ...sec, content: editedContent } : sec
        )
      );

      setOpen(false);
      toast.success(`${activeSection.title} updated successfully`);
      localStorage.removeItem('zeroInData');
      await refetch();
    } catch (error) {
      console.error('Error updating zero in:', error);
      toast.error(`Error updating ${activeSection.title}`);
    }
  };

  const handleMoreInfoClick = () => {
    if (activeSection) {
      setOpenDrawerId(activeSection.id);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawerId(null);
  };

  if (isFetching) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="dashboard-container bg-[#f9fafb]">
      <div className="flex justify-end mb-4 text-sm text-muted-foreground">
        <span className="text-muted-foreground">Foundation &gt; </span>
        <span className="ml-1 font-medium text-primary">Zero In</span>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
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

              {section.content ? (
                <Button
                  variant="link"
                  className="flex items-center gap-1 text-[#22398A]"
                  onClick={() => handleEditClick(section)}
                  disabled={loadingSection === section.id}
                >
                  <FiEdit className="h-4 w-4" />
                  <span>{loadingSection === section.id ? 'Loading...' : 'Edit'}</span>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="bg-[#22398A] hover:bg-[#1a2c6c] flex items-center gap-1"
                  onClick={() => handleEditClick(section)}
                  disabled={loadingSection === section.id}
                >
                  <FiPlus className="h-4 w-4" />
                  <span>{loadingSection === section.id ? 'Loading...' : `Add ${section.buttonTitle}`}</span>
                </Button>
              )}
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
                disabled={isLoading}
                className="bg-[#22398A] hover:bg-[#22398A]/90 text-white"
              >
                {isLoading ? 'Saving...' : 'Save'}
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