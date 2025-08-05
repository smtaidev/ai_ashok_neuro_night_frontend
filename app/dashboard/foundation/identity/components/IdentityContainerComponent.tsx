'use client';

import React, { useState, useEffect } from 'react';
import IdentityComponent from './IdentityComponent';
import IdentityFirstView from './IdentityFirstView';

export default function IdentityContainerComponent() {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing identity data
    const savedData = localStorage.getItem('identityData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Check if any section has content
      const hasContent = parsedData.some((section: any) => section.content && section.content.trim() !== '');
      setIsStarted(hasContent);
    }
  }, []);

  const handleGetStarted = () => {
    setIsStarted(true);
  };

  return (
    <div>
      {!isStarted ? (
        <IdentityFirstView onGetStarted={handleGetStarted} />
      ) : (
        <IdentityComponent />
      )}
    </div>
  );
}