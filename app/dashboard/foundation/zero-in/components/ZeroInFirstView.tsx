import React from 'react'
import { FirstViewProps } from '../../identity/components/IdentityFirstView'
import { Button } from '@/components/ui/button'
import Image from 'next/image'


export default function ZeroInFirstView({ onGetStarted }: FirstViewProps) {
  return (
    <div className='dashboard-container bg-[#f9fafb]'>
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <Image
          src="/image/zero-in-img.png"
          alt="Zero In Icon"
          width={200}
          height={500}
          className="h-130 w-110 mb-6"
        />
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Focus Your Strategy</h1>
          <p className='text-lg text-gray-600 mt-4'>
            Please define the mission, values, and purpose. These are essential in shaping your company&apos;s identity and guiding your strategic direction.
          </p>
        </div>
        <Button variant="getStarted" onClick={onGetStarted}>
          <span className="text-2xl font-[300]">+</span>Let&apos;s Get Started
        </Button>
      </div>
    </div>
  )
}