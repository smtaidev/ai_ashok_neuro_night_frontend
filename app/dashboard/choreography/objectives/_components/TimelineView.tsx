import React from 'react';

const TimelineView = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const projects = [
    { name: "Project 1", progress: 35, startMonth: 0, duration: 1.5 },
    { name: "Project 2", progress: 36, startMonth: 2, duration: 2.5 },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-6 gap-4 border-b border-gray-200 pb-4">
        <div className="font-medium text-gray-900"># Name</div>
        {months.map((month) => (
          <div key={month} className="text-center">
            <div className="font-medium text-gray-900 mb-2">{month}</div>
            <div className="grid grid-cols-7 gap-1 text-xs text-gray-400">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 items-center">
            <div className="font-medium text-gray-700">{project.name}</div>
            <div className="col-span-5 relative">
              <div className="h-8 bg-gray-50 rounded relative">
                <div
                  className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
                  style={{
                    left: `${(project.startMonth / 5) * 100}%`,
                    width: `${(project.duration / 5) * 100}%`,
                  }}
                >
                  <span className="text-xs text-white font-medium">{project.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimelineView;