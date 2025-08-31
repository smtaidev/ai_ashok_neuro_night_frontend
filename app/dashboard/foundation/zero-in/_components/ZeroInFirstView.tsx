'use client';
import React, { useState } from 'react'
import { FirstViewProps } from '../../identity/_components/IdentityFirstView'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePatchFoundationZeroInMutation } from '@/redux/api/foundation/foundationApi';
import toast from 'react-hot-toast';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';



export default function ZeroInFirstView({ onGetStarted }: FirstViewProps) {

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [targetCustomers, setTargetCustomers] = useState('');
  const [patchZeroIn, { isLoading }] = usePatchFoundationZeroInMutation();

  const handleGetStarted = () => {
    setOpen(true);
  };

  const handleSaveTargetCustomers = async () => {
    if (!targetCustomers.trim()) {
      toast.error('Please enter your target customers.');
      return;
    }
    const wordCount = targetCustomers.trim().split(/\s+/).length;
    if (wordCount > 1000) {
      toast.error('Target Customers statement exceeds the maximum allowed length of 1000 words. Please revise your statement.');
      return;
    }
    try {
      const response = await patchZeroIn({
        targetCustomer: targetCustomers
      }).unwrap();

      console.log("Hit ZeroIn: ", response);

      toast.success('Target Customers saved successfully!');
      setOpen(false);
      if (onGetStarted) onGetStarted();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save target customers.');
    }
  };

  return (
    <div className='dashboard-container bg-white border rounded-lg'>
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <Image
          src="/image/zero-in-img.png"
          alt="Zero In Icon"
          width={200}
          height={500}
          className="h-[60%] w-[50%] mb-6"
        />
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Focus Your Strategy</h1>
          <p className='text-lg text-gray-600 mt-4'>
            Please define the mission, values, and purpose. These are essential in shaping your company&apos;s identity and guiding your strategic direction.
          </p>
        </div>
        <Button variant="getStarted" onClick={handleGetStarted}>
          <span className="text-2xl font-[300]">+</span>Let&apos;s Get Started
        </Button>
      </div>

      {/* Target Customer Modal  */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 w-11/12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#1E3A8A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Targeted Customers</DialogTitle>
            </div>

            <div className="px-4 py-6 mb-4 h-60">
              {/* <Textarea
                value={targetCustomers}
                onChange={(e) => setTargetCustomers(e.target.value)}
                placeholder="Enter who are your targeted customers ? description..."
                className="w-full h-full resize-none text-[#231F20] text-lg!"
              /> */}

              <Textarea
                value={targetCustomers}
                onChange={(e) => setTargetCustomers(e.target.value)}
                placeholder="Enter who are your targeted customers..."
                className="w-full h-full resize-none text-[#231F20] text-lg!"
              />
            </div>

            <div className="flex justify-end p-4 gap-4">
              <DialogClose asChild>
                {/* <Button
                  variant="link"
                  className="text-[#22398A]"
                  onClick={() => setOpenDrawer(true)}
                >
                  More Info
                </Button> */}
                <Button
                  variant="link"
                  className="text-[#22398A]"
                  onClick={() => setOpenDrawer(true)}
                >
                  More Info
                </Button>
              </DialogClose>
              <Button
                onClick={handleSaveTargetCustomers}
                disabled={isLoading}
                variant="getStarted"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Drawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Target Customers"
      >
        <div className="p-4 bg-white">
          <div
            className="text-gray-700 space-y-6 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: `
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <p>
          Target customers are the specific people or groups a business seeks to serve. Instead of trying to please everyone, successful companies identify these specific individuals or groups and tailor their products or services to meet their unique needs and preferences. This approach helps businesses focus their efforts and resources on the right audience, leading to increased customer satisfaction and loyalty.
        </p>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <p>
          Understanding target customers is crucial for several reasons. First, it allows companies to develop a strategy that caters to specific customers, allocates scarce resources more effectively, and creates value. Second, it enables them to connect with their target customers by providing a holistic experience that fosters stronger customer relationships and loyalty.
        </p>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="font-size: 16px; font-weight: bold;">Here are the traits that reflect an effective target customer:</h2>
        <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
          <li><strong>Relevance:</strong> It should be based on meaningful criteria that align with customer behaviors, needs, and preferences.</li>
          <li><strong>Accessibility:</strong> Target customers should be accessible through channels the business can effectively reach and engage with.</li>
          <li><strong>Actionability:</strong> It should provide clear guidance on how to tailor the company's efforts and offerings to meet target customers' needs.</li>
        </ul>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <p>
          In conclusion, defining the target customer requires an understanding of their needs, behaviors, preferences, and pain points. By effectively defining customers, businesses can position themselves for sustainable growth and success in today's competitive marketplace.
        </p>
      </div>
      `,
            }}
          />
        </div>
      </Drawer>
    </div>
  )
}