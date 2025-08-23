// "use client";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import React, { useState, useEffect } from "react";

// type Analysis = {
//   company: {
//     name: string;
//     industry?: string;
//     employeeRange?: string;
//     hqLocation?: string;
//   };
//   keyTakeaways: string[];
//   strengths?: string[];
//   risks?: string[];
//   opportunities?: string[];
//   signals?: string[];
//   metricsSummary: {
//     newsCount: number;
//     stock?: {
//       symbol: string;
//       price: number;
//       marketCap?: number;
//       ytdChangePct?: number;
//       currency?: string;
//     };
//     social?: {
//       linkedin?: { followers: number };
//       x?: { followers: number };
//       instagram?: { followers: number };
//     };
//   };
//   narrativeSummary: string;
// };

// // ---- Hardcoded Data ----
// const hardcodedData: Analysis = {
//   company: {
//     name: "Acme Inc",
//     industry: "Technology",
//     employeeRange: "500-1000",
//     hqLocation: "New York, USA",
//   },
//   keyTakeaways: [
//     "Revenue growth 20% YoY",
//     "Expanding into Asia",
//     "Strong R&D pipeline",
//   ],
//   strengths: ["Brand recognition", "Innovative products"],
//   risks: ["Market saturation", "Rising competition"],
//   opportunities: ["New emerging markets", "AI-driven products"],
//   signals: ["Hiring surge in engineering", "Increased patent filings"],
//   metricsSummary: {
//     newsCount: 12,
//     stock: {
//       symbol: "ACME",
//       price: 123.45,
//       marketCap: 5000000000,
//       ytdChangePct: 12.5,
//       currency: "USD",
//     },
//     social: {
//       linkedin: { followers: 200000 },
//       x: { followers: 150000 },
//       instagram: { followers: 80000 },
//     },
//   },
//   narrativeSummary:
//     "Acme Inc has shown consistent growth in the technology sector, with a strong presence in both domestic and international markets. Recent moves indicate a strategic focus on AI and emerging markets.",
// };

// export default function CompetitorSummary() {
//   const [data, setData] = useState<Analysis | null>(null);

//   useEffect(() => {
//     // Instead of fetching, set hardcoded data
//     setData(hardcodedData);
//   }, []);

//   if (!data) {
//     return <div className="p-6 rounded-2xl shadow-sm border">Loading…</div>;
//   }

//   const socialBars = [
//     { name: "LinkedIn", value: data.metricsSummary.social?.linkedin?.followers ?? 0 },
//     { name: "X", value: data.metricsSummary.social?.x?.followers ?? 0 },
//     { name: "Instagram", value: data.metricsSummary.social?.instagram?.followers ?? 0 },
//   ];

//   return (
//     <div className="space-y-6 p-6 rounded-2xl shadow-sm border bg-white">
//       <header className="space-y-1">
//         <h1 className="text-2xl font-semibold">{data.company.name}</h1>
//         <p className="text-sm text-gray-600">
//           {data.company.industry ?? "—"} • {data.company.employeeRange ?? "—"} •{" "}
//           {data.company.hqLocation ?? "—"}
//         </p>
//       </header>

//       <section className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-xl border p-4">
//           <h2 className="font-medium mb-2">Key Takeaways</h2>
//           <ul className="list-disc ml-5 space-y-1">
//             {data.keyTakeaways.map((t, i) => (
//               <li key={i}>{t}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-xl border p-4">
//           <h2 className="font-medium mb-2">Signals</h2>
//           <ul className="list-disc ml-5 space-y-1">
//             {(data.signals ?? []).map((t, i) => (
//               <li key={i}>{t}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-xl border p-4">
//           <h2 className="font-medium mb-2">Stock</h2>
//           {data.metricsSummary.stock ? (
//             <div className="text-sm">
//               <div>Symbol: {data.metricsSummary.stock.symbol}</div>
//               <div>
//                 Price: {data.metricsSummary.stock.price}{" "}
//                 {data.metricsSummary.stock.currency}
//               </div>
//               {data.metricsSummary.stock.marketCap && (
//                 <div>
//                   Market Cap:{" "}
//                   {Intl.NumberFormat().format(data.metricsSummary.stock.marketCap)}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-sm text-gray-500">N/A</div>
//           )}
//         </div>
//       </section>

//       <section className="rounded-xl border p-4">
//         <h2 className="font-medium mb-4">Social Reach</h2>
//         <div style={{ width: "100%", height: 240 }}>
//           <ResponsiveContainer>
//             <BarChart data={socialBars}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       <section className="rounded-xl border p-4">
//         <h2 className="font-medium mb-2">Narrative Summary</h2>
//         <p className="text-gray-800">{data.narrativeSummary}</p>
//       </section>

//       <section className="grid md:grid-cols-3 gap-4">
//         <CardList title="Strengths" items={data.strengths} />
//         <CardList title="Risks" items={data.risks} />
//         <CardList title="Opportunities" items={data.opportunities} />
//       </section>
//     </div>
//   );
// }

// function CardList({ title, items }: { title: string; items?: string[] }) {
//   if (!items?.length) {
//     return (
//       <div className="rounded-xl border p-4">
//         <h2 className="font-medium mb-2">{title}</h2>
//         <div className="text-sm text-gray-500">N/A</div>
//       </div>
//     );
//   }
//   return (
//     <div className="rounded-xl border p-4">
//       <h2 className="font-medium mb-2">{title}</h2>
//       <ul className="list-disc ml-5 space-y-1">
//         {items.map((t, i) => (
//           <li key={i}>{t}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
