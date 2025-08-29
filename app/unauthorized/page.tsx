// import React from 'react';
// import Image from 'next/image';
// import { redirect } from 'next/navigation';
// import { Button } from '@/components/ui/button';

// const UnAuthorizedPage = () => {
//   const handleGoBack = () => {
//     window.history.back();
//     setTimeout(() => {
//       redirect('/');
//     }, [1000]);
//   }
//   return (
//     <div className='flex flex-col items-center justify-center h-screen bg-[#F5F7FA]'>
//       <Image
//         src="/image/unauthorized.png"
//         alt="Unauthorized"
//         width={500}
//         height={500}
//         className="h-[60%] w-[50%] mb-6"
//       />
//       <h1 className='text-3xl font-bold text-[#231F20]'>You are not authorized to access this page</h1>
//       <Button variant='link' className='bg-[#231F20] text-white px-6 py-2 rounded-lg mt-4' onClick={handleGoBack}>Go Back</Button>
//     </div>
//   );
// };

// export default UnAuthorizedPage;


"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UnAuthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // Go back if possible, otherwise go home
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F7FA] px-4 text-center">
      <Image
        src="/image/unauthorized.png"
        alt="Unauthorized"
        width={400}
        height={400}
        className="w-full max-w-md mb-6 object-contain"
        priority
      />
      <h1 className="text-2xl md:text-3xl font-bold text-[#231F20]">
        You are not authorized to access this page
      </h1>
      <Button
        onClick={handleGoBack}
        className="mt-6 bg-[#231F20] text-white px-6 py-2 rounded-lg hover:bg-[#383435] transition-colors"
      >
        Go Back
      </Button>
    </div>
  );
};

export default UnAuthorizedPage;
