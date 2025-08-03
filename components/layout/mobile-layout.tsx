'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import type React from 'react';

export default function MobileLayout({
  children,
  scrollable = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh)]'>
          <div className='flex flex-1 px-4 md:px-6'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='flex flex-1 px-4 md:px-6'>{children}</div>
      )}
    </>
  );
}
