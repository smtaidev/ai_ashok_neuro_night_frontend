

// import React from "react";
// import BeforePage from "./_comoponents/BeforePage";
// import AfterPage from "./_comoponents/AfterPage";

// // import Modal from "./Modal"; // Import the new modal component

// const Vision = () => {


//   return (

//     <div>
//         <BeforePage></BeforePage>
//         <AfterPage></AfterPage>
//     </div>

    
//   );
// };

// export default Vision;


// "use client";

// import React, { useState } from "react";
// import BeforePage from "./_comoponents/BeforePage";
// import AfterPage from "./_comoponents/AfterPage";
// import { useGetVisionsQuery } from "@/redux/api/blueprint/vison/visonApi";



// const Vision = () => {
//   const [vision, setVision] = useState({});
//   const { data, isLoading, isError } = useGetVisionsQuery();
//   setVision(data?.data || {});
//   console.log(data?.data, "Vision Data");

//   if (isLoading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (isError) {
//     return <p className="text-center text-red-500">Failed to load vision data</p>;
//   }

//   // ✅ if vision exists → AfterPage
//   if (data?.data && data.data.length > 0) {
//     return <AfterPage visionData={vision} />;
//   }

//   // ❌ if no vision yet → BeforePage
//   return <BeforePage />;
// };

// export default Vision;


"use client";

import React, { useState, useEffect } from "react";
import BeforePage from "./_comoponents/BeforePage";
import AfterPage from "./_comoponents/AfterPage";
import { useGetVisionsQuery } from "@/redux/api/blueprint/vison/visonApi";

const Vision = () => {
  const [vision, setVision] = useState<any>(null);
  const { data, isLoading, isError } = useGetVisionsQuery();

  // ✅ update state only when data changes
  useEffect(() => {
    if (data?.data) {
      setVision(data.data);
    }
  }, [data]);

  console.log(vision, "Vision Data");

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load vision data</p>;
  }

  if (!vision || null ) {
    return <BeforePage />;
  }
  // ✅ if vision exists → AfterPage
  if (vision) {
    return <AfterPage visionData={vision} />;
  }

  // ❌ if no vision yet → BeforePage
  // return <BeforePage />;
};

export default Vision;
