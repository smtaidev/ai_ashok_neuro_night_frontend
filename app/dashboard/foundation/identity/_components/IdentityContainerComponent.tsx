'use client';

import React, { useState, useEffect, useCallback } from 'react';
import IdentityFirstView from './IdentityFirstView';
import { useGetIdentityDataQuery } from '@/redux/api/foundation/foundationApi';
import IdentityComponent from './IdentityComponent';

export default function IdentityContainerComponent() {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const { data: identityRes, isLoading, isError } = useGetIdentityDataQuery();

  console.log('identityRes', identityRes);

  useEffect(() => {
    if (Array.isArray(identityRes?.data) && identityRes.data.length > 0) {
      const firstItem = identityRes.data[0];
      const identity = firstItem.identity || {};


      const hasMission = identity?.mission !== null && identity?.mission?.trim() !== '';
      const hasValue = identity?.value !== null && identity?.value?.trim() !== '';
      const hasPurpose = identity?.purpose !== null && identity?.purpose?.trim() !== '';

      const hasContent = hasMission || hasValue || hasPurpose;

      setIsStarted(hasContent);
    } else {
      setIsStarted(false);
    }
  }, [identityRes]);

  const handleGetStarted = useCallback(() => {
    setIsStarted(true);
  }, []);

  if (isLoading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-4 text-red-500">Failed to load identity data.</p>;
  }

  return (
    <div>
      {isStarted ? (
        <IdentityComponent />
      ) : (
        <IdentityFirstView onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}


