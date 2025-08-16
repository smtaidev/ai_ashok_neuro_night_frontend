// 'use client';

// import React, { useState } from 'react';
// import { Edit3, Save, X, ChevronUp, ChevronDown } from 'lucide-react';

// // Types for our data structures
// interface TrendQuestion {
//   id: string;
//   question: string;
//   impact: string;
//   answer: string;
// }

// interface TrendCategory {
//   id: string;
//   title: string;
//   icon: string;
//   isExpanded: boolean;
//   questions: TrendQuestion[];
// }

// interface EditState {
//   categoryId: string;
//   questionId: string;
//   field: 'impact' | 'answer';
//   value: string;
// }

// const TrendsInsightsPage = () => {
//   const [editingStates, setEditingStates] = useState<EditState[]>([]);

//   // Data structure with exactly 3 questions per category
//   const [trendsData, setTrendsData] = useState<TrendCategory[]>([
//     {
//       id: '1',
//       title: 'Customer Insights',
//       icon: '👥',
//       isExpanded: true,
//       questions: [
//         {
//           id: '1-1',
//           question: 'What are the evolving needs and preferences of our target customers?',
//           impact: 'High',
//           answer: ' this is customer insights'
//         },
//         {
//           id: '1-2',
//           question: 'How is customer behavior changing, and what factors are influencing these changes?',
//           impact: 'Medium',
//           answer: ''
//         },
//         {
//           id: '1-3',
//           question: 'Are there any unmet needs or pain points that we should address?',
//           impact: 'High',
//           answer: ''
//         }
//       ]
//     },
//     {
//       id: '2',
//       title: 'Technological Advances',
//       icon: '🚀',
//       isExpanded: false,
//       questions: [
//         {
//           id: '2-1',
//           question: 'What emerging technologies could impact our industry?',
//           impact: 'High',
//           answer: ''
//         },
//         {
//           id: '2-2',
//           question: 'How can we leverage new technologies to improve our operations?',
//           impact: 'High',
//           answer: ''
//         },
//         {
//           id: '2-3',
//           question: 'What are the potential risks of adopting new technologies?',
//           impact: 'Medium',
//           answer: ''
//         }
//       ]
//     },
//     {
//       id: '3',
//       title: 'Regulatory and Legal Factors',
//       icon: '⚖️',
//       isExpanded: false,
//       questions: [
//         {
//           id: '3-1',
//           question: 'What regulatory changes are on the horizon?',
//           impact: 'Medium',
//           answer: ''
//         },
//         {
//           id: '3-2',
//           question: 'How might new compliance requirements affect our operations?',
//           impact: 'High',
//           answer: ''
//         },
//         {
//           id: '3-3',
//           question: 'What legal risks should we be monitoring?',
//           impact: 'Low',
//           answer: ''
//         }
//       ]
//     },
//     {
//       id: '4',
//       title: 'Economic Conditions',
//       icon: '📈',
//       isExpanded: false,
//       questions: [
//         {
//           id: '4-1',
//           question: 'How might economic trends affect our business?',
//           impact: 'High',
//           answer: ''
//         },
//         {
//           id: '4-2',
//           question: 'What are the implications of current inflation rates?',
//           impact: 'Medium',
//           answer: ''
//         },
//         {
//           id: '4-3',
//           question: 'How should we prepare for potential economic downturns?',
//           impact: 'High',
//           answer: ''
//         }
//       ]
//     },
//     {
//       id: '5',
//       title: 'Supply Chain and Logistics',
//       icon: '🚛',
//       isExpanded: false,
//       questions: [
//         {
//           id: '5-1',
//           question: 'What supply chain disruptions should we prepare for?',
//           impact: 'High',
//           answer: ''
//         },
//         {
//           id: '5-2',
//           question: 'How can we improve our logistics efficiency?',
//           impact: 'Medium',
//           answer: ''
//         },
//         {
//           id: '5-3',
//           question: 'What alternative suppliers should we consider?',
//           impact: 'Medium',
//           answer: ''
//         }
//       ]
//     }
//   ]);

//   // Toggle expansion of trend sections
//   const toggleTrend = (categoryId: string) => {
//     setTrendsData(prev => prev.map(trend => 
//       trend.id === categoryId 
//         ? { ...trend, isExpanded: !trend.isExpanded }
//         : trend
//     ));
//   };

//   // Start editing a field
//   const startEditing = (categoryId: string, questionId: string, field: 'impact' | 'answer', currentValue: string) => {
//     setEditingStates(prev => [
//       ...prev.filter(state => !(state.categoryId === categoryId && state.questionId === questionId && state.field === field)),
//       { categoryId, questionId, field, value: currentValue }
//     ]);
//   };

//   // Update editing value
//   const updateEditingValue = (categoryId: string, questionId: string, field: 'impact' | 'answer', value: string) => {
//     setEditingStates(prev => prev.map(state => 
//       state.categoryId === categoryId && state.questionId === questionId && state.field === field
//         ? { ...state, value }
//         : state
//     ));
//   };

//   // Save edited value
//   const saveEdit = (categoryId: string, questionId: string, field: 'impact' | 'answer') => {
//     const editState = editingStates.find(state => 
//       state.categoryId === categoryId && state.questionId === questionId && state.field === field
//     );
    
//     if (editState) {
//       setTrendsData(prev => prev.map(category => 
//         category.id === categoryId 
//           ? {
//               ...category,
//               questions: category.questions.map(q => 
//                 q.id === questionId 
//                   ? { ...q, [field]: editState.value }
//                   : q
//               )
//             }
//           : category
//       ));
      
//       // Remove from editing states
//       setEditingStates(prev => prev.filter(state => 
//         !(state.categoryId === categoryId && state.questionId === questionId && state.field === field)
//       ));
//     }
//   };

//   // Cancel editing
//   const cancelEdit = (categoryId: string, questionId: string, field: 'impact' | 'answer') => {
//     setEditingStates(prev => prev.filter(state => 
//       !(state.categoryId === categoryId && state.questionId === questionId && state.field === field)
//     ));
//   };

//   // Check if field is being edited
//   const isEditing = (categoryId: string, questionId: string, field: 'impact' | 'answer') => {
//     return editingStates.some(state => 
//       state.categoryId === categoryId && state.questionId === questionId && state.field === field
//     );
//   };

//   // Get editing value
//   const getEditingValue = (categoryId: string, questionId: string, field: 'impact' | 'answer') => {
//     const editState = editingStates.find(state => 
//       state.categoryId === categoryId && state.questionId === questionId && state.field === field
//     );
//     return editState?.value || '';
//   };

//   return (
//     <div className="min-h-screen bg-white my-8 p-6">
//       <div className="">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Trends & Insights</h1>
//           <p className="text-gray-600">
//             Analyze emerging trends and their potential impact on your business strategy
//           </p>
//         </div>

//         {/* Trends List */}
//         <div className="space-y-4">
//           {trendsData.map((category) => (
//             <div key={category.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
//               {/* Category Header */}
//               <div 
//                 className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
//                 onClick={() => toggleTrend(category.id)}
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="text-xl">{category.icon}</span>
//                   <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
//                 </div>
//                 {category.isExpanded ? (
//                   <ChevronUp className="w-5 h-5 text-gray-400" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-400" />
//                 )}
//               </div>

//               {/* Expanded Content - Question Cards */}
//               {category.isExpanded && (
//                 <div className="p-4 space-y-4">
//                   {category.questions.map((question) => (
//                     <div key={question.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                       {/* Question Header */}
//                       <div className="md:flex items-start justify-between mb-4">
//                         <h4 className="text-base font-medium text-gray-900 flex-1 pr-4">
//                           {question.question}
//                         </h4>
//                         <div className="flex items-center gap-4 flex-shrink-0">
//                           {/* Impact Radio Buttons */}
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600 font-medium">Impact</span>
//                             {!isEditing(category.id, question.id, 'impact') ? (
//                               <div className="flex items-center gap-3">
//                                 <label className="flex items-center gap-1">
//                                   <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
//                                     question.impact === 'High' 
//                                       ? 'border-green-500 bg-green-500' 
//                                       : 'border-gray-300'
//                                   }`}>
//                                     {question.impact === 'High' && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                                   </div>
//                                   <span className="text-sm text-gray-700">High</span>
//                                 </label>
//                                 <label className="flex items-center gap-1">
//                                   <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
//                                     question.impact === 'Medium' 
//                                       ? 'border-yellow-500 bg-yellow-500' 
//                                       : 'border-gray-300'
//                                   }`}>
//                                     {question.impact === 'Medium' && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                                   </div>
//                                   <span className="text-sm text-gray-700">Medium</span>
//                                 </label>
//                                 <label className="flex items-center gap-1">
//                                   <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
//                                     question.impact === 'Low' 
//                                       ? 'border-red-500 bg-red-500' 
//                                       : 'border-gray-300'
//                                   }`}>
//                                     {question.impact === 'Low' && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                                   </div>
//                                   <span className="text-sm text-gray-700">Low</span>
//                                 </label>
//                               </div>
//                             ) : (
//                               <div className="flex items-center gap-2">
//                                 <select
//                                   value={getEditingValue(category.id, question.id, 'impact')}
//                                   onChange={(e) => updateEditingValue(category.id, question.id, 'impact', e.target.value)}
//                                   className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 >
//                                   <option value="High">High</option>
//                                   <option value="Medium">Medium</option>
//                                   <option value="Low">Low</option>
//                                 </select>
//                                 <button
//                                   onClick={() => saveEdit(category.id, question.id, 'impact')}
//                                   className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//                                 >
//                                   <Save className="w-3 h-3" />
//                                 </button>
//                                 <button
//                                   onClick={() => cancelEdit(category.id, question.id, 'impact')}
//                                   className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//                                 >
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Edit Button */}
//                           <button
//                             onClick={() => startEditing(category.id, question.id, 'impact', question.impact)}
//                             className="p-2 hover:bg-gray-200 rounded transition-colors"
//                           >
//                             <Edit3 className="w-4 h-4 text-gray-400" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Answer Section */}
//                       <div className="border-t border-gray-200 pt-4">
//                         {isEditing(category.id, question.id, 'answer') ? (
//                           <div className="space-y-3">
//                             <textarea
//                               value={getEditingValue(category.id, question.id, 'answer')}
//                               onChange={(e) => updateEditingValue(category.id, question.id, 'answer', e.target.value)}
//                               rows={4}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
//                               placeholder="Enter your answer..."
//                             />
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => saveEdit(category.id, question.id, 'answer')}
//                                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
//                               >
//                                 <Save className="w-4 h-4" />
//                                 Update
//                               </button>
//                               <button
//                                 onClick={() => cancelEdit(category.id, question.id, 'answer')}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
//                               >
//                                 <X className="w-4 h-4" />
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div 
//                             className="min-h-[80px] p-3 bg-white border border-gray-200 rounded cursor-text text-sm text-gray-600 hover:bg-gray-50 transition-colors"
//                             onClick={() => startEditing(category.id, question.id, 'answer', question.answer)}
//                           >
//                             {question.answer || 'Click to add your answer...'}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Action Button */}
//         <div className="mt-8 flex justify-end">
//           <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//             Save All Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendsInsightsPage;





// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ChevronUp, ChevronDown } from 'lucide-react';
// import { useGetTrendsQuery } from '@/redux/api/trend/trendApi';

// // Types for our data structures
// interface TrendQuestion {
//   id: string;
//   question: string;
//   impact: string;
//   answer: string;
// }

// interface TrendCategory {
//   id: string;
//   title: string;
//   icon: string;
//   isExpanded: boolean;
//   questions: TrendQuestion[];
// }

// const TrendsInsightsPage = () => {
//   const [trendsData, setTrendsData] = useState<TrendCategory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { data, isLoading, isError } = useGetTrendsQuery();
//   console.log( "trenddata", data);

//   // Fetch trends data from API
//   useEffect(() => {
//     const fetchTrendsData = async () => {
//       try {
//         setLoading(true);
//         // Replace this URL with your actual API endpoint
//         const response = await fetch('/api/trends'); // Adjust the endpoint as needed
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch trends data');
//         }
        
//         const data = await response.json();
//         setTrendsData(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//         console.error('Error fetching trends data:', err);
        
