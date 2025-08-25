import React from 'react';

interface TeamPageProps {
  params: {
    teamName: string;
  };
}

const TeamPage = ({ params }: TeamPageProps) => {

  return (
    <div>
      <h1>{params.teamName}</h1>
      <p>Team Name: {params?.teamName}</p>
    </div>
  );
};

export default TeamPage;

// import React from 'react';

// const TeamPage = () => {
//   return (
//     <div>
//       <h1>This is Team Page</h1>
//     </div>
//   );
// };

// export default TeamPage;