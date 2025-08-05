'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export interface FirstViewProps {
  onGetStarted: () => void;
}

export default function IdentityFirstView({ onGetStarted }: FirstViewProps) {
  return (
    <div className='dashboard-container bg-[#f9fafb]'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <Image
          src="/image/first-time-img.png"
          alt="Identity Icon"
          width={200}
          height={500}
          className="h-130 w-110 mb-6"
        />
        <p className='text-lg text-gray-600 mb-6 text-center'>
          Please define the mission, values, and purpose. These are essential in shaping your company&apos;s identity and guiding your strategic direction.
        </p>
        <Button variant="getStarted" onClick={onGetStarted}>
          <span className="text-2xl font-[300]">+</span>Let&apos;s Get Started
        </Button>
      </div>
    </div>
  );
}