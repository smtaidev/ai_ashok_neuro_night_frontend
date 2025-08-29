'use client';

import React from 'react';
import IdentityComponent from './IdentityComponent';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { usePatchFoundationIdentityMutation } from '@/redux/api/foundation/foundationApi';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { MissionDrawerContent, renderDrawerMission } from '../../_components/drawer-utils';

const IdentityFirstTimePage = () => {
  const [patchFoundation, { isLoading }] = usePatchFoundationIdentityMutation();
  return (
    <div>

      {
        <div className='dashboard-container bg-white border rounded-lg mx-6'>
          <div className='flex flex-col items-center justify-center h-screen'>
            <p className='text-lg text-[#231F20] mb-6 text-center  lg:w-[50%] md:w-[75%] w-full'>
              Please define the mission, values, and purpose. These are essential in shaping your company&apos;s identity and guiding your strategic direction.
            </p>
            <Button variant="getStarted" >
              <span className="text-lg font-semibold">+</span>Let&apos;s Get Started
            </Button>
          </div>
        </div>
      }


      <IdentityComponent />


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 w-11/12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-blue-800 text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">
                Add Mission
              </DialogTitle>
            </div>

            <div className="px-4 py-6 mb-4 h-60">
              <Textarea
                id="description"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder={`Enter mission's description...`}
                className="w-full h-full resize-none text-[#231F20] text-lg!"
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
};

export default IdentityFirstTimePage;