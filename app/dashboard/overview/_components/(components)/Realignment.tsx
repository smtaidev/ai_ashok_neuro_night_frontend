import React from 'react';
import CultureRealignment from './CultureRealignment';
import ChangeManagement from './ChangeManagement';
import LearningAndDevelopment from './LearningAndDevelopment';

const Realignment = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CultureRealignment/>
            <ChangeManagement/>
            <LearningAndDevelopment/>
        </div>
    );
};

export default Realignment;