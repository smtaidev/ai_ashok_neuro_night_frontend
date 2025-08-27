// 'use client';

// import React, { useCallback, useEffect, useState } from 'react';
// import ObjectComponent from './ObjectComponent';
// import ObjectiveFirstView from './ObjectiveFirstView';
// import { useGetAllObjectivesQuery } from '@/redux/api/choreograph/objectivesApi';

// const ObjectContainerComponent = () => {
//   const [isStarted, setIsStarted] = useState<boolean>(false);

//   const { data: objectiveRes, isLoading, isError } = useGetAllObjectivesQuery();

//   useEffect(() => {
//     if (Array.isArray(objectiveRes?.data) && objectiveRes.data.length > 0) {
//       const firstItem = objectiveRes.data[0];
//       const objective = firstItem._id || {};

//       const hasContent = Object.values(objective).some(
//         (value) => typeof value === 'string' && value.trim() !== ''
//       );
//       setIsStarted(hasContent);
//     } else {
//       setIsStarted(false);
//     }
//   }, [objectiveRes]);

//   const handleGetStarted = useCallback(() => {
//     setIsStarted(true);
//   }, []);

//   if (isLoading) {
//     return <p className="text-center py-4">Loading...</p>;
//   }

//   return (
//     <div>
//       {isStarted ? (
//         <ObjectComponent />
//       ) : (
//         <ObjectiveFirstView onGetStarted={handleGetStarted} />
//       )}
//     </div>
//   );
// };

// export default ObjectContainerComponent;



// {/* ! // Completed Design  */ }
// {/* <ObjectiveFirstView onGetStarted={handleGetStarted} /> */ }
// {/* <ObjectComponent /> */ }


//! Try - 1

// 'use client';

// import React, { useCallback, useEffect, useState } from 'react';
// import ObjectComponent from './ObjectComponent';
// import ObjectiveFirstView from './ObjectiveFirstView';
// import { useGetAllObjectivesQuery } from '@/redux/api/choreograph/objectivesApi';

// const ObjectContainerComponent = () => {
//   const [isStarted, setIsStarted] = useState<boolean>(false);

//   const { data: objectiveRes, isLoading } = useGetAllObjectivesQuery();

//   useEffect(() => {
//     if (Array.isArray(objectiveRes?.data) && objectiveRes.data.length > 0) {
//       const firstItem = objectiveRes.data[0];

//       // Safely check if this item has any meaningful string fields
//       const hasContent = Object.values(firstItem).some(
//         (value) => typeof value === 'string' && value.trim() !== ''
//       );

//       setIsStarted(hasContent);
//     } else {
//       setIsStarted(false);
//     }
//   }, [objectiveRes]);

//   const handleGetStarted = useCallback(() => {
//     setIsStarted(true);
//   }, []);

//   if (isLoading) {
//     return <p className="text-center py-4">Loading...</p>;
//   }

//   return (
//     <div>
//       {isStarted ? (
//         // Pass safe fallback [] so ObjectComponent never receives undefined
//         <ObjectComponent data={objectiveRes?.data ?? []} />
//       ) : (
//         <ObjectiveFirstView onGetStarted={handleGetStarted} />
//       )}
//     </div>
//   );
// };

// export default ObjectContainerComponent;

//! Try - 2

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ObjectComponent from './ObjectComponent';
import ObjectiveFirstView from './ObjectiveFirstView';
import { useGetAllObjectivesQuery } from '@/redux/api/choreograph/objectivesApi';

const ObjectContainerComponent = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const { data: objectiveRes, isLoading } = useGetAllObjectivesQuery();

  useEffect(() => {
    if (Array.isArray(objectiveRes?.data) && objectiveRes.data.length > 0) {
      setIsStarted(true);
    } else {
      setIsStarted(false);
    }
  }, [objectiveRes]);

  const handleGetStarted = useCallback(() => {
    setIsStarted(true);
  }, []);

  if (isLoading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  return (
    <div>
      {isStarted ? (
        <ObjectComponent data={objectiveRes?.data ?? []} />
      ) : (
        <ObjectiveFirstView onGetStarted={handleGetStarted} />
      )}
    </div>
  );
};

export default ObjectContainerComponent;
