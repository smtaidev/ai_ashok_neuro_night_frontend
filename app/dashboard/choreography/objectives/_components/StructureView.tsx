'use client';

import { useGetAllObjectivesOverviewQuery } from '@/redux/api/choreograph/objectivesApi';
import React, { useEffect, useRef, useState } from 'react';
import Tree, { RawNodeDatum } from 'react-d3-tree';

const StructureView = () => {
  const { data, isLoading, isError } = useGetAllObjectivesOverviewQuery();
  const [treeData, setTreeData] = useState<RawNodeDatum[]>([]);
  const [mounted, setMounted] = useState(false);
  const treeContainer = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // ✅ Convert API Data → D3 Tree format
  const convertData = (themes: any[]): RawNodeDatum[] => {
    return themes.map((theme) => ({
      name: theme.name,
      attributes: { description: theme.description },
      children: (theme.businessGoals || []).map((goal: any) => ({
        name: goal.title,
        attributes: {
          priority: goal.priority,
          progress: `${goal.goalProgress}%`,
        },
        children: (goal.objectives || []).map((obj: any) => ({
          name: obj.title,
          attributes: {
            priority: obj.priority,
            progress: obj.progress,
          },
        })),
      })),
    }));
  };

  // ✅ Handle Data
  useEffect(() => {
    setMounted(true);
    if (data?.data) {
      setTreeData(convertData(data.data));
    }
  }, [data]);

  // ✅ Auto-center tree based on container
  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: width / 4, y: height / 2 });
    }
  }, [mounted]);

  if (isError) return <p className="text-center py-4 text-red-500">❌ Failed to load objectives data.</p>;
  if (isLoading || !mounted || !treeData.length) return <p className="text-center py-4">Loading tree...</p>;

  return (
    <div ref={treeContainer} className="w-full bg-gray-100 grid grid-cols-1 gap-10 p-4 overflow-auto">
      {treeData.map((rootNode, idx) => (
        <div key={idx} className="border rounded-xl shadow bg-white p-4 h-[600px]">
          <Tree
            data={rootNode} // ✅ Pass a single root at a time
            orientation="horizontal"
            translate={translate}
            nodeSize={{ x: 250, y: 200 }}
            separation={{ siblings: 1, nonSiblings: 1.2 }}
            renderCustomNodeElement={({ nodeDatum }) => {
              const rawName = nodeDatum.name || "Untitled";
              const nodeName = rawName.length > 10 ? rawName.slice(0, 10) + "..." : rawName;
              const nodeWidth = Math.max(160, nodeName.length * 8 + 30);
              const attrs = nodeDatum.attributes ?? {};

              return (
                <g>
                  {/* Card Shape */}
                  <rect
                    width={nodeWidth}
                    height="70"
                    x={-nodeWidth / 2}
                    y="-35"
                    rx="12"
                    ry="12"
                    fill={nodeDatum.children ? '#fefce8' : '#e0f2fe'}
                    stroke="#4b5563"
                    // 1.2
                    strokeWidth="1.2"
                    className="shadow-md"
                  />
                  {/* Title */}
                  <text fill="#111827" x="0" y="-10" textAnchor="middle" fontWeight="100">
                    {nodeName}
                  </text>
                  {/* Priority */}
                  {attrs.priority && (
                    <text fill="#374151" x="0" y="10" textAnchor="middle" fontWeight="100" fontSize="11">
                      Priority: {attrs.priority}
                    </text>
                  )}
                  {/* Progress */}
                  {attrs.progress && (
                    <text fill="#374151" x="0" y="24" textAnchor="middle" fontWeight="100" fontSize="11">
                      {attrs.progress}
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

export default StructureView;


