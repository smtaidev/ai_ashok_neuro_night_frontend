// "use client";

// import { JSX, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FiEdit, FiPlus } from "react-icons/fi";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import Drawer from "../../blueprint/vision/_comoponents/DrawarModal";

// export function renderDrawerMission(description: string): string[] {
//   return description
//     .split("\\n")
//     .map((line) => line.trim())
//     .filter(Boolean);
// }

// export type RenderedBlock = {
//   type: "html" | "text";
//   content: string;
// };

// export function renderDrawerBlocks(description: string): RenderedBlock[] {
//   return description
//     .split("\\n")
//     .map((block) => block.trim())
//     .filter(Boolean)
//     .map((block) => {
//       const isHtml = /^<.+?>/.test(block); // starts with <tag>
//       return {
//         type: isHtml ? "html" : "text",
//         content: block,
//       };
//     });
// }

// export const identitySectionsData = [
//   {
//     id: "01",
//     title: "Mission",
//     content: "",
//     drawerContent: {
//       title: "Mission",
//       description: String.raw`
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <h1 style="font-size: 24px; font-weight: bold;">The mission statement is clear and well-articulated when it:</h1>
//         <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
//           <li>Is short, precise, easy to remember, and follow;</li>
//           <li>Captures the soul of the organization and is continuously pursued;</li>
//           <li>Inspires employees to work towards achieving it;</li>
//           <li>Assists in delivering value to the stakeholders, employees, and the society.</li>
//         </ul>
//       </div>
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <h2 style="font-size: 20px; font-weight: bold;">Ensure the mission statement is not:</h2>
//         <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
//           <li>Lengthy, complex, and incoherent to understand;</li>
//           <li>Just a description of what the organization does currently;</li>
//           <li>Merely linked or tied to a deadline or milestones;</li>
//           <li>Easily overlooked by stakeholders.</li>
//         </ul>
//       </div>
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <h2 style="font-size: 20px; font-weight: bold;">Does your mission statement:</h2>
//         <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
//           <li>Express your distinctive and enduring reasons for existence?</li>
//           <li>Appeal to a wide range of stakeholders, not just a select few?</li>
//           <li>Provide a framework for your organization's actions?</li>
//           <li>Avoid merely describing your current products, outputs, or target customers?</li>
//         </ul>
//       </div>
//       `,
//     },
//   },
//   {
//     id: "02",
//     title: "Value",
//     content: "",
//     drawerContent: {
//       title: "Value",
//       description: String.raw`
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <p>
//           Essentially, values serve as a communication tool, conveying the organization's priorities and offering clear guidance for decision-making. It's worth noting that terms like guiding principles, company principles, and company beliefs are often used interchangeably with values in some organizations.
//         </p>
//         <p style="margin-top: 10px;">
//           Consider your company's values as the foundation of its culture. What fundamental beliefs and behaviors should leaders, managers, and employees exhibit? What guidelines should govern your organizational growth, hiring practices, personal development, and decision-making?
//         </p>
//       </div>
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <h2 style="font-size: 20px; font-weight: bold;">Sony's Value Statements:</h2>
//         <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
//           <li><strong>Dreams & Curiosity:</strong> Pioneer the future with dreams and curiosity.</li>
//           <li><strong>Diversity:</strong> Pursue the creation of the very best by harnessing diversity and varying viewpoints.</li>
//           <li><strong>Integrity & Sincerity:</strong> Earn the trust for the Sony brand through ethical and responsible conduct.</li>
//           <li><strong>Sustainability:</strong> Fulfill our stakeholder responsibilities through disciplined business practices.</li>
//         </ul>
//       </div>
//       `,
//     },
//   },
//   {
//     id: "03",
//     title: "Purpose",
//     content: "",
//     drawerContent: {
//       title: "Purpose",
//       description: String.raw`
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <p>
//           In today's corporate environment, many company executives embrace the notion that their organizations should not only prioritize improving shareholder value but also contribute positively to society. As a result, establishing a clear corporate purpose that guides all decision-making and operations has become an essential aspect of business conduct.
//         </p>
//       </div>
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <h2 style="font-size: 20px; font-weight: bold;">Philips Purpose Statement:</h2>
//         <p style="margin-top: 10px;">
//           "At Philips, our purpose is to improve people’s health and well-being through meaningful innovation. We aim to improve 2.5 billion lives per year by 2030, including 400 million in underserved communities."
//         </p>
//         <p style="margin-top: 10px;">
//           As a technology company, we – and our brand licensees – innovate for people with one consistent belief: there’s always a way to make life better.
//         </p>
//       </div>
//       <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
//         <h2 style="font-size: 20px; font-weight: bold;">P&G's Purpose Statement:</h2>
//         <p style="margin-top: 10px;">
//           "We will provide branded products and services of superior quality and value that improve the lives of the world’s consumers, now and for generations to come. As a result, consumers will reward us with leadership sales, profit and value creation, allowing our people, our shareholders and the communities in which we live and work to prosper."
//         </p>
//       </div>
//       `,
//     },
//   },
// ] as const;


