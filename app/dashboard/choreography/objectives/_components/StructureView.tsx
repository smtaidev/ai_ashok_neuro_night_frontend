'use client'

import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const StructureView = () => {
  const [treeData, setTreeData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mockData = {
      strategicThemes: [
        {
          id: 1,
          name: "Strategic Theme Name",
          progress: { completed: 10, total: 10, percentage: 82 },
          businessGoals: [
            {
              id: 1,
              name: "Business Goal Name",
              progress: { completed: 10, total: 10, percentage: 82 },
              objectives: [
                {
                  id: 1,
                  title: "Lack of Funding",
                  subtitle: "Test Goal",
                  priority: "Urgent",
                  status: "Overdue",
                  category: "Finance",
                  progress: 20,
                  startDate: "2024-01-15",
                  endDate: "2024-02-28",
                },
              ],
            },
          ],
        },
      ],
    };

    // 🔥 Converter function
    const convertData = (data: any) => {
      return data.strategicThemes.map((theme: any) => ({
        name: theme.name,
        attributes: { progress: `${theme.progress.percentage}%` },
        children: theme.businessGoals.map((goal: any) => ({
          name: goal.name,
          attributes: { progress: `${goal.progress.percentage}%` },
          children: goal.objectives.map((obj: any) => ({
            name: obj.title,
            attributes: { progress: `${obj.progress}%` },
          })),
        })),
      }));
    };

    setTreeData(convertData(mockData));
  }, []);

  if (!mounted || !treeData) {
    return <p className="text-center py-4">Loading tree...</p>;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Tree
        data={treeData}
        orientation="horizontal"
        translate={{ x: 50, y: 300 }}
        nodeSize={{ x: 200, y: 200 }}
        separation={{ siblings: 1, nonSiblings: 1 }}
        renderCustomNodeElement={(rd3tProps) => {
          const nodeName = rd3tProps.nodeDatum?.name || "Untitled";
          const nodeWidth = Math.max(150, nodeName.length * 10 + 20);
          const progress = rd3tProps.nodeDatum?.attributes?.progress ?? "";

          return (
            <g>
              <rect
                width={nodeWidth}
                height="50"
                x={-nodeWidth / 2}
                y="-25"
                rx="10"
                ry="10"
                fill={rd3tProps.nodeDatum.children ? "#34d399" : "#facc15"}
                stroke="#4b5563"
                strokeWidth="1"
              />
              <text
                fill="#1f2937"
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {nodeName}
              </text>
              <text
                fill="#1f2937"
                x="0"
                y="15"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
              >
                {progress}
              </text>
            </g>
          );
        }}
      />
    </div>
  )
};

export default StructureView;