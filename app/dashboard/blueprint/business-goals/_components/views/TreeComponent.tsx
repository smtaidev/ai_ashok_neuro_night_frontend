//? structure without funtionality 

// "use client";
// import { useGetBusinessGoalOverviewQuery } from '@/redux/api/blueprint/businessGoal/businessGoalApi';
// import React, { useState, useEffect } from 'react';
// import Tree from 'react-d3-tree';
// // import './TreeComponent.css';

// const TreeComponent: React.FC = () => {
//   const [treeData, setTreeData] = useState<any>(null);

//   const data = useGetBusinessGoalOverviewQuery();
//   console.log(data);


//   useEffect(() => {
//     const data = { 
//       name: 'Strategic Theme Name',
//       attributes: { progress: '82%' },
//       children: [
//         {
//           name: 'Business Goal Name',
//           attributes: { progress: '82%' },
//         },
//         {
//           name: 'Business Goal Name',
//           attributes: { progress: '82%' },
//         },
//         {
//           name: 'Business Goal Name',
//           attributes: { progress: '82%' },
//         },
//         {
//           name: 'Business Goal Name',
//           attributes: { progress: '82%' },
//         },
//       ],
//     };
//     setTreeData(data);
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       {treeData && (
//         <Tree
//           data={treeData}
//           orientation="horizontal"
//           translate={{ x: 50, y: 300 }}
//           nodeSize={{ x: 200, y: 200 }}
//           separation={{ siblings: 1, nonSiblings: 1 }}
//           renderCustomNodeElement={(rd3tProps) => {
//             const nodeWidth = Math.max(150, rd3tProps.nodeDatum.name.length * 10 + 20);
//             return (
//               <g>
//                 <rect
//                   width={nodeWidth}
//                   height="50"
//                   x={-nodeWidth / 2}
//                   y="-25"
//                   rx="10"
//                   ry="10"
//                   fill={rd3tProps.nodeDatum.children ? '#34d399' : '#facc15'}
//                   stroke="#4b5563"
//                   strokeWidth="1"
//                 />
//                 <text
//                   fill="#1f2937"
//                   strokeWidth="0"
//                   x="0"
//                   y="0"
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                 >
//                   {rd3tProps.nodeDatum.name}
//                 </text>
//                 <text
//                   fill="#1f2937"
//                   strokeWidth="0"
//                   x="0"
//                   y="15"
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fontSize="10"
//                 >
//                   {rd3tProps.nodeDatum.attributes?.progress}
//                 </text>
//               </g>
//             );
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default TreeComponent;
"use client";
import Loading from "@/app/dashboard/loading";
import { useGetBusinessGoalOverviewQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

// Define types
interface BusinessGoal {
  strategicID: string;
  title: string;
  description: string;
  priority: string;
  goalProgress?: string;
}

interface Theme {
  _id: string;
  name: string;
  description: string;
  businessGoals: BusinessGoal[];
}

interface ApiResponse {
  data: Theme[];
  success: boolean;
  message: string;
}

const TreeComponent: React.FC = () => {
  const { data, isLoading, error } = useGetBusinessGoalOverviewQuery() as { data?: ApiResponse; isLoading: boolean; error?: any };
  const [treeData, setTreeData] = useState<any[]>([]);
  console.log(data);

  useEffect(() => {
    if (data?.data) {
      const transformed = data.data.map((theme: Theme) => ({
        name: theme.name,
        attributes: { description: theme.description },
        children: theme.businessGoals.map((goal: BusinessGoal) => ({
          name: goal.title,
          attributes: {
            description: goal.description,
            priority: goal.priority,
            progress: goal.goalProgress + '%' || "0%",
          },
        })),
      }));

      setTreeData(transformed);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading data</p>;

  return (
    <div className="flex flex-col gap-10 items-start justify-start h-screen overflow-auto bg-gray-100 p-10">
      {treeData.map((tree, index) => (
        <div key={index} className="border rounded-lg bg-white shadow p-6 w-full h-[500px]">
          <Tree
            data={tree}
            orientation="horizontal"
            translate={{ x: 150, y: 200 }}
            nodeSize={{ x: 350, y: 120 }}
            separation={{ siblings: 1.5, nonSiblings: 1.5 }}
            renderCustomNodeElement={(rd3tProps) => {
              const nodeWidth = Math.max(
                150,
                rd3tProps.nodeDatum.name.length * 10
              );

              return (
                <g>
                  <rect
                    width={nodeWidth}
                    height="80"
                    x={-nodeWidth / 2}
                    y="-40"
                    rx="20"
                    ry="20"
                    fill={rd3tProps.nodeDatum.children ? "#F7F7E1" : "#F7F7E1"}
                    stroke="#4b5563"
                    strokeWidth="1"
                  />
                  <text
                    fill="#1f2937"
                    strokeWidth="0"
                    x="0"
                    y="-5"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {rd3tProps.nodeDatum.name}
                  </text>
                  {rd3tProps.nodeDatum.attributes?.priority && (
                    <text
                      fill="#1f2937"
                      strokeWidth="0"
                      x="0"
                      y="12"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      Priority: {rd3tProps.nodeDatum.attributes.priority}
                    </text>
                  )}
                  {rd3tProps.nodeDatum.attributes?.progress && (
                    <text
                      fill="#1f2937"
                      strokeWidth="0"
                      x="0"
                      y="25"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      {rd3tProps.nodeDatum.attributes.progress}
                    </text>
                  )}
                </g>
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TreeComponent;
