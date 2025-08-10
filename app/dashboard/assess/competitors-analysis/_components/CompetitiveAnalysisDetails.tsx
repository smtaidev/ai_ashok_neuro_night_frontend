import React from 'react';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

// Components
const StockChart: React.FC = () => {
  const stockData = [
    { x: 0, y: 40 },
    { x: 10, y: 35 },
    { x: 20, y: 42 },
    { x: 30, y: 38 },
    { x: 40, y: 45 },
    { x: 50, y: 55 },
    { x: 60, y: 48 },
    { x: 70, y: 35 },
    { x: 80, y: 52 },
    { x: 90, y: 58 },
    { x: 100, y: 45 },
    { x: 110, y: 50 },
    { x: 120, y: 38 },
    { x: 130, y: 42 },
    { x: 140, y: 48 },
    { x: 150, y: 65 },
    { x: 160, y: 72 },
    { x: 170, y: 68 },
    { x: 180, y: 75 },
    { x: 190, y: 82 },
    { x: 200, y: 90 }
  ];

  const createPath = (data: { x: number; y: number }[]) => {
    return data.reduce((path, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${path} ${command} ${point.x * 2} ${120 - point.y}`;
    }, '');
  };

  const createAreaPath = (data: { x: number; y: number }[]) => {
    const linePath = createPath(data);
    const lastPoint = data[data.length - 1];
    const firstPoint = data[0];
    return `${linePath} L ${lastPoint.x * 2} 120 L ${firstPoint.x * 2} 120 Z`;
  };

  return (
    <div className="w-full h-48 bg-white rounded-lg">
      <div className="flex justify-end mb-2">
        <div className="text-xs text-gray-500">140</div>
      </div>
      <div className="relative">
        <svg width="400" height="120" viewBox="0 0 400 120" className="w-full h-32">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Area under curve */}
          <path
            d={createAreaPath(stockData)}
            fill="url(#stockGradient)"
            opacity="0.3"
          />
          
          {/* Stock line */}
          <path
            d={createPath(stockData)}
            fill="none"
            stroke="#4F46E5"
            strokeWidth="2"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="stockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
              <stop offset="100%" style={{stopColor: '#4F46E5', stopOpacity: 0.1}} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Right axis labels */}
        <div className="absolute right-0 top-0 h-32 flex flex-col justify-between text-xs text-gray-400 pr-2">
          <div>120</div>
          <div>100</div>
          <div>80</div>
          <div>60</div>
          <div>40</div>
          <div>20</div>
        </div>
      </div>
    </div>
  );
};

const SentimentGauge: React.FC<{ value: number }> = ({ value }) => {
  const radius = 60;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * Math.PI; // Half circle
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16">
        <svg
          height={radius}
          width={radius * 2}
          className="transform"
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth} ${radius - strokeWidth} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth} ${radius - strokeWidth}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth} ${radius - strokeWidth} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth} ${radius - strokeWidth}`}
            fill="none"
            stroke="#4F46E5"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
        </div>
      </div>
    </div>
  );
};

const CompetitiveAnalysisDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column - Competitive Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Competitive Analysis</h2>
          
          {/* Company Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input 
              type="text" 
              value="www.demo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-500 bg-gray-50"
              readOnly
            />
          </div>

          {/* Revenue and Employees */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Annual Revenue</div>
              <div className="text-lg font-semibold text-blue-600">$39,000,00.00</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Total Number Of Employees</div>
              <div className="text-lg font-semibold text-gray-900">20</div>
            </div>
          </div>

          {/* Recent Media Coverage */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Media Coverage</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the <span className="text-blue-600">printing and typesetting</span> industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a <span className="text-blue-600">galley of type and scrambled it to</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the <span className="text-blue-600">printing and typesetting</span> industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a <span className="text-blue-600">galley of type and scrambled it to</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the <span className="text-blue-600">printing and typesetting</span> industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a <span className="text-blue-600">galley of type and scrambled it to</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Stock Performance & Social Media */}
        <div className="space-y-6">
          
          {/* Stock Performance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Performance</h2>
            <StockChart />
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Social Media</h2>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Social Media Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Number of Followers</div>
                  <div className="font-semibold text-gray-900">30K</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Total Post</div>
                <div className="font-semibold text-gray-900">300</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Engagement Ration</div>
                <div className="font-semibold text-gray-900">1-3%</div>
              </div>
            </div>

            {/* Sentiment Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Sentiment Summary</h3>
              <SentimentGauge value={75} />
            </div>

            {/* Social Media Sentiment Trends */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Social Media</h3>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Sentiment Trends</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Net Sentiment Score</div>
                  <div className="text-xs text-gray-500">
                    38% difference between positive and negative sentiment this period
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Net Sentiment Trend</div>
                  <div className="text-xs text-gray-500">
                    Your net sentiment score decreased by 11% compared to the previous period
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysisDetails;