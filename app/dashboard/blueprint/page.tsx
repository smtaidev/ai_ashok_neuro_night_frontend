
import React from 'react'

import BlueprintBanner from './_components/BlueprintBanner'
import CoreComponents from './_components/CoreComponents'


const Blueprint = () => {
  return (
    <div className='bg-blue-50/50 min-h-[calc(100vh-65px)] p-5'>
        
         <BlueprintBanner></BlueprintBanner>
        <CoreComponents></CoreComponents> 
         <div className='space-y-5 p-10 bg-white rounded-2xl border border-gray-200 mt-5'>
            <p className='text-base text-[#231f20]'>Blueprint is a strategic symphony where Vision, Strategic Themes, and Business Goals work together to create a future of unparalleled success.</p>
            <p className='text-base text-[#231f20] font-bold'>If you have any questions or need assistance, you can chat with CalrhetAI to learn more, your strategic partner, who is available 24/7.</p>
         </div>
        
         </div>
  )
}

export default Blueprint