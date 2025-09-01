import React from 'react';
import BusinessGoals from './BusinessGoals';
import BusinessGoalDataOverview from './BusinessGoalDataOverview';

const ProgressOverview = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <BusinessGoals/>
                <BusinessGoalDataOverview/>             
        </div>
    );
};

export default ProgressOverview;