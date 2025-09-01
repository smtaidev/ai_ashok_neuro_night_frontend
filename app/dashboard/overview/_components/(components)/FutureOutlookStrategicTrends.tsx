import React from 'react';
import TrendsCard from './TrendsCard';
import CompetitorAnalysis from './CompetitorAnalysis';
import OnTheRadar from './RecommendationsSection';

const FutureOutlookStrategicTrends = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='col-span-1'>

            <TrendsCard/>
            </div>
  <div className='col-span-2'>

            <CompetitorAnalysis/>
  </div>
            
            <div className='col-span-3'>
                
                <OnTheRadar/>
                </div>
        </div>
    );
};

export default FutureOutlookStrategicTrends;