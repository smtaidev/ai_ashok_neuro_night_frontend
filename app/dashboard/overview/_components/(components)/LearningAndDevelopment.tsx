import React from 'react';
import PieChartReusable from './reuseable/PieChartReusable';

const LearningAndDevelopment = () => {

    const roadblocksData = [
  { name: "High", value: 47, color: "#F08080" },
  { name: "Medium", value: 27, color: "#FFD700" },
  { name: "Low", value: 26, color: "#2F4F4F" },
];
 const roadblocksPoints = [
    "Upskilling Programs",
    "Leadership Development",
    "Continuous Learning Culture",
    "Mentorship and Coaching",
  ];
    return (
        <div>
            <PieChartReusable
            title = "Learning and Development"
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

export default LearningAndDevelopment;