//         // Fallback to default data if API fails
//         setTrendsData([
//           {
//             id: '1',
//             title: 'Customer Insights',
//             icon: '👥',
//             isExpanded: true,
//             questions: [
//               {
//                 id: '1-1',
//                 question: 'What are the evolving needs and preferences of our target customers?',
//                 impact: 'High',
//                 answer: 'This is customer insights'
//               },
//               {
//                 id: '1-2',
//                 question: 'How is customer behavior changing, and what factors are influencing these changes?',
//                 impact: 'Low',
//                 answer: 'sdf'
//               },
//               {
//                 id: '1-3',
//                 question: 'Are there any unmet needs or pain points that we should address?',
//                 impact: 'Medium',
//                 answer: 'dsfsdf'
//               }
//             ]
//           },
//           {
//             id: '2',
//             title: 'Technological Advances',
//             icon: '🚀',
//             isExpanded: false,
//             questions: [
//               {
//                 id: '2-1',
//                 question: 'What emerging technologies could impact our industry?',
//                 impact: '',
//                 answer: ''
//               },
//               {
//                 id: '2-2',
//                 question: 'How can we leverage new technologies to improve our operations?',
//                 impact: '',
//                 answer: ''
//               },
//               {
//                 id: '2-3',
//                 question: 'What are the potential risks of adopting new technologies?',
//                 impact: '',
//                 answer: ''
//               }
//             ]
//           },
//           {
//             id: '3',
//             title: 'Regulatory and Legal Factors',
//             icon: '⚖️',
//             isExpanded: false,
//             questions: [
//               {
//                 id: '3-1',
//                 question: 'What regulatory changes are on the horizon?',
//                 impact: 'Medium',
//                 answer: ''
//               },
//               {
//                 id: '3-2',
//                 question: 'How might new compliance requirements affect our operations?',
//                 impact: 'High',
//                 answer: ''
//               },
//               {
//                 id: '3-3',
//                 question: 'What legal risks should we be monitoring?',
//                 impact: 'Low',
//                 answer: ''
//               }
//             ]
//           },
//           {
//             id: '4',
//             title: 'Economic Conditions',
//             icon: '📈',
//             isExpanded: false,
//             questions: [
//               {
//                 id: '4-1',
//                 question: 'How might economic trends affect our business?',
//                 impact: 'High',
//                 answer: ''
//               },
//               {
//                 id: '4-2',
//                 question: 'What are the implications of current inflation rates?',
//                 impact: 'Medium',
//                 answer: ''
//               },
//               {
//                 id: '4-3',
//                 question: 'How should we prepare for potential economic downturns?',
//                 impact: 'High',
//                 answer: ''
//               }
//             ]
//           },
//           {
//             id: '5',
//             title: 'Supply Chain and Logistics',
//             icon: '🚛',
//             isExpanded: false,
//             questions: [
//               {
//                 id: '5-1',
//                 question: 'What supply chain disruptions should we prepare for?',
//                 impact: 'High',
//                 answer: ''
//               },
//               {
//                 id: '5-2',
//                 question: 'How can we improve our logistics efficiency?',
//                 impact: 'Medium',
//                 answer: ''
//               },
//               {
//                 id: '5-3',
//                 question: 'What alternative suppliers should we consider?',
//                 impact: 'Medium',
//                 answer: ''
//               }
//             ]
//           }
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrendsData();
//   }, []);

//   // Toggle expansion of trend sections
//   const toggleTrend = (categoryId: string) => {
//     setTrendsData(prev => prev.map(trend => 
//       trend.id === categoryId 
//         ? { ...trend, isExpanded: !trend.isExpanded }
//         : trend
//     ));
//   };

//   // Get impact color based on value
//   const getImpactColor = (impact: string) => {
//     switch (impact) {
//       case 'High':
//         return 'border-green-500 bg-green-500';
//       case 'Medium':
//         return 'border-yellow-500 bg-yellow-500';
//       case 'Low':
//         return 'border-red-500 bg-red-500';
//       default:
//         return 'border-gray-300 bg-gray-300';
//     }
//   };

//   // Get impact display text
//   const getImpactDisplay = (impact: string) => {
//     return impact || 'Not Set';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white my-8 p-6">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white my-8 p-6">
//       <div className="">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Trends & Insights</h1>
//           <p className="text-gray-600">
//             Analyze emerging trends and their potential impact on your business strategy
//           </p>
//           {error && (
//             <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
//               Warning: {error}. Showing default data.
//             </div>
//           )}
//         </div>

//         {/* Trends List */}
//         <div className="space-y-4">
//           {trendsData.map((category) => (
//             <div key={category.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
//               {/* Category Header */}
//               <div 
//                 className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
//                 onClick={() => toggleTrend(category.id)}
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="text-xl">{category.icon}</span>
//                   <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
//                 </div>
//                 {category.isExpanded ? (
//                   <ChevronUp className="w-5 h-5 text-gray-400" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-400" />
//                 )}
//               </div>

//               {/* Expanded Content - Question Cards */}
//               {category.isExpanded && (
//                 <div className="p-4 space-y-4">
//                   {category.questions.map((question) => (
//                     <div key={question.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                       {/* Question Header */}
//                       <div className="md:flex items-start justify-between mb-4">
//                         <h4 className="text-base font-medium text-gray-900 flex-1 pr-4">
//                           {question.question}
//                         </h4>
//                         <div className="flex items-center gap-4 flex-shrink-0">
//                           {/* Impact Display */}
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600 font-medium">Impact:</span>
//                             <div className="flex items-center gap-2">
//                               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${getImpactColor(question.impact)}`}>
//                                 {question.impact && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                               </div>
//                               <span className={`text-sm font-medium ${question.impact ? 'text-gray-700' : 'text-gray-400 italic'}`}>
//                                 {getImpactDisplay(question.impact)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Answer Section */}
//                       <div className="border-t border-gray-200 pt-4">
//                         <div className="min-h-[80px] p-3 bg-white border border-gray-200 rounded text-sm text-gray-600">
//                           {question.answer || 'No answer provided yet.'}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default TrendsInsightsPage;





