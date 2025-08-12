"use client";
import React from "react";
import SharedDrawerButton from "../blueprint/_components/reuseable/SharedDrawerButton";

import MeetingsSliderData from "@/public/static-json-data/Meetings/Meetings-slider-data";
import UpcomingMeetingsTable from "./_components/UpcomingMeetingsTable";
import ActionItemsTable from "./_components/ActionItemsTable";
import LastMeetingActionItemsTable from "./_components/LastMeetingActionItemsTable";
import MyNotes from "./_components/MyNotes";
import TakeMeetingMinutes from "./_components/TakeMeetingMinutes";
import LastTwoMeetings from "./_components/LastTwoMeeting";

const page = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] p-4">
      <div className="flex justify-end">
        <SharedDrawerButton
          title="Meetings"
          buttonLabel="More info"
          content={<MeetingsSliderData />}
          buttonClassName=" bg-blue-800 hover:bg-blue-900 cursor-pointer text-white font-bold py-2 px-4 rounded"
          isAi={false}
        />
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-4">
        <UpcomingMeetingsTable/>
        <ActionItemsTable/>
        <LastMeetingActionItemsTable/>
        <MyNotes/>
      </div>

      <div className="mt-6">
        <TakeMeetingMinutes/>
        {/* after grid  */}
      </div>
      <div className="mt-6">
        {/* last one  */}
        <LastTwoMeetings/>
      </div>
    </div>
  );
};

export default page;
