import React from 'react';
import PieChartReusable from './reuseable/PieChartReusable';

const CultureRealignment = () => {

    const roadblocksData = [
  { name: "High", value: 47, color: "#F08080" },
  { name: "Medium", value: 27, color: "#FFD700" },
  { name: "Low", value: 26, color: "#2F4F4F" },
];
 const roadblocksPoints = [
    "Core Values & Behaviors",
    "Talent Development",
    "Collaboration & Partnerships	",
    "Decision-Making Guidelines",
  ];
    return (
        <div>
            <PieChartReusable
            title = "Culture Realignment"
             subtitle=''
              data={roadblocksData}
               points={roadblocksPoints}
                footerLinkText = "Explore More"
                 footerLinkHref='#'
                 secondTitle=""
            />
        </div>
    );
};

export default CultureRealignment;