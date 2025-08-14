

"use client";

import { useGetTrendsQuery } from "@/redux/api/trend/trendApi";
import TrendsDashboard from "./_components/TrendDashboard";
import TrendFirstView from "./_components/TrendFirstView";

export default function TrendsPage() {
  const { data, isLoading } = useGetTrendsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(!data || data.length === 0) ? <TrendFirstView /> : <TrendsDashboard />}
    </div>
  );
}