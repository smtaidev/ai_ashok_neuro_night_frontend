'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export interface FirstViewProps {
  onGetStarted: () => void;
}

export default function IdentityFirstView({ onGetStarted }: FirstViewProps) {
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
        <p className='text-base text-[#231F20] mb-6 text-center w-[50%]'>
          Please define the mission, values, and purpose. These are essential in shaping your company&apos;s identity and guiding your strategic direction.
        </p>
        <Button variant="getStarted" onClick={onGetStarted}>
          <span className="text-lg font-semibold">+</span>Let&apos;s Get Started
        </Button>
      </div>
    </div>
  );
}