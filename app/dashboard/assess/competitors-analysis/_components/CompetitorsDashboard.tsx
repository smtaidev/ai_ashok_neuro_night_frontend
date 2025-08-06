"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Mock data for the stock performance chart
const stockData = [
  { value: 40 },
  { value: 45 },
  { value: 50 },
  { value: 55 },
  { value: 65 },
  { value: 80 },
  { value: 85 },
  { value: 75 },
  { value: 45 },
  { value: 40 },
  { value: 50 },
  { value: 55 },
  { value: 45 },
  { value: 85 },
  { value: 90 },
  { value: 95 },
  { value: 80 },
  { value: 70 },
  { value: 45 },
  { value: 40 },
  { value: 50 },
  { value: 65 },
  { value: 70 },
  { value: 75 },
  { value: 80 },
  { value: 85 },
  { value: 90 },
  { value: 95 },
  { value: 100 },
  { value: 75 },
  { value: 70 },
  { value: 85 },
  { value: 90 },
  { value: 95 },
  { value: 100 },
  { value: 105 },
  { value: 110 },
  { value: 115 },
  { value: 120 },
  { value: 125 }
];

interface MediaCoverageItem {
  id: number;
  text: string;
}

interface DashboardProps {
  // Competitive Analysis Props
  companyName?: string;
  annualRevenue?: string;
  totalEmployees?: number;
  mediaCoverage?: MediaCoverageItem[];
  
  // Stock & Social Media Props
  stockPerformanceData?: any[];
  followers?: string;
  totalPosts?: string;
  engagementRatio?: string;
  sentimentScore?: number;
  netSentimentDifference?: string;
  netSentimentTrend?: string;
}

const MergedDashboard: React.FC<DashboardProps> = ({
  // Competitive Analysis defaults
  companyName = "www.demo.com",
  annualRevenue = "$39,000,00.00",
  totalEmployees = 20,
  mediaCoverage = [
    {
      id: 1,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
    },
    {
      id: 2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
    },
    {
      id: 3,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
    }
  ],
  
  // Stock & Social Media defaults
  stockPerformanceData = stockData,
  followers = "30K",
  totalPosts = "300",
  engagementRatio = "1-3%",
  sentimentScore = 75,
  netSentimentDifference = "38% Difference between positive and negative sentiment this period",
  netSentimentTrend = "Your net sentiment score decreased by 11% compared to the previous period"
}) => {
  // Calculate the stroke dash array for the circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (sentimentScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-white p-6 rounded-lg mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column - Competitive Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Competitive Analysis</h1>
          
          {/* Company Name Input */}
          <div className="mb-6 p-4 border border-gray-200 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Revenue and Employees Row */}
          <div className=" mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Annual Revenue</div>
              <div className="text-lg font-semibold text-blue-600">{annualRevenue}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700 mb-1">Total Number Of Employees</div>
              <div className="text-lg font-semibold text-gray-900">{totalEmployees}</div>
            </div>
          </div>
          </div>

          {/* Recent Media Coverage Section */}
          <div className='p-4 border border-gray-200 rounded-md '>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Media Coverage</h2>
            
            <div className="space-y-4">
              {mediaCoverage.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-md"
                >
                  <p className="text-sm  leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stock Performance & Social Media */}
        <div className="space-y-6">
          
          {/* Stock Performance Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Stock Performance</h2>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockPerformanceData}>
                  <defs>
                    <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis hide />
                  <YAxis 
                    domain={[20, 140]}
                    ticks={[20, 40, 60, 80, 100, 120, 140]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    orientation="right"
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#colorStock)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Social Media</h2>
              
              {/* Social Media Icons */}
              <div className="flex space-x-2">
                {/* LinkedIn */}
                <div className="w-8 h-8 bg-[#22398A] rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
                {/* Instagram */}
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-600 rounded-sm"></div>
                </div>
                {/* Facebook */}
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">f</span>
                </div>
                {/* Twitter/X */}
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">X</span>
                </div>
              </div>
            </div>

            {/* Social Media Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6 ">
              {/* LinkedIn Icon */}
              <div className="flex items-center justify-between border-r-2 pr-4">
                <div className="w-8 h-8 bg-[#22398A] rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className='border-r-2 pr-4'>
                <div className="text-sm text-gray-600 mb-1">Number of Followers</div>
                <div className="text-lg font-semibold text-gray-900">{followers}</div>
              </div>
              
              <div className='border-r-2 pr-4'>
                <div className="text-sm text-gray-600 mb-1">Total Post</div>
                <div className="text-lg font-semibold text-gray-900">{totalPosts}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Engagement Ration</div>
                <div className="text-lg font-semibold text-gray-900">{engagementRatio}</div>
              </div>
            </div>

            {/* Sentiment Summary */}
            <div className='p-4 border border-gray-200 rounded-md mb-6'>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Sentiment Summary</h3>
              
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  {/* Background circle */}
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#E5E7EB"
                      strokeWidth="10"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#22398A"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{sentimentScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Social Media Sentiment Trends */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Social Media</h2>
            <h3 className="text-base font-medium text-gray-700 mb-6">Sentiment Trends</h3>
            
            <div className="space-y-4">
              {/* Net Sentiment Score */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Net Sentiment Score</h4>
                <p className="text-sm text-gray-600">{netSentimentDifference}</p>
              </div>
              
              {/* Net Sentiment Trend */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Net Sentiment Trend</h4>
                <p className="text-sm text-gray-600">{netSentimentTrend}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergedDashboard;