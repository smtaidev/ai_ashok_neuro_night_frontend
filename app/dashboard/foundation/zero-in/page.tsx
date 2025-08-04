'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiEdit } from "react-icons/fi";

const zeroInSections = [
  {
    id: '01',
    title: 'Target customer',
    content: 'This is the test mission!',
  },
  {
    id: '02',
    title: 'Key customer needs',
    content: 'Here are the values: A. B. C. D.',
  },
  {
    id: '03',
    title: 'Value Proposition',
    content: "Now, let's add purpose of your organization.",
  },
];

const ZeroInPage = () => {
  return (
    <div className="p-6 min-h-screen bg-[#f9fafb]">
      <div className="flex justify-end mb-4 text-sm text-muted-foreground">
        <span className="text-muted-foreground">Foundation &gt; </span>
        <span className="ml-1 font-medium text-primary">Zero in</span>
      </div>

      <div className="space-y-4">
        {zeroInSections.map((section) => (
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
              <Button variant="link" size="icon" className='flex items-center gap-1 text-[#22398A]'>
                <FiEdit className="h-4 w-4 " />
                <span>Edit</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ZeroInPage;