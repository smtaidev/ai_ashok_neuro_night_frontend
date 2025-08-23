import React from 'react';
import PieChartReusable from './reuseable/PieChartReusable';

const ChangeManagement = () => {

    const roadblocksData = [
  { name: "High", value: 47, color: "#F08080" },
  { name: "Medium", value: 27, color: "#FFD700" },
  { name: "Low", value: 26, color: "#2F4F4F" },
];
 const roadblocksPoints = [
    "Leadership Alignment",
    "Communication Strategies",
    "Stakeholder Engagement	",
    "Performance Metrics",
  ];
    return (
        <div>
            <PieChartReusable
            title = "Change Management"
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

export default ChangeManagement;