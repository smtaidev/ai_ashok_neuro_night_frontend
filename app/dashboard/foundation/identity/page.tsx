'use client';

import { JSX, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiEdit, FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Drawer from '../../blueprint/vision/_comoponents/DrawarModal';

const identitySectionsData = [
  {
    id: '01',
    title: 'Mission',
    content: '',
    drawerContent: {
      title: "Mission",
      description: `The mission statement is clear and well-articulated when it:
- Is short, precise, easy to remember, and follow;
- Captures the soul of the organization and is continuously pursued;
- Inspires employees to work towards achieving it;
- Assists in delivering value to the stakeholders, employees, and the society.

Ensure the mission statement is not:
- Lengthy, complex, and incoherent to understand;
- Just a description of what the organization does currently;
- Merely linked or tied to a deadline or milestones;
- Easily overlooked by stakeholders.

Does your mission statement:
- Express your distinctive and enduring reasons for existence.
- Appeal to a wide range of stakeholders, not just a select few.
- Provide a framework for your organization's actions.
- Not merely describe your current products, outputs, or target customers.`
    }
  },
  {
    id: '02',
    title: 'Value',
    content: '',
    drawerContent: {
      title: "Value",
      description: `Essentially, values serve as a communication tool, conveying the organization's priorities and offering clear guidance for decision-making. It's worth noting that terms like guiding principles, company principles, and company beliefs are often used interchangeably with values in some organizations.

Consider your company's values as the foundation of its culture. What fundamental beliefs and behaviors should leaders, managers, and employees exhibit? What guidelines should govern your organizational growth, hiring practices, personal development, and decisionmaking?

Sony's Value Statements:
- Dreams & Curiosity: Pioneer the future with dreams and curiosity.
- Diversity: Pursue the creation of the very best by harnessing diversity and varying viewpoints.
- Integrity & Sincerity: Earn the trust for the Sony brand through ethical and responsible conduct.
- Sustainability: Fulfill our stakeholder responsibilities through disciplined business practices.

Does your mission statement:
- Express your distinctive and enduring reasons for existence.
- Appeal to a wide range of stakeholders, not just a select few.
- Provide a framework for your organization's actions.
- Not merely describe your current products, outputs, or target customers.`
    }
  },
  {
    id: '03',
    title: 'Purpose',
    content: "",
    drawerContent: {
      title: "Purpose",
      description: `In today's corporate environment, many company executives embrace the notion that their organizations should not only prioritize improving shareholder value but also contribute positively to society. As a result, establishing a clear corporate purpose that guides all decision-making and operations has become an essential aspect of business conduct.

Philips Purpose Statement:
"At Philips, our purpose is to improve people’s health and well-being through meaningful innovation. We aim to improve 2.5 billion lives per year by 2030, including 400 million in underserved communities.

As a technology company, we – and our brand licensees – innovate for people with one consistent belief: there’s always a way to make life better."

P&G's Purpose Statement:
"We will provide branded products and services of superior quality and value that improve the lives of the world’s consumers, now and for generations to come. As a result, consumers will reward us with leadership sales, profit and value creation, allowing our people, our shareholders and the communities in which we live and work to prosper."`
    }
  },
];

function formatDescription(description: string) {
  const lines = description.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let keyCounter = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${keyCounter++}`} className="list-disc pl-5 mb-3">
          {currentList.map((item, idx) => (
            <li key={idx} className="mb-1">{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith('-')) {
      currentList.push(line.substring(1).trim());
    } else {
      flushList();
      if (line.trim() !== '') {
        elements.push(<p key={`p-${keyCounter++}`} className="mb-3">{line}</p>);
      }
    }
  });

  flushList();

  return elements;
}

export default function IdentityPage() {
  const [sections, setSections] = useState(identitySectionsData);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<{
    id: string;
    title: string;
    content: string;
    drawerContent: { title: string; description: string };
  } | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

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
                  onClick={() => handleEditClick(section)}
                >
                  <FiEdit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              ) : (
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
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {activeSection.drawerContent.title}
            </h3> */}
            <div className="text-gray-700">
              {formatDescription(activeSection.drawerContent.description)}
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}