// export default function IdentityPage() {
//   const [sections, setSections] = useState(identitySectionsData);
//   const [open, setOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState<{
//     id: string;
//     title: string;
//     content: string;
//     drawerContent: { title: string; description: string };
//   } | null>(null);
//   const [editedContent, setEditedContent] = useState("");
//   const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

//   const handleEditClick = (section: (typeof identitySectionsData)[0]) => {
//     setActiveSection(section);
//     setEditedContent(section.content);
//     setOpen(true);
//   };

//   const handleSave = () => {
//     if (!activeSection) return;
//     const updated = sections.map((sec) =>
//       sec.id === activeSection.id ? { ...sec, content: editedContent } : sec
//     );
//     setSections(updated as any);
//     setOpen(false);
//   };

//   const handleMoreInfoClick = () => {
//     if (activeSection) {
//       setOpenDrawerId(activeSection.id);
//     }
//   };

//   const handleCloseDrawer = () => {
//     setOpenDrawerId(null);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-[#f9fafb]">
//       <div className="flex justify-end mb-4 text-sm text-muted-foreground">
//         <span className="text-muted-foreground">Foundation &gt; </span>
//         <span className="ml-1 font-medium text-primary">Identity</span>
//       </div>

//       <div className="space-y-4">
//         {sections.map((section) => (
//           <Card key={section.id}>
//             <CardContent className="flex justify-between items-start p-4">
//               <div className="flex gap-4">
//                 <div className="w-8 h-8 rounded-full bg-[#22398A] text-white flex items-center justify-center font-semibold text-sm">
//                   {section.id}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold">{section.title}</h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {section.content}
//                   </p>
//                 </div>
//               </div>
//               {section.content ? (
//                 <Button
//                   variant="link"
//                   className="flex items-center gap-1 text-[#22398A]"
//                   onClick={() => handleEditClick(section as any)}
//                 >
//                   <FiEdit className="h-4 w-4" />
//                   <span>Edit</span>
//                 </Button>
//               ) : (
//                 <Button
//                   variant="default"
//                   className="bg-[#22398A] hover:bg-[#1a2c6c] flex items-center gap-1"
//                   onClick={() => handleEditClick(section as any)}
//                 >
//                   <FiPlus className="h-4 w-4" />
//                   <span>Add {section.title}</span>
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="p-0 border-0 sm:max-w-2xl w-11/12 max-w-2xl">
//           <div className="bg-white rounded-xl shadow-lg relative">
//             {/* Header - Blue Background */}
//             <div className="bg-blue-800 text-white p-4 -mt-1 rounded-t-xl">
//               <DialogTitle className="text-xl font-bold">
//                 Edit {activeSection?.title}
//               </DialogTitle>
//             </div>

//             {/* Content Area */}
//             <div className="px-4 py-6 mb-4 h-60">
//               <Textarea
//                 id="description"
//                 value={editedContent}
//                 onChange={(e) => setEditedContent(e.target.value)}
//                 placeholder={`Enter ${activeSection?.title} description...`}
//                 className="w-full h-full resize-none"
//               />
//             </div>

//             {/* Footer Buttons */}
//             <div className="flex justify-end p-4 gap-4">
//               <DialogClose asChild>
//                 <Button
//                   variant="link"
//                   onClick={handleMoreInfoClick}
//                   className=" text-[#22398A]"
//                 >
//                   More Info
//                 </Button>
//               </DialogClose>
//               <Button
//                 onClick={handleSave}
//                 className="bg-[#22398A] hover:bg-[#22398A]/90 text-white"
//               >
//                 Save
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Single Drawer Component */}
//       {activeSection && (
//         <Drawer
//           isOpen={openDrawerId === activeSection.id}
//           onClose={handleCloseDrawer}
//           title={activeSection.title}
//         >
//           <div className="p-4 bg-white">
//             <div className="text-gray-700 space-y-6">
//               {renderDrawerMission(activeSection.drawerContent.description).map(
//                 (item, index) => (
//                   <MissionDrawerContent key={index} data={item} />
//                 )
//               )}
//             </div>
//           </div>
//         </Drawer>
//       )}
//     </div>
//   );
// }

// function MissionDrawerContent({ data }: { data: string }) {
//   const blocks = renderDrawerBlocks(data);

//   return (
//     <div className="space-y-4">
//       {blocks.map((block, idx) => {
//         if (block.type === "html") {
//           return (
//             <div
//               key={idx}
//               className="prose prose-sm max-w-none"
//               dangerouslySetInnerHTML={{ __html: block.content }}
//             />
//           );
//         }

//         const lines = block.content.split("\n");
//         const isList = lines.every((line) => line.trim().startsWith("-"));

//         if (isList) {
//           return (
//             <ul key={idx} className="list-disc pl-5 space-y-1">
//               {lines.map((li, i) => (
//                 <li key={i}>{li.replace(/^-/, "").trim()}</li>
//               ))}
//             </ul>
//           );
//         }

//         return (
//           <p key={idx} className="text-muted-foreground">
//             {block.content}
//           </p>
//         );
//       })}
//     </div>
//   );
// }


// app/(your-folder)/identity/page.tsx or .jsx

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
