'use client';

import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';
import { MissionDrawerContent, renderDrawerMission } from '@/app/dashboard/foundation/_components/drawer-utils';
import { ObjectivesData } from '@/app/dashboard/foundation/_components/dummyData';
import { FirstViewProps } from '@/app/dashboard/foundation/identity/_components/IdentityFirstView';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';

interface Section {
  id: string;
  title: string;
  buttonTitle: string;
  content: string;
  drawerContent: { title: string; description: string };
}


const ObjectiveFirstView = ({ onGetStarted }: FirstViewProps) => {

  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);



  const handleMoreInfoClickForObjective = () => {
    const section = ObjectivesData[0];
    setActiveSection(section as Section);
    setOpenDrawerId(section.id);
  }
  const handleCloseDrawer = () => {
    setOpenDrawerId(null);
  }

  return (
    <div className='dashboard-container bg-white border rounded-lg mx-6'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <Image
          src="/image/choreograph-img-2.png"
          alt="Identity Icon"
          width={200}
          height={500}
          className="h-[60%] w-[50%] mb-6"
        />
        <p className='text-base text-[#231F20] mb-6 lg:w-[50%] md:w-[75%] w-full'>
          Objectives play a crucial role in achieving identified strategic themes and business goals by outlining specific, actionable tasks or initiatives.
          <br />
          <br />
          Unlike business goals, which are visible across the organization and derived from strategic themes, objectives are customized to individual business functions, teams, or groups. They provide precise direction and clarity to specific teams, ensuring that their efforts are aligned with the broader business goals.
        </p>

        <div className="flex items-center justify-between">
          <Button variant="link" className="text-sm text-primary font-medium" onClick={() => handleMoreInfoClickForObjective()}>
            More Info
          </Button>
          <Button variant="getStarted" onClick={onGetStarted}>
            <span className="text-lg font-semibold">+</span>Let&apos;s Get Started
          </Button>
        </div>
      </div>

      {
        activeSection && (
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
        )
      }

    </div>
  );
};

export default ObjectiveFirstView;