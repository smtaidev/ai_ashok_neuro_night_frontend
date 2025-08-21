// "use client";

// import React from "react";
// import BeforePage from "./_comoponents/BeforePage";
// import AfterPage from "./_comoponents/AfterPage";
// import { useGetVisionsQuery } from "@/redux/api/blueprint/vison/visonApi";
// import Loading from "../../loading";

// type VisionDoc = { _id: string; vision: string };
// type VisionResponse = {
//   success: boolean;
//   message: string;
//   data: VisionDoc | Record<string, never> | null; // handle empty {}
// };

// // generic emptiness check
// const isEmpty = (v: unknown): boolean => {
//   if (v == null) return true;                           // null/undefined
//   if (typeof v === "string") return v.trim() === "";    // ""
//   if (Array.isArray(v)) return v.length === 0;          // []
//   if (typeof v === "object") return Object.keys(v).length === 0; // {}
//   return false;
// };

// const Vision = () => {
//   const { data, isLoading, isError } =
//     useGetVisionsQuery<VisionResponse>();

//   if (isLoading) return <Loading />;
//   if (isError)   return <p className="text-center text-red-500">Failed to load vision data</p>;

//   const vision = data?.data;

//   // show Before when no vision (null, "", {}, [])
//   if (isEmpty(vision)) return <BeforePage />;

//   // show After when vision exists
//   return <AfterPage visionData={vision as VisionDoc} />;
// };

// export default Vision;





//? working code





// "use client";

// import React, { useState, useEffect } from "react";
// import BeforePage from "./_comoponents/BeforePage";
// import AfterPage from "./_comoponents/AfterPage";
// import { useGetVisionsQuery } from "@/redux/api/blueprint/vison/visonApi";
// import Loading from "../../loading";

// interface VisionData {
//   _id: string;
//   vision: string;
// }

// interface VisionResponse {
//   success: boolean;
//   message: string;
//   data: VisionData | null;
// }

// const Vision = () => {
//   const { data:vision, isLoading, isError } = useGetVisionsQuery() as {
//     data?: VisionResponse;
//     isLoading: boolean;
//     isError: boolean;
//   };
// // console.log(data, "data");
//   // const [vision, setVision] = useState<VisionData | null>(null);
//   // const [vision, setVision] = useState<VisionData | null>(null);

//   // useEffect(() => {
//   //   if (data?.data) {
//   //     setVision(data.data);
//   //   }
//   // }, [data]);

  
//   // if (isLoading) {
//   //   return <Loading />;
//   // }
  
//   // if (isError) {
//   //   return (
//   //     <p className="text-center text-red-500">
//   //       Failed to load vision data
//   //     </p>
//   //   );
//   // }
//   console.log("vision: ", vision?.vision);
//   // return <BeforePage />;
//   if(vision?.vision === ""){
//     return <BeforePage />;
//   }
//   // Conditionally render based on whether vision object exists
//   return <AfterPage visionData={vision as VisionData} />;
    
// };

// export default Vision;




"use client";

import React from "react";
import BeforePage from "./_comoponents/BeforePage";
import AfterPage from "./_comoponents/AfterPage";
import { useGetVisionsQuery } from "@/redux/api/blueprint/vison/visonApi";
import Loading from "../../loading";

interface VisionData {
  _id: string;
  vision: string;
}

interface VisionResponse {
  success: boolean;
  message: string;
  data: VisionData | null;
}

const Vision = () => {
  const { data, isLoading, isError } = useGetVisionsQuery() as {
    data?: VisionResponse;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load vision data
      </p>
    );
  }

  const vision = data?.data; // ✅ now we’re only grabbing the object inside "data"

  console.log("vision: ", vision);

  // If no vision or empty string → show BeforePage
  if (!vision || !vision.vision || vision.vision === "") {
    return <BeforePage />;
  }

  // Otherwise show AfterPage
  return <AfterPage visionData={vision} />;
};

export default Vision;
