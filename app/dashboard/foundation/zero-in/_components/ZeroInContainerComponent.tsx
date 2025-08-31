// 'use client';
// import React, { useCallback, useEffect, useState } from 'react'
// import ZeroInFirstView from './ZeroInFirstView';
// import ZeroInComponent from './ZeroInComponent';
// import { useGetZeroInDataQuery } from '@/redux/api/foundation/foundationApi';

// export default function ZeroInContainerComponent() {
//   const [isStarted, setIsStarted] = useState<boolean>(false);
//   const { data: zeroInRes, isLoading, isError } = useGetZeroInDataQuery();
//   useEffect(() => {
//     if (Array.isArray(zeroInRes?.data) && zeroInRes.data.length > 0) {
//       const firstItem = zeroInRes.data[0];
//       const zeroIn = firstItem.zeroIn || {};

//       const hasContent = Object.values(zeroIn).some(
//         (value) => typeof value === 'string' && value.trim() !== ''
//       );
//       setIsStarted(hasContent);
//     } else {
//       setIsStarted(false);
//     }
//   }, [zeroInRes]);

//   const handleGetStarted = useCallback(() => {
//     setIsStarted(true);
//   }, []);

//   if (isLoading) {
//     return <p className="text-center py-4">Loading...</p>;
//   }

//   if (isError) {
//     return <p className="text-center py-4 text-red-500">Failed to load identity data.</p>;
//   }

//   return (
//     <div>
//       {!isStarted ? (
//         <ZeroInFirstView onGetStarted={handleGetStarted} />
//       ) : (
//         <ZeroInComponent />
//       )}
//     </div>
//   )
// }



'use client';
import React, { useCallback, useEffect, useState } from 'react';
import ZeroInFirstView from './ZeroInFirstView';
import ZeroInComponent from './ZeroInComponent';
import { useGetZeroInDataQuery } from '@/redux/api/foundation/foundationApi';

export default function ZeroInContainerComponent() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { data: zeroInRes, isLoading, isError } = useGetZeroInDataQuery();



  useEffect(() => {
    if (Array.isArray(zeroInRes?.data) && zeroInRes.data.length > 0) {
      const firstItem = zeroInRes.data[0];
      const zeroIn = firstItem.zeroIn || {};

      const hasContent =
        (zeroIn.targetCustomer !== null && zeroIn.targetCustomer.trim() !== '') ||
        (zeroIn.keyCustomerNeed !== null && zeroIn.keyCustomerNeed.trim() !== '') ||
        (zeroIn.valueProposition !== null && zeroIn.valueProposition.trim() !== '');

      setIsStarted(hasContent);
    } else {
      setIsStarted(false);
    }
  }, [zeroInRes]);

  const handleGetStarted = useCallback(() => {
    setIsStarted(true);
  }, []);

  if (isLoading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-4 text-red-500">Failed to load zeroIn data.</p>;
  }

  return (
    <div>
      {!isStarted ? (
        <ZeroInFirstView onGetStarted={handleGetStarted} />
      ) : (
        <ZeroInComponent />
      )}
    </div>
  );
}
