import { Metadata } from 'next';
import React from 'react';

const metadata: Metadata = {
  title: 'Asho Kheli',
  description: 'Asho Kheli Team Page',
};

const TeamPage = ({ params }: { params: { teamName: string } }) => {

  return (
    <div>
      <h1>Asho kheli: {params.teamName}</h1>
    </div>
  );
};

export default TeamPage;
