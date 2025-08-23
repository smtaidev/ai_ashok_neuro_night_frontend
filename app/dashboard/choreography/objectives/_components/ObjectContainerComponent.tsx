'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ObjectComponent from './ObjectComponent';
import ObjectiveFirstView from './ObjectiveFirstView';

const ObjectContainerComponent = () => {
  const [isStated, setIsStarted] = useState<boolean>(false)

  // const { data: objectiveRes, isLoading, isError } = useGetObjectiveDataQuery();

  // useEffect(() => {
  //   if (Array.isArray(objectiveRes?.data) && objectiveRes.data.length > 0) {
  //     const firstItem = objectiveRes.data[0];
  //     const objective = firstItem.objective || {};

  //     const hasContent = Object.values(objective).some(
  //       (value) => typeof value === 'string' && value.trim() !== ''
  //     );
  //     setIsStarted(hasContent);
  //   } else {
  //     setIsStarted(false);
  //   }
  // }, [objectiveRes]);

  const handleGetStarted = useCallback(() => {
    setIsStarted(true);
  }, []);

  // if (isLoading) {
  //   return <p className="text-center py-4">Loading...</p>;
  // }

  return (
    <div>
      {/* {
        isStated ? (
          <ObjectComponent/>
        ):
        (
          <ObjectiveFirstView onGetStarted={handleGetStarted}/>
        )
      } */}
      {/* ! // Completed Design  */}
      {/* <ObjectiveFirstView onGetStarted={handleGetStarted} /> */}
      <ObjectComponent />

    </div>
  );
};

export default ObjectContainerComponent;