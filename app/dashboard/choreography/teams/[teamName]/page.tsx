'use client';

import React from "react";
import { useParams } from "next/navigation";
import TeamMemberPage from "./_component/TeamMember";

interface Params {
  [key: string]: string | undefined;
}

const TeamPage = () => {
  const { teamName } = useParams<Params>();

  return (
    <div>
      {teamName ? (
        <TeamMemberPage teamName={teamName} />
      ) : (
        <p>Team not found</p>
      )}
    </div>
  );
};

export default TeamPage;
