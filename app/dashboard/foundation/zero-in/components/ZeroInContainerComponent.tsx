'use client';
import React, { useEffect, useState } from 'react'
import ZeroInFirstView from './ZeroInFirstView';
import ZeroInComponent from './ZeroInComponent';

export default function ZeroInContainerComponent() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  useEffect(() => {
    // Check for existing zero-in data
    const savedData = localStorage.getItem('zeroInData');
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
        <ZeroInFirstView onGetStarted={handleGetStarted} />
      ) : (
        <ZeroInComponent />
      )}
    </div>
  )
}




