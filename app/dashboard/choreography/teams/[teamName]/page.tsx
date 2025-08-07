import React from 'react';

const TeamPage = ({ params }: { params: { teamName: string } }) => {
  console.log('Team Name:', params?.teamName);
  return (
    <div>
      <h1>Asho kheli: {params?.teamName}</h1>
    </div>
  );
};

export default TeamPage;