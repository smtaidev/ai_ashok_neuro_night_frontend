import React from 'react';
import StrategicThemeData from '../StrategicThemeData';
import TotalCapabilities from '../TotalCapabilities';
import SwotAnalysis from '../SwotAnalysisData';
import DifferentiationSection from '../DifferentiationSection';
import MeetingsSection from '../UpcomingMeetingsDashboard';
import BusinessGoalsData from '../BusinessGoalsData';

const StrategicThemeContainerPage = () => {
  return (
    <div className='space-y-6'>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="lg:col-span-2">
          <StrategicThemeData />
        </div>
        <div className="">
          <TotalCapabilities />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-6">
          <SwotAnalysis />
          <BusinessGoalsData />
        </div>
        <div className="space-y-6">
          <DifferentiationSection />
          <MeetingsSection />
        </div>
      </div>

    </div>
  );
};

export default StrategicThemeContainerPage;