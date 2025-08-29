'use client';

import React, { useState, useEffect, useCallback } from 'react';
import IdentityFirstView from './IdentityFirstView';
import { useGetIdentityDataQuery } from '@/redux/api/foundation/foundationApi';
import IdentityFirstTimePage from './IdentityFirstTime';
import IdentityComponent from './IdentityComponent';

export default function IdentityContainerComponent() {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const { data: identityRes, isLoading, isError } = useGetIdentityDataQuery();

  useEffect(() => {
    if (Array.isArray(identityRes?.data) && identityRes.data.length > 0) {
      const firstItem = identityRes.data[0];
      const identity = firstItem.identity || {};

      const hasContent = Object.values(identity).some(
        (value) => typeof value === 'string' && value.trim() !== ''
      );
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
        // <IdentityFirstTimePage />
        <IdentityComponent />
      ) : (
        <IdentityFirstView onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}



