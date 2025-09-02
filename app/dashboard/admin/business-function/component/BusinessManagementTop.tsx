
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const BusinessManagementTopPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="p-6 bg-white rounded-md shadow-md border border-[#DAE3F8]">
        <Card className="border border-[#DAE3F8] rounded-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-4">
              <div className="flex-1 space-y-4 md:text-left">
                <CardTitle className="text-[#0B1C33] lg:text-4xl font-semibold text-2xl mb-[68px]">
                  Business Functional Management
                </CardTitle>
                <CardDescription className="text-[#000000] mt-1 text-[19px]">
                  <span className='font-bold'>The Business Function Management</span> allows Admins to create, modify, or deactivate
                  Business Function profiles, ensuring that the platform adapts to evolving organizational
                  structures. This flexibility enables swift updates to business functions, promoting agility
                  and alignment across teams as organizational needs change.
                </CardDescription>
              </div>
              <div>
                <Image
                  src="/image/business-admin.png"
                  alt="dashboard icon"
                  width={900}
                  height={900}
                  className="rounded-lg w-[570px] h-[316px]"
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

    </div>


  );
};

export default BusinessManagementTopPage;