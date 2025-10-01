"use client"
import React, { useState, useEffect } from 'react';

const GaugeChart = () => {
  const [value, setValue] = useState(60);
  
  // Auto-update value every 3 seconds like in your original code
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => {
        const inc = Math.round((Math.random() - 0.5) * 20);
        let newVal = prevValue + inc;
        if (newVal < 0 || newVal > 100) {
          newVal = prevValue - inc;
        }
        return Math.max(0, Math.min(100, newVal));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate needle rotation (180 degrees for 0-100 range)
  const needleRotation = (value / 100) * 180 - 90;

  return (
    <div >
        <svg 
          width="384" 
          height="192" 
          viewBox="0 0 384 192" 
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d="M 48 168 A 144 144 0 0 1 336 168"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Red segment (0-20) */}
          <path
            d="M 48 168 A 144 144 0 0 0 91.76 81.94"
            fill="none"
            stroke="#dc2626"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Orange segment (20-40) */}
          <path
            d="M 91.76 81.94 A 144 144 0 0 0 148.8 38.4"
            fill="none"
            stroke="#ea580c"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Yellow segment (40-60) */}
          <path
            d="M 148.8 38.4 A 144 144 0 0 0 235.2 38.4"
            fill="none"
            stroke="#ca8a04"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Green segment (60-100) */}
          <path
            d="M 235.2 38.4 A 144 144 0 0 0 336 168"
            fill="none"
            stroke="#16a34a"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Scale marks and numbers */}
          {[0, 20, 40, 60, 80, 100].map((mark, index) => {
            const angle = (mark / 100) * 180 + 180;
            const radian = (angle * Math.PI) / 180;
            const x1 = 192 + Math.cos(radian) * 132;
            const y1 = 168 + Math.sin(radian) * 132;
            const x2 = 192 + Math.cos(radian) * 120;
            const y2 = 168 + Math.sin(radian) * 120;
            const textX = 192 + Math.cos(radian) * 150;
            const textY = 168 + Math.sin(radian) * 150;
            
            return (
              <g key={index}>
                {/* Scale mark */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#4b5563"
                  strokeWidth="2"
                />
                {/* Scale number */}
                <text
                  x={textX}
                  y={textY + 6}
                  textAnchor="middle"
                  className="text-base font-semibold fill-gray-700"
                  style={{ fontSize: '16px' }}
                >
                  {mark}
                </text>
              </g>
            );
          })}
          
          {/* Minor tick marks */}
          {[10, 30, 50, 70, 90].map((mark, index) => {
            const angle = (mark / 100) * 180 + 180;
            const radian = (angle * Math.PI) / 180;
            const x1 = 192 + Math.cos(radian) * 132;
            const y1 = 168 + Math.sin(radian) * 132;
            const x2 = 192 + Math.cos(radian) * 126;
            const y2 = 168 + Math.sin(radian) * 126;
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#6b7280"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Needle */}
          <line
            x1="192"
            y1="168"
            x2="192"
            y2="54"
            stroke="#374151"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${needleRotation} 192 168)`}
            className="transition-transform duration-1000 ease-in-out"
          />
          
          {/* Center pivot outer ring */}
          <circle
            cx="192"
            cy="168"
            r="12"
            fill="#d1d5db"
            stroke="#6b7280"
            strokeWidth="2"
          />
          
          {/* Center pivot inner circle */}
          <circle
            cx="192"
            cy="168"
            r="8"
            fill="#9ca3af"
          />
          
          {/* Center dot */}
          <circle
            cx="192"
            cy="168"
            r="3"
            fill="#374151"
          />
        </svg>
    </div>
  );
};

export default GaugeChart;