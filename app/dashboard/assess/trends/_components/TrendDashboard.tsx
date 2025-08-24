

"use client";

import React, { useMemo, useState } from "react";
import TrendsInsightsPage from "./GetTrends";
import Link from "next/link";
import { useGetTrendsQuery } from "@/redux/api/trend/trendApi";
import { useGetAiTrendQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
import {
  X,
  TrendingUp,
  AlertTriangle,
  Target,
  Lightbulb,
  Shield,
  Zap,
  Users,
  Globe,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Brain,
  Eye,
} from "lucide-react";

interface DonutChartProps {
  high: number;
  medium: number;
  low: number;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

// AI Recommendations Drawer Component
interface AIRecommendationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isLoading: boolean;
}

const AIRecommendationsDrawer: React.FC<AIRecommendationsDrawerProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["summary"])
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  const aiData = data?.data;

  const tabs = [
    { id: "summary", label: "Executive Summary", icon: BarChart3 },
    { id: "opportunities", label: "Strategic Opportunities", icon: Target },
    { id: "warnings", label: "Early Warnings", icon: AlertTriangle },
    { id: "recommendations", label: "Analyst Insights", icon: Lightbulb },
    { id: "radar", label: "On The Radar", icon: Eye },
  ];

  const SectionHeader = ({
    title,
    icon: Icon,
    sectionKey,
  }: {
    title: string;
    icon: any;
    sectionKey: string;
  }) => (
    <div
      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
      onClick={() => toggleSection(sectionKey)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {expandedSections.has(sectionKey) ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </div>
  );

  const renderSummaryTab = () => (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">
            {aiData?.companyName || "Company Analysis"}
          </h2>
        </div>
        <p className="text-blue-100">AI-Powered Strategic Trend Analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-green-500 rounded">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-green-800">Key Opportunities</h4>
          </div>
          <p className="text-sm text-green-700 leading-relaxed">
            {aiData?.summary?.key_opportunities ||
              "No opportunities data available"}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-blue-500 rounded">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800">Core Strengths</h4>
          </div>
          <p className="text-sm text-blue-700 leading-relaxed">
            {aiData?.summary?.strengths || "No strengths data available"}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-red-500 rounded">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-red-800">Significant Risks</h4>
          </div>
          <p className="text-sm text-red-700 leading-relaxed">
            {aiData?.summary?.significant_risks || "No risks data available"}
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-orange-500 rounded">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-orange-800">Key Challenges</h4>
          </div>
          <p className="text-sm text-orange-700 leading-relaxed">
            {aiData?.summary?.challenges || "No challenges data available"}
          </p>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-indigo-900">
            Strategic Recommendations
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg border border-indigo-100">
          <p className="text-indigo-800 leading-relaxed">
            {aiData?.summary?.strategic_recommendations ||
              "No strategic recommendations available"}
          </p>
        </div>
      </div>
    </div>
  );

  const renderOpportunitiesTab = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Strategic Opportunities</h3>
        <p className="text-green-100 text-sm">
          AI-identified growth and strategic opportunities
        </p>
      </div>

      {aiData?.strategic_opportunities &&
      aiData.strategic_opportunities.length > 0 ? (
        <div className="space-y-4">
          {aiData.strategic_opportunities.map(
            (opportunity: string, index: number) => (
              <div
                key={index}
                className="bg-white border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full mt-1">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Opportunity #{index + 1}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {opportunity}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No strategic opportunities data available</p>
        </div>
      )}
    </div>
  );

  const renderWarningsTab = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Early Warning Signals</h3>
        <p className="text-red-100 text-sm">
          Critical insights requiring immediate attention
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-red-900 mb-3">Alert Summary</h4>
            <p className="text-red-800 leading-relaxed">
              {aiData?.early_warnings || "No early warnings data available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendationsTab = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Analyst Recommendations</h3>
        <p className="text-purple-100 text-sm">
          Expert strategic guidance and actionable insights
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-full">
            <Lightbulb className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-purple-900 mb-3">
              Leadership Guidance
            </h4>
            <p className="text-purple-800 leading-relaxed">
              {aiData?.analyst_recommendations ||
                "No analyst recommendations available"}
            </p>
          </div>
        </div>
      </div>

      {/* Trend Synthesis */}
      {aiData?.trend_synthesis && aiData.trend_synthesis.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Trend Synthesis
          </h4>
          {aiData.trend_synthesis.map((trend: string, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <p className="text-gray-700 leading-relaxed">{trend}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderRadarTab = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">On The Radar</h3>
        <p className="text-teal-100 text-sm">
          Emerging trends and future considerations
        </p>
      </div>

      {/* Executive Summary */}
      {aiData?.radar_executive_summary &&
        aiData.radar_executive_summary.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-500" />
              Executive Summary
            </h4>
            {aiData.radar_executive_summary.map(
              (summary: string, index: number) => (
                <div
                  key={index}
                  className="bg-teal-50 border border-teal-200 rounded-lg p-4"
                >
                  <p className="text-teal-800 leading-relaxed">{summary}</p>
                </div>
              )
            )}
          </div>
        )}

      {/* Radar Recommendations */}
      {aiData?.radar_recommendation &&
        aiData.radar_recommendation.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-500" />
              Radar Recommendations
            </h4>
            {aiData.radar_recommendation.map(
              (recommendation: string, index: number) => (
                <div
                  key={index}
                  className="bg-cyan-50 border border-cyan-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-cyan-100 rounded-full mt-1">
                      <span className="text-xs font-bold text-cyan-600">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-cyan-800 leading-relaxed flex-1">
                      {recommendation}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
    </div>
  );

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading AI recommendations...</p>
          </div>
        </div>
      );
    }

    if (!aiData) {
      return (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No AI recommendation data available</p>
        </div>
      );
    }

    switch (activeTab) {
      case "summary":
        return renderSummaryTab();
      case "opportunities":
        return renderOpportunitiesTab();
      case "warnings":
        return renderWarningsTab();
      case "recommendations":
        return renderRecommendationsTab();
      case "radar":
        return renderRadarTab();
      default:
        return renderSummaryTab();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ClarhetAI Recommendations</h2>
              <p className="text-blue-100 text-sm">
                AI-Powered Strategic Business Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

const TrendsDashboard: React.FC = () => {
  const {
    data: trendData,
    isLoading: isTrendLoading,
    error: trendError,
  } = useGetAiTrendQuery();
  console.log("trendAI Data ", trendData);

  const TopData = trendData?.data;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMoreInfoClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const { data, isLoading, isError, error } = useGetTrendsQuery();
  console.log("trenddata ", data);

  const counts = useMemo(() => {
    if (!data?.data) return { total: 0, high: 0, medium: 0, low: 0 };

    const total = data.data.reduce(
      (acc, t) => acc + (t.trendDetails?.length || 0),
      0
    );

    const high = data.data.reduce(
      (acc, t) =>
        acc +
        (t.trendDetails?.filter(
          (d: { impactLevel: string }) => d.impactLevel === "High"
        )?.length || 0),
      0
    );

    const medium = data.data.reduce(
      (acc, t) =>
        acc +
        (t.trendDetails?.filter(
          (d: { impactLevel: string }) => d.impactLevel === "Medium"
        )?.length || 0),
      0
    );

    const low = data.data.reduce(
      (acc, t) =>
        acc +
        (t.trendDetails?.filter(
          (d: { impactLevel: string }) => d.impactLevel === "Low"
        )?.length || 0),
      0
    );

    return { total, high, medium, low };
  }, [data]);

  const DonutChart: React.FC<DonutChartProps> = ({ high, medium, low }) => {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const data: ChartData[] = [
      { label: "High Impact", value: high, color: "#ef4444" },
      { label: "Medium Impact", value: medium, color: "#eab308" },
      { label: "Low Impact", value: low, color: "#16a34a" },
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const createPath = (startAngle: number, endAngle: number) => {
      const outerRadius = 36;
      const innerRadius = 24;
      const centerX = 50;
      const centerY = 50;

      const startXOuter = centerX + outerRadius * Math.cos(startAngle);
      const startYOuter = centerY + outerRadius * Math.sin(startAngle);
      const endXOuter = centerX + outerRadius * Math.cos(endAngle);
      const endYOuter = centerY + outerRadius * Math.sin(endAngle);

      const startXInner = centerX + innerRadius * Math.cos(startAngle);
      const startYInner = centerY + innerRadius * Math.sin(startAngle);
      const endXInner = centerX + innerRadius * Math.cos(endAngle);
      const endYInner = centerY + innerRadius * Math.sin(endAngle);

      const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

      return [
        `M ${startXOuter} ${startYOuter}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`,
        `L ${endXInner} ${endYInner}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`,
        "Z",
      ].join(" ");
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    let cumulativeAngle = -Math.PI / 2;

    return (
      <div className="relative">
        <svg
          className="w-72 h-72"
          viewBox="0 0 100 100"
          onMouseMove={handleMouseMove}
        >
          {data.map((segment, index) => {
            const angle = (segment.value / total) * 2 * Math.PI;
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + angle;

            const pathData = createPath(startAngle, endAngle);
            cumulativeAngle += angle;

            return (
              <path
                key={segment.label}
                d={pathData}
                fill={segment.color}
                className="cursor-pointer transition-opacity duration-200"
                style={{
                  opacity:
                    hoveredSegment && hoveredSegment !== segment.label
                      ? 0.6
                      : 1,
                }}
                onMouseEnter={() => setHoveredSegment(segment.label)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </svg>

        {hoveredSegment && (
          <div
            className="fixed z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none text-sm"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 40,
            }}
          >
            {hoveredSegment}:{" "}
            {data.find((d) => d.label === hoveredSegment)?.value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white rounded-lg shadow-md my-8 p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Trends Impact Summary
          </h1>
          <div className=" flex">
            <Link href="/dashboard/update-trend">
              <button className="bg-[#22398A] text-white px-4 py-2 mr-4 rounded-lg cursor-pointer hover:bg-[#1D2A6D]">
                Edit Trend
              </button>
            </Link>
            <button
              onClick={handleMoreInfoClick}
              className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              ClarhetAI Recommendations
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Trends</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-bold">
                  Total Identified Trends:
                </span>
                <span className="font-bold text-xl text-gray-900">
                  {counts.total}
                </span>
              </div>
              <div className="flex justify-between mt-12 items-center">
                <span className="text-gray-700">High Impact:</span>
                <span className="font-semibold text-gray-900">
                  {counts.high}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Medium Impact:</span>
                <span className="font-semibold text-gray-900">
                  {counts.medium}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Low Impact:</span>
                <span className="font-semibold text-gray-900">
                  {counts.low}
                </span>
              </div>
            </div>
          </div>

          {/* Trends Impact Snapshot Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Trends Impact Snapshot
            </h2>
            <div className="flex flex-col items-center">
              <div className="relative w-56 h-56 mb-6">
                <DonutChart
                  high={counts.high}
                  medium={counts.medium}
                  low={counts.low}
                />
              </div>
              <div className="space-y-2 w-full">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    High Impact : {counts.high}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Medium Impact : {counts.medium}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Low Impact : {counts.low}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Trends Card */}
          <div className="bg-white rounded-xl space-y-3 border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Top Trends (High and Medium Impact)
            </h2>
            {TopData?.trend_synthesis.map((trend: string, index: number) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <p className="text-gray-700  leading-relaxed">{trend}</p>
              </div>
            ))}
          </div>

          {/* On The Radar Trends Card */}
          <div className="bg-white space-y-3 rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              On The Radar Trends
            </h2>
            {TopData?.radar_recommendation.map(
              (trend: string, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <p className="text-gray-700  leading-relaxed">{trend}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <TrendsInsightsPage />

      <div className="flex justify-end mr-8 mb-8">
        <Link href="/dashboard/create-trend">
          <button className="bg-[#22398A] text-white px-4 py-2 items-end rounded-lg cursor-pointer hover:bg-[#1D2A6D]">
            Add Trend
          </button>
        </Link>
      </div>

      {/* AI Recommendations Drawer */}
      <AIRecommendationsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        data={trendData}
        isLoading={isTrendLoading}
      />
    </div>
  );
};

export default TrendsDashboard;
