'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const capabilities = [
  {
    id: 1,
    text: 'This is a test of core differentiating Capability #1.',
  },
  {
    id: 2,
    text: 'dfgh rsdr regerre',
  },
  {
    id: 3,
    text: 'trsy tryerser erret etr',
  },
];

export default function CapabilityPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Capability</h2>
        <Button variant="link" className="text-sm text-primary font-medium">+ Add New</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {capabilities.map((item) => (
          <Card key={item.id} className="bg-[#1B2E83] text-white relative">
            <CardContent className="p-4 text-sm font-medium">
              {item.text}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-white/10"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-black">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="link" className="text-sm text-primary font-medium">More Info</Button>
      </div>
    </div>
  );
}
