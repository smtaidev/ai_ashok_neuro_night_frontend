"use client";
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
// import './TreeComponent.css';

const TreeComponent: React.FC = () => {
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    const data = { 
      name: 'Strategic Theme Name',
      attributes: { progress: '82%' },
      children: [
        {
          name: 'Business Goal Name',
          attributes: { progress: '82%' },
        },
        {
          name: 'Business Goal Name',
          attributes: { progress: '82%' },
        },
        {
          name: 'Business Goal Name',
          attributes: { progress: '82%' },
        },
        {
          name: 'Business Goal Name',
          attributes: { progress: '82%' },
        },
      ],
    };
    setTreeData(data);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {treeData && (
        <Tree
          data={treeData}
          orientation="horizontal"
          translate={{ x: 50, y: 300 }}
          nodeSize={{ x: 200, y: 200 }}
          separation={{ siblings: 1, nonSiblings: 1 }}
          renderCustomNodeElement={(rd3tProps) => {
            const nodeWidth = Math.max(150, rd3tProps.nodeDatum.name.length * 10 + 20);
            return (
              <g>
                <rect
                  width={nodeWidth}
                  height="50"
                  x={-nodeWidth / 2}
                  y="-25"
                  rx="10"
                  ry="10"
                  fill={rd3tProps.nodeDatum.children ? '#34d399' : '#facc15'}
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                <text
                  fill="#1f2937"
                  strokeWidth="0"
                  x="0"
                  y="0"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {rd3tProps.nodeDatum.name}
                </text>
                <text
                  fill="#1f2937"
                  strokeWidth="0"
                  x="0"
                  y="15"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                >
                  {rd3tProps.nodeDatum.attributes?.progress}
                </text>
              </g>
            );
          }}
        />
      )}
    </div>
  );
};

export default TreeComponent;