'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useGetTrendsQuery } from '@/redux/api/trend/trendApi';

// Types for our data structures
interface TrendQuestion {
  _id: string;
  question: string;
  answer: string;
  impactLevel: string;
}

interface TrendCategory {
  _id: string;
  trendName: string;
  icon: string;
  isExpanded: boolean;
  trendDetails: TrendQuestion[];
}

const TrendsInsightsPage = () => {
  const [trendsData, setTrendsData] = useState<TrendCategory[]>([]);

  const { data, isLoading, isError, error } = useGetTrendsQuery();
  console.log("trenddata", data);

  // Icon mapping for different trend categories
  const getIconForTrend = (trendName: string): string => {
    const iconMap: { [key: string]: string } = {
      'Customer Insights': '👥',
      'Competitor Landscape': '🏆',
      'Economic Considerations': '💰',
      'Technological Advances': '🚀',
      'Regulatory and Legal Factors': '⚖️',
      'Supply Chain and Logistics': '🚛',
      'Global Market Trends': '🌍',
      'Environmental and Social Impact': '🌱',
      'Collaboration and Partnerships': '🤝',
      'Scenarios and Risk Assessment': '⚠️',
      'Emerging Markets and Opportunities': '💡',
      'On The Radar': '📡',
    };
    return iconMap[trendName] || '📊';
  };

  // Process API data and set initial state
    useEffect(() => {
    if (data?.data) {
      const processedData = data.data.map((trend: any, index: number) => ({
        _id: trend._id,
        trendName: trend.trendName,
        icon: getIconForTrend(trend.trendName),
        isExpanded: index === 0, // Only expand first item by default
        trendDetails: trend.trendDetails || []
      }));
      setTrendsData(processedData);
    }
  }, [data]);

  // Toggle expansion of trend sections
  const toggleTrend = (categoryId: string) => {
    setTrendsData(prev => prev.map(trend => 
      trend._id === categoryId 
        ? { ...trend, isExpanded: !trend.isExpanded }
        : trend
    ));
  };

  // Get impact color based on value
  const getImpactColor = (impact: string) => {
    switch (impact?.toLowerCase()) {
      case 'high':
        return 'border-green-500 bg-green-500';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500';
      case 'low':
        return 'border-red-500 bg-red-500';
      default:
        return 'border-gray-300 bg-gray-300';
    }
  };

  // Get impact display text
  const getImpactDisplay = (impact: string) => {
    return impact || 'Not Set';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white my-8 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white my-8 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trends & Insights</h1>
        </div>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600">
            {
              typeof error === 'object' && error !== null
              ? ('message' in error
                  ? (error as { message?: string }).message
                  : 'data' in error && typeof error.data === 'string'
                    ? error.data
                    : 'Failed to load trends data. Please try again later.')
              : 'Failed to load trends data. Please try again later.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white my-8 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trends & Insights</h1>
          <p className="text-gray-600">
            Analyze emerging trends and their potential impact on your business strategy
          </p>
        </div>

        {/* Trends List */}
        {trendsData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Trends Available</h3>
            <p className="text-gray-500">No trend data is currently available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trendsData.map((category) => (
              <div key={category._id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Category Header */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  onClick={() => toggleTrend(category._id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{category.trendName}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.trendDetails.length} questions
                    </span>
                  </div>
                  {category.isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {/* Expanded Content - Question Cards */}
                {category.isExpanded && (
                  <div className="p-4 space-y-4">
                    {category.trendDetails.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No questions available for this trend category.
                      </div>
                    ) : (
                      category.trendDetails.map((question) => (
                        <div key={question._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          {/* Question Header */}
                          <div className="md:flex items-start justify-between mb-4">
                            <h4 className="text-base font-medium text-gray-900 flex-1 pr-4">
                              {question.question}
                            </h4>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              {/* Impact Display */}
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">Impact:</span>
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${getImpactColor(question.impactLevel)}`}>
                                    {question.impactLevel && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                  </div>
                                  <span className={`text-sm font-medium capitalize ${question.impactLevel ? 'text-gray-700' : 'text-gray-400 italic'}`}>
                                    {getImpactDisplay(question.impactLevel)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Answer Section */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="min-h-[80px] p-3 bg-white border border-gray-200 rounded text-sm text-gray-600">
                              {question.answer || 'No answer provided yet.'}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendsInsightsPage;