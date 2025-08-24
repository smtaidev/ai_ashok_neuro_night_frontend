
import React from 'react';
import AddMeetingBanner from './_components/AddMeetingBanner';
import UpcomingMeetings from './_components/UpcomingMeetings';

const page = () => {
    return (
        <div className='space-y-6 pl-6 min-h-[calc(100vh-100px)]'>
            <AddMeetingBanner />
            <UpcomingMeetings/>
        </div>
    );
};

export default page;