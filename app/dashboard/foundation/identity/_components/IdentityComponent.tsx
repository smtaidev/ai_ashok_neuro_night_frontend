"use client";

import { useState, useEffect } from "react";
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
import { identitySectionsData } from "../../_components/dummyData";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import {
  renderDrawerBlocks,
  renderDrawerMission,
} from "../../_components/drawer-utils";
import { useGetIdentityDataQuery, usePatchFoundationMutation } from "@/redux/api/foundation/foundationApi";
import toast from "react-hot-toast";

interface Section {
  id: string;
  title: string;
  content: string;
  drawerContent: { title: string; description: string };
}

export default function IdentityComponent() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);

  const { data: identityRes, isLoading: isFetching, refetch } = useGetIdentityDataQuery();
  console.log("Get identity data: ", identityRes?.data);

  const [sections, setSections] = useState<Section[]>([...identitySectionsData]);
  const [patchFoundation, { isLoading }] = usePatchFoundationMutation();

  useEffect(() => {
    console.log("Identity response:", identityRes);

    // Check if data exists and is an array with at least one item
    if (identityRes?.data && Array.isArray(identityRes.data) && identityRes.data.length > 0) {
      const identityData = identityRes.data[0].identity;

      console.log("Identity data extracted:", identityData);

      const updated = [...identitySectionsData].map((sec) => {
        if (sec.title.toLowerCase() === "mission") {
          return { ...sec, content: identityData.mission || "" };
        }
        if (sec.title.toLowerCase() === "value") {
          return { ...sec, content: identityData.value || "" };
        }
        if (sec.title.toLowerCase() === "purpose") {
          return { ...sec, content: identityData.purpose || "" };
        }
        return sec;
      });

      console.log("Updated sections:", updated);
      setSections(updated);
    }
  }, [identityRes]);

  const handleEditClick = async (section: Section) => {
    setLoadingSection(section.id);

    try {
      // Refetch the latest data from API
      const response = await refetch();

      if (response.data?.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const latestIdentityData = response.data.data[0].identity;

        // Get the latest content for the specific section
        let latestContent = "";
        const sectionTitle = section.title.toLowerCase();

        if (sectionTitle === "mission") {
          latestContent = latestIdentityData.mission || "";
        } else if (sectionTitle === "value") {
          latestContent = latestIdentityData.value || "";
        } else if (sectionTitle === "purpose") {
          latestContent = latestIdentityData.purpose || "";
        }

        // Update the section with latest content
        const updatedSection = { ...section, content: latestContent };
        setActiveSection(updatedSection);
        setEditedContent(latestContent);

        console.log("Edited Identity: ", updatedSection);

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
      console.error("Error fetching latest section data:", error);
      toast.error("Failed to fetch latest data");

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

    // Get the field name from the section title
    const fieldName = activeSection.title.toLowerCase();

    // Create payload with only the specific field being updated
    const payload = {
      [fieldName]: editedContent
    };

    console.log("Payload being sent:", payload);

    try {
      const result = await patchFoundation(payload).unwrap();
      console.log("Patch result:", result);

      // Update the sections state with the new content
      setSections(prevSections =>
        prevSections.map(sec =>
          sec.id === activeSection.id ? { ...sec, content: editedContent } : sec
        )
      );

      setOpen(false);
      toast.success(`${activeSection.title} updated successfully`);
      localStorage.removeItem("identityData");

      // Optionally refetch to ensure UI is in sync with backend
      await refetch();
    } catch (error) {
      console.error("Error updating identity:", error);
      toast.error(`Error updating ${activeSection.title}`);

      // Don't close the dialog on error so user can retry
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
        <span className="ml-1 font-medium text-primary">Identity</span>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardContent className="flex justify-between items-start md:flex-row flex-col gap-2 p-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#22398A] text-white flex items-center justify-center font-semibold text-sm">
                  {section.id}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.content || "No content added yet."}
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
                  <span>{loadingSection === section.id ? "Loading..." : "Edit"}</span>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="bg-[#22398A] hover:bg-[#1a2c6c] flex items-center gap-1"
                  onClick={() => handleEditClick(section)}
                  disabled={loadingSection === section.id}
                >
                  <FiPlus className="h-4 w-4" />
                  <span>{loadingSection === section.id ? "Loading..." : `Add ${section.title}`}</span>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

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
                id="description"
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
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
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