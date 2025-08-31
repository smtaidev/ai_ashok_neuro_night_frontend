'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { usePatchFoundationIdentityMutation } from '@/redux/api/foundation/foundationApi';
import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';
import { Button } from '@/components/ui/button';

export interface FirstViewProps {
  onGetStarted?: () => void;
}

export default function IdentityFirstView({ onGetStarted }: FirstViewProps) {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mission, setMission] = useState('');
  const [patchFoundation, { isLoading }] = usePatchFoundationIdentityMutation();

  const handleGetStarted = () => {
    setOpen(true);
  };

  const handleSaveMission = async () => {
    if (!mission.trim()) {
      toast.error('Please enter your mission statement.');
      return;
    }

    const wordCount = mission.trim().split(/\s+/).length;
    if (wordCount > 200) {
      toast.error('Mission statement should not exceed 200 words.');
      return;
    }

    try {
      await patchFoundation({ mission }).unwrap();
      toast.success('Mission saved successfully!');
      setOpen(false);

      if (onGetStarted) onGetStarted();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save mission.');
    }
  };

  return (
    <div className='dashboard-container bg-white border rounded-lg mx-6'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <Image
          src="/image/first-time-img.png"
          alt="Identity Icon"
          width={200}
          height={500}
          className="h-[60%] w-[50%] mb-6"
        />
        <p className='text-lg text-[#231F20] mb-6 text-center lg:w-[50%] md:w-[75%] w-full'>
          Please define the mission, values, and purpose. These are essential in shaping your company&apos;s identity and guiding your strategic direction.
        </p>

        <Button variant="getStarted" className='p-5' onClick={handleGetStarted}>
          <span className="text-lg">+</span>
          <span className='text-lg font-semibold'>Let&apos;s Get Started</span>
        </Button>
      </div>

      {/* Mission Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 w-11/12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#1E3A8A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Mission</DialogTitle>
            </div>

            <div className="px-4 py-6 mb-4 h-60">
              <Textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="Enter your mission description..."
                className="w-full h-full resize-none text-[#231F20] text-lg!"
              />
            </div>

            <div className="flex justify-end p-4 gap-4">
              <DialogClose asChild>
                <Button
                  variant="link"
                  className="text-[#22398A]"
                  onClick={() => setOpenDrawer(true)}
                >
                  More Info
                </Button>
              </DialogClose>
              <Button
                onClick={handleSaveMission}
                disabled={isLoading}
                variant="getStarted"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Drawer */}
      <Drawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Mission"
      >
        <div className="p-4 bg-white">
          <div
            className="text-gray-700 space-y-6 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: `
        <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
          <h1 style="font-size: 16px; font-weight: bold;">The mission statement is clear and well-articulated when it:</h1>
          <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
            <li>Is short, precise, easy to remember, and follow;</li>
            <li>Captures the soul of the organization and is continuously pursued;</li>
            <li>Inspires employees to work towards achieving it;</li>
            <li>Assists in delivering value to the stakeholders, employees, and the society.</li>
          </ul>
        </div>
        <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
          <h2 style="font-size: 16px; font-weight: bold;">Ensure the mission statement is not:</h2>
          <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
            <li>Lengthy, complex, and incoherent to understand;</li>
            <li>Just a description of what the organization does currently;</li>
            <li>Merely linked or tied to a deadline or milestones;</li>
            <li>Easily overlooked by stakeholders.</li>
          </ul>
        </div>
        <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
          <h2 style="font-size: 16px; font-weight: bold;">Does your mission statement:</h2>
          <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
            <li>Express your distinctive and enduring reasons for existence?</li>
            <li>Appeal to a wide range of stakeholders, not just a select few?</li>
            <li>Provide a framework for your organization's actions?</li>
            <li>Avoid merely describing your current products, outputs, or target customers?</li>
          </ul>
        </div>
        `,
            }}
          />
        </div>
      </Drawer>

    </div>
  );
}

