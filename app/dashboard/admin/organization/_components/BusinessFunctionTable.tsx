// "use client";

// import { Card, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreVertical, Pencil, Search, Trash2 } from "lucide-react";
// import React, { useState } from "react";
// import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

// interface BusinessFunction {
//   id: number;
//   name: string;
//   budget: string;
// }

// const businessFunctions: BusinessFunction[] = [
//   { id: 1, name: "Finance", budget: "15,000.000" },
//   { id: 2, name: "Operations", budget: "25,000.000" },
//   { id: 3, name: "Human Resources", budget: "10,500.000" },
//   { id: 4, name: "IT", budget: "15,000.000" },
//   { id: 5, name: "Marketing", budget: "25,000.000" },
//   { id: 6, name: "Innovation", budget: "10,500.000" },
// ];

// const BusinessFunctionSection = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="px-6">
//       <div className="p-6 bg-white rounded-md shadow-md border border-[#DAE3F8]">
//         <Card className="border border-[#DAE3F8] rounded-md">
//           <CardHeader>
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//               <div className="relative w-full md:w-1/3">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                 <Input
//                   type="text"
//                   placeholder="Search by name"
//                   className="pl-10 rounded-md h-12 border border-[#DAE3F8]"
//                 />
//               </div>

//               <div className="flex items-center gap-3">
//                 <Button className="bg-[#142C8E] hover:bg-[#0e216e] text-white rounded-md px-6 h-12">
//                   Add a new Business Function
//                 </Button>
//                 <select className="border border-[#DAE3F8] rounded-md px-3 py-3 text-[#6A6A6A] focus:outline-none">
//                   <option>Executive Leadership Team</option>
//                   <option>Finance</option>
//                   <option>Operations</option>
//                 </select>
//               </div>
//             </div>

//             {/* Dynamic Business Function Cards */}
//             <div className="space-y-4">
//               {businessFunctions.map((func) => (
//                 <div
//                   key={func.id}
//                   className="grid grid-cols-3 items-center p-4 border border-[#DAE3F8] rounded-md hover:shadow-sm"
//                 >
//                   {/* Left: Name */}
//                   <span className="text-[#6A6A6A] font-normal text-base">{func.name}</span>

//                   {/* Middle: Budget */}
//                   <span className="justify-self-center bg-[#DAE3F8] text-[#030303] px-4 py-3 rounded-md text-sm font-normal border border-[#DAE3F8]">
//                     Budget: {func.budget}
//                   </span>

//                   {/* Right: Dropdown Menu */}
//                   <div className="justify-self-end ">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger>
//                         <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="w-32">
//                         <DropdownMenuItem>
//                           <Pencil className="w-4 h-4 mr-2" /> Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Trash2 className="w-4 h-4 mr-2" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardHeader>
//         </Card>
//       </div>

//       {/* ! Modal For Add Function */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="p-0 border-0 w-11/12 max-w-4xl">
//           <div className="bg-white rounded-xl shadow-lg relative">
//             <div className="bg-[#1E3A8A] text-white p-4 -mt-1 rounded-t-xl">
//               <DialogTitle className="text-xl font-bold">
//                 Add Business Function
//               </DialogTitle>
//             </div>

//             <div className="px-4 py-6 mb-4 h-60">
//               <Textarea
//                 id="description"
//                 value={editedContent}
//                 onChange={(e) => setEditedContent(e.target.value)}
//                 placeholder={`Enter ${activeSection?.title} description...`}
//                 className="w-full h-full resize-none text-[#231F20] text-lg!"
//               />
//             </div>

//             <div className="flex justify-end p-4 gap-4">
//               <DialogClose asChild>
//                 <Button
//                   variant="link"
//                   onClick={handleMoreInfoClick}
//                   className="text-[#22398A]"
//                 >
//                   More Info
//                 </Button>
//               </DialogClose>
//               <Button
//                 onClick={handleSave}
//                 disabled={isLoading}
//                 className="bg-[#22398A] hover:bg-[#22398A]/90 text-white"
//               >
//                 {isLoading ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BusinessFunctionSection;


"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface BusinessFunction {
  id: number;
  name: string;
  budget: string;
}

const businessFunctions: BusinessFunction[] = [
  { id: 1, name: "Finance", budget: "15,000.000" },
  { id: 2, name: "Operations", budget: "25,000.000" },
  { id: 3, name: "Human Resources", budget: "10,500.000" },
  { id: 4, name: "IT", budget: "15,000.000" },
  { id: 5, name: "Marketing", budget: "25,000.000" },
  { id: 6, name: "Innovation", budget: "10,500.000" },
];

const BusinessFunctionSection = () => {
  const [open, setOpen] = useState(false);

  // form states
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [budget, setBudget] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);

    const formData = {
      name,
      owner,
      budget: Number(budget),
    };

    console.log("Business Function Data:", formData);

    // reset loading + close modal
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);

      // reset form values
      setName("");
      setOwner("");
      setBudget("");
    }, 1000);
  };

  return (
    <div className="px-6">
      <div className="p-6 bg-white rounded-md shadow-md border border-[#DAE3F8]">
        <Card className="border border-[#DAE3F8] rounded-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search by name"
                  className="pl-10 rounded-md h-12 border border-[#DAE3F8]"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Open modal on button click */}
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-[#142C8E] hover:bg-[#0e216e] text-white rounded-md px-6 h-12"
                >
                  Add a new Business Function
                </Button>
                <select className="border border-[#DAE3F8] rounded-md px-3 py-3 text-[#6A6A6A] focus:outline-none">
                  <option>Executive Leadership Team</option>
                  <option>Finance</option>
                  <option>Operations</option>
                </select>
              </div>
            </div>

            {/* Dynamic Business Function Cards */}
            <div className="space-y-4">
              {businessFunctions.map((func) => (
                <div
                  key={func.id}
                  className="grid grid-cols-3 items-center p-4 border border-[#DAE3F8] rounded-md hover:shadow-sm"
                >
                  {/* Left: Name */}
                  <span className="text-[#6A6A6A] font-normal text-base">{func.name}</span>

                  {/* Middle: Budget */}
                  <span className="justify-self-center bg-[#DAE3F8] text-[#030303] px-4 py-3 rounded-md text-sm font-normal border border-[#DAE3F8]">
                    Budget: {func.budget}
                  </span>

                  {/* Right: Dropdown Menu */}
                  <div className="justify-self-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Modal For Add Function */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-0 w-11/12 max-w-6xl!">
          <div className="bg-white rounded-xl shadow-lg relative">
            {/* Modal Header */}
            <div className="bg-[#1E3A8A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl text-left font-bold">
                Add Business Function
              </DialogTitle>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter business function name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#DAE3F8]"
                />
              </div>

              {/* Owner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner
                </label>
                <Input
                  type="text"
                  placeholder="Enter owner name"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full border border-[#DAE3F8]"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget
                </label>
                <Input
                  type="number"
                  placeholder="Enter budget amount"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full border border-[#DAE3F8]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 gap-4">
              <DialogClose asChild>
                <Button variant="outline" className="text-gray-700">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-[#22398A] hover:bg-[#22398A]/90 text-white"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessFunctionSection;

