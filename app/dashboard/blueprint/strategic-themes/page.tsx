// import React from 'react';
// import StrategicThemeBefore from './_components/StrategicBefore';
// import StrategicAfter from './_components/StrategicAfter';

// const page = () => {
//     return (
//         <div>
//             <StrategicThemeBefore></StrategicThemeBefore>
//             <StrategicAfter></StrategicAfter>
//         </div>
//     );
// };

// export default page;

"use client";

import React, { useEffect } from "react";
import StrategicThemeBefore from "./_components/StrategicBefore";
import StrategicAfter from "./_components/StrategicAfter";
import { useGetStrategicThemesQuery } from "@/redux/api/blueprint/strategicTheme/strategicThemeApi";

// ---- Response type ----
export interface StrategicTheme {
  _id: string;
  name: string;
  description: string;
}

interface StrategicThemeResponse {
  success: boolean;
  message: string;
  data: StrategicTheme[];
}

const Page = () => {
  const { data, isLoading, isError } =
    useGetStrategicThemesQuery() as {
      data?: StrategicThemeResponse;
      isLoading: boolean;
      isError: boolean;
    };

  // log data when it changes
  useEffect(() => {
    if (data) {
      console.log("Strategic Themes API Response:", data);
    }
  }, [data]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to fetch Strategic Themes
      </p>
    );
  }

  // ✅ Conditionally render
  if (data && data?.data?.length > 0) {
    return <StrategicAfter themes={data.data} />; // pass themes as props
  }

  return <StrategicThemeBefore />;
};

export default Page;
