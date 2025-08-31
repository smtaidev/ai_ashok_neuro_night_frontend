// "use client";

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { ChevronDown } from 'lucide-react';

// const OrganizationInfo: React.FC = () => {
//   const [formData, setFormData] = useState({
//     companyName: 'Monsters, Inc.',
//     founded: 'Abc',
//     year: '2024',
//     businessType: 'See more',
//     companyDescription: 'Welcome to the.......................................'
//   });

//   const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);

//   // Mock image - replace with your actual import
//   const humanImage = "/api/placeholder/400/400";

//   const businessTypeOptions = [
//     'See more',
//     'Technology',
//     'Healthcare',
//     'Finance',
//     'Manufacturing',
//     'Retail',
//     'Education',
//     'Consulting'
//   ];

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleUpdateCompanyInfo = () => {
//     console.log('Company Info Updated:', formData);
//     // Here you would make your API call
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Top Section with Image and Text */}
//       <div className="w-full ml-3 md:h-[400px] space-y-6 bg-white p-12 mb-12 md:flex justify-between items-center rounded-lg shadow-md gap-4">
//         {/* text left side  */}
//         <div className="flex-1 space-y-4 md:text-left">
//           <p className="text-base text-[#231f20] mt-2 leading-relaxed">
//             Track and analyze key financial metrics that influence strategy
//             development and execution. This component helps you monitor revenue,
//             expenses, cash flow, and credit risks to align financials with the
//             strategic direction.
//           </p>
//         </div>
//         <div className="flex-none mr-20 w-full md:w-[400px]">
//           <Image
//             src={humanImage}
//             alt="Financial Overview Image"
//             layout="responsive"
//             width={400}
//             height={400}
//           />
//         </div>
//       </div>

//       {/* Company Information Form */}
//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <div className="space-y-6">
//           {/* Company Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Name
//             </label>
//             <input
//               type="text"
//               value={formData.companyName}
//               onChange={(e) => handleInputChange('companyName', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//             />
//           </div>

//           {/* Founded */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Founded
//             </label>
//             <input
//               type="text"
//               value={formData.founded}
//               onChange={(e) => handleInputChange('founded', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//             />
//           </div>

//           {/* Year */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Year
//             </label>
//             <input
//               type="text"
//               value={formData.year}
//               onChange={(e) => handleInputChange('year', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//             />
//           </div>

//           {/* Business type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Business type
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setIsBusinessTypeOpen(!isBusinessTypeOpen)}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <span className="text-gray-700">{formData.businessType}</span>
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               </button>

//               {isBusinessTypeOpen && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//                   {businessTypeOptions.map((option) => (
//                     <button
//                       key={option}
//                       type="button"
//                       className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
//                       onClick={() => {
//                         handleInputChange('businessType', option);
//                         setIsBusinessTypeOpen(false);
//                       }}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Company Descriptions */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Descriptions
//             </label>
//             <textarea
//               value={formData.companyDescription}
//               onChange={(e) => handleInputChange('companyDescription', e.target.value)}
//               rows={8}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
//             />
//           </div>

//           {/* Update Button */}
//           <div className="flex justify-end pt-4">
//             <button
//               onClick={handleUpdateCompanyInfo}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200 text-sm"
//             >
//               Updated Company Info
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationInfo;


// "use client"

// import {
//   useForm
// } from "react-hook-form"
// import {
//   zodResolver
// } from "@hookform/resolvers/zod"
// import {
//   z
// } from "zod"
// import {
//   cn
// } from "@/lib/utils"
// import {
//   Button
// } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Input
// } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select"
// import {
//   Textarea
// } from "@/components/ui/textarea"

// const formSchema = z.object({
//   founded: z.string().min(1).optional(),
//   year: z.string().min(1).optional(),
//   businessType: z.string().optional(),
//   companyDescriptions: z.string().optional()
// });
// import { Card, CardDescription, CardHeader } from '@/components/ui/card';
// import Image from 'next/image';
// import React from 'react';
// import { CardTitle } from '@/components/ui/card';
// import toast from "react-hot-toast"

// const OrganizationInfo = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),

//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       console.log(values);
//       toast(
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
//         </pre>
//       );
//     } catch (error) {
//       console.error("Form submission error", error);
//       toast.error("Failed to submit the form. Please try again.");
//     }
//   }
//   return (
//     <div className="dashboard-container">
//       <div className="p-6 bg-white rounded-md shadow-md border border-gray-300">
//         <Card className="border border-gray-200 rounded-md">
//           <CardHeader>
//             <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
//               <div className="flex-1 space-y-4 md:text-left">
//                 <CardTitle className="text-[#0B1C33] text-4xl">
//                   Organization Information
//                 </CardTitle>
//                 <CardDescription className="text-[#000000] mt-1 text-lg">
//                   Update your organization details
//                 </CardDescription>
//               </div>
//               <div>
//                 <Image
//                   src="/image/user-main.png"
//                   alt="dashboard icon"
//                   width={900}
//                   height={900}
//                   className="rounded-lg w-[570px] h-[316px]"
//                 />
//               </div>
//             </div>
//             <div className='h-[1px] w-full bg-gray-200' />
//             <div className="mt-4">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
//                   <FormField
//                     control={form.control}
//                     name="founded"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Founded</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Abc"

//                             type=""
//                             {...field} />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="year"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Year</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="2024"

//                             type="text"
//                             {...field} />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="businessType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Business Type</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="See More" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="m@example.com">m@example.com</SelectItem>
//                             <SelectItem value="m@google.com">m@google.com</SelectItem>
//                             <SelectItem value="m@support.com">m@support.com</SelectItem>
//                           </SelectContent>
//                         </Select>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="companyDescriptions"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Company Description</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Welcome to the....."
//                             className="resize-none"
//                             {...field}
//                           />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type="submit">Submit</Button>
//                 </form>
//               </Form>
//             </div>
//           </CardHeader>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default OrganizationInfo;


"use client"

import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Textarea
} from "@/components/ui/textarea"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import toast from "react-hot-toast"

const formSchema = z.object({
  founded: z.string().min(1).optional(),
  year: z.string().min(1).optional(),
  businessType: z.string().optional(),
  companyDescriptions: z.string().optional()
});

const OrganizationInfo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="dashboard-container">
      <div className="p-6 bg-white rounded-md shadow-md border border-gray-300">
        <Card className="border border-gray-200 rounded-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between gap-8">
              {/* Left side: Form */}
              <div className="flex-1">
                <CardTitle className="text-[#0B1C33] text-4xl mb-2">
                  Organization Information
                </CardTitle>
                <CardDescription className="text-[#000000] mb-6 text-lg">
                  Update your organization details
                </CardDescription>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
                    <FormField
                      control={form.control}
                      name="founded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Founded</FormLabel>
                          <FormControl>
                            <Input placeholder="Abc" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2024" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="See More" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">m@example.com</SelectItem>
                              <SelectItem value="m@google.com">m@google.com</SelectItem>
                              <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyDescriptions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Welcome to the....."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>

              {/* Right side: Image */}
              <div className="flex-shrink-0">
                <Image
                  src="/image/user-main.png"
                  alt="dashboard icon"
                  width={570}
                  height={316}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationInfo;


