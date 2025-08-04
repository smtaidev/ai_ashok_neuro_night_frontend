import React from 'react'
import blueprintImage from "@/public/image/blueprint-img-2.png"
import Image from 'next/image'
const BlueprintBanner = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row gap-10 justify-between  p-10 bg-white rounded-2xl border border-gray-200'>
        {/* left side  */}
        <div className='lg:w-[60%] text-xs lg:text-base xl:text-lg '>
            <p className='lg:mb-10'>Blueprint is the second pillar of the strategic journey. It empowers you with a robust roadmap - your compass to a future shaped by your vision and driven by your goals.</p>
            <p>Building on the foundation laid by Assess, Blueprint advances your strategic journey by crafting and integrating three pivotal components: Vision, Strategic Themes, and Business Goals.</p>
        </div>
        {/* right side  */}
        <div className='lg:w-[40%]'>

        <Image className='w-full' src={blueprintImage} alt="blueprint image"/>
        </div>
        </div>
  )
}

export default BlueprintBanner