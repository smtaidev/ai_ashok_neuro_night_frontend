// "use client";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarRail,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { UserAvatarProfile } from "@/components/user-avatar-profile";
// import { navItems } from "@/constants/data";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import {
//   IconBell,
//   IconChevronRight,
//   IconChevronsDown,
//   IconCreditCard,
//   IconLogout,
//   IconPhotoUp,
//   IconUserCircle,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import * as React from "react";
// import { Icons } from "../icons";
// import { cn } from "./../../lib/utils";

// export const company = {
//   name: "Shoyas Soft Tech",
//   logo: IconPhotoUp,
//   plan: "Enterprise",
// };

// export default function AppSidebar() {
//   const pathname = usePathname();
//   const { isOpen } = useMediaQuery();
//   const sidebar = useSidebar();
//   const { user } = {
//     user: {
//       imageUrl: "https://example.com/image.jpg",
//     },
//   };
//   const router = useRouter();

//   return (
//     <Sidebar
//       collapsible="icon"
//       className="w-72 min-h-screen bg-white shadow-md" // wider sidebar
//     >
//       {/* Sidebar Header */}
//       <SidebarHeader className="pb-6 border-b-2 border-[#22398A] h-20 flex items-center px-4">
//         <span className="text-2xl font-extrabold whitespace-nowrap transition-all duration-300">
//           {sidebar.open
//             ? company.name
//             : company.name
//               .split(" ")
//               .map((word) => word[0])
//               .join("")
//               .toUpperCase()}
//         </span>
//       </SidebarHeader>

//       {/* Sidebar Content */}
//       <SidebarContent className="overflow-x-hidden text-lg">
//         <SidebarGroup>
//           <SidebarGroupLabel className="lg:text-2xl md:text-xl text-lg font-bold mb-2">
//             Overview
//           </SidebarGroupLabel>
//           <SidebarMenu className="space-y-1">
//             {navItems.map((item) => {
//               const Icon = item.icon ? Icons[item.icon] : Icons.logo;
//               return item?.items && item?.items?.length > 0 ? (
//                 <Collapsible
//                   key={item.title}
//                   asChild
//                   defaultOpen={item.isActive}
//                   className="group/collapsible"
//                 >
//                   <SidebarMenuItem>

//                     <CollapsibleTrigger asChild>
//                       <SidebarMenuButton
//                         tooltip={item.title}
//                         isActive={pathname === item.url}
//                         className="px-5 py-6 text-lg font-semibold rounded-md"
//                       >
//                         {item.icon && <Icon className="mr-2 w-6 h-6" />}
//                         <Link href={item.url}>
//                           <span>{item.title}</span>
//                         </Link>
//                         <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                       </SidebarMenuButton>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent>
//                       <SidebarMenuSub className="ml-4">
//                         {item.items?.map((subItem) => (
//                           <SidebarMenuSubItem key={subItem.title}>
//                             <SidebarMenuSubButton
//                               asChild
//                               isActive={pathname === subItem.url}
//                               className="px-5 py-2 text-base rounded-md"
//                             >
//                               <Link href={subItem.url}>
//                                 <span>{subItem.title}</span>
//                               </Link>
//                             </SidebarMenuSubButton>
//                           </SidebarMenuSubItem>
//                         ))}
//                       </SidebarMenuSub>
//                     </CollapsibleContent>
//                   </SidebarMenuItem>
//                 </Collapsible>
//               ) : (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     tooltip={item.title}
//                     isActive={pathname === item.url}
//                     className="px-5 py-6 text-lg font-semibold rounded-md"
//                   >
//                     <Link href={item.url}>
//                       <Icon className="mr-2 w-6 h-6" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               );
//             })}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Footer */}
//       <SidebarFooter className="p-4 border-t mt-4">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton
//                   size="lg"
//                   className="w-full flex justify-between items-center px-5 py-6 rounded-md"
//                 >
//                   <span className="text-lg font-semibold">Account</span>
//                   <IconChevronsDown className="ml-auto size-5" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-64 rounded-lg"
//                 side="bottom"
//                 align="end"
//                 sideOffset={4}
//               >
//                 <DropdownMenuLabel className="p-0 font-normal">
//                   <div className="px-3 py-2">
//                     {/* <UserAvatarProfile className="h-8 w-8 rounded-lg" showInfo user={user} /> */}
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />

//                 <DropdownMenuGroup>
//                   <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
//                     <IconUserCircle className="mr-2 h-5 w-5" />
//                     Profile
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <IconCreditCard className="mr-2 h-5 w-5" />
//                     Billing
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <IconBell className="mr-2 h-5 w-5" />
//                     Notifications
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <IconLogout className="mr-2 h-5 w-5" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>

//       <SidebarRail />
//     </Sidebar>
//   );
// }

//! Try - v1
"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { navItems } from "@/constants/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Icons } from "../icons";
import { cn } from "./../../lib/utils";
import { Dot } from "lucide-react";

export const company = {
  name: "Bindu Soft",
  logo: IconPhotoUp,
  plan: "Enterprise",
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const sidebar = useSidebar();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" className="w-72 min-h-screen bg-white! ">
      {/* Sidebar Header */}
      <SidebarHeader className="pb-6 border-b-2 border-[#22398A] h-20 flex items-center px-4 pt-6">
        <span className="text-2xl font-extrabold whitespace-nowrap transition-all duration-300">
          {sidebar.open
            ? company.name
            : company.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
        </span>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="overflow-x-hidden text-sm mt-5">
        <SidebarGroup>
          {/* className="space-y-2" */}
          <SidebarMenu >
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              const isParentActive =
                pathname === item.url ||
                item.items?.some((sub) => pathname.startsWith(sub.url));

              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isParentActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <div
                      className={cn(
                        "rounded-lg overflow-hidden",
                        isParentActive ? "bg-gray-200 " : "bg-transparent"
                      )}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isParentActive}
                          className={cn(
                            "px-5 py-6 text-lg font-semibold rounded-md w-full flex justify-between items-center",
                            isParentActive
                              ? "text-white bg-[#22398A]!"
                              : ""
                          )}
                        >
                          {item.icon && <Icon className="mr-2 w-6 h-6" />}
                          <Link href={item.url}>
                            <span>{item.title}</span>
                          </Link>
                          <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4">
                          {item.items?.map((subItem) => {
                            const isSubActive = pathname === subItem.url;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className={cn(
                                    "px-5 py-2 text-base rounded-md",
                                    isSubActive
                                      ? "bg-[#22398A] text-white "
                                      : ""
                                  )}
                                >
                                  <Link href={subItem.url} className="my-2">
                                    <span className={cn("font-semibold pl-2 w-full flex justify-start items-center",
                                      isSubActive
                                        ? 'text-white'
                                        : "text-black"
                                    )}>
                                      <Dot className="size-10" />
                                      <span>{subItem.title}</span>
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </div>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className={cn(
                      "px-5 py-6 text-lg font-semibold rounded-md",
                      pathname === item.url
                        ? "bg-[#22398A] text-white"
                        : ""
                    )}
                  >
                    <Link href={item.url}>
                      <Icon className="mr-2 w-6 h-6" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t mt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="w-full flex justify-start items-center px-5 py-6 rounded-md"
            >
              <IconLogout className="size-5" />
              <span className="text-lg font-semibold">Logout</span>
            </SidebarMenuButton>
            {/* <IconLogout className="mr-2 h-5 w-5" />
                  Logout */}

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}



//! Try - V2

// "use client";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarRail,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { navItems } from "@/constants/data";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import {
//   IconBell,
//   IconChevronRight,
//   IconChevronsDown,
//   IconCreditCard,
//   IconLogout,
//   IconPhotoUp,
//   IconUserCircle,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import * as React from "react";
// import { Icons } from "../icons";
// import { cn } from "./../../lib/utils";
// import { Dot } from "lucide-react";

// export const company = {
//   name: "Shoyas Soft Tech",
//   logo: IconPhotoUp,
//   plan: "Enterprise",
// };

// export default function AppSidebar() {
//   const pathname = usePathname();
//   const { isOpen } = useMediaQuery();
//   const sidebar = useSidebar();
//   const router = useRouter();

//   return (
//     <Sidebar collapsible="icon" className="w-72 min-h-screen bg-white! ">
//       {/* Sidebar Header */}
//       <SidebarHeader className="pb-6 border-b-2 border-[#22398A] h-20 flex items-center px-4 pt-6">
//         <span className="text-2xl font-extrabold whitespace-nowrap transition-all duration-300">
//           {sidebar.open
//             ? company.name
//             : company.name
//               .split(" ")
//               .map((word) => word[0])
//               .join("")
//               .toUpperCase()}
//         </span>
//       </SidebarHeader>

//       {/* Sidebar Content */}
//       <SidebarContent className="overflow-x-hidden text-sm text-gray-500">
//         <SidebarGroup>
//           <SidebarMenu className="space-y-2">
//             {navItems.map((item) => {
//               const Icon = item.icon ? Icons[item.icon] : Icons.logo;
//               const isParentActive =
//                 pathname === item.url ||
//                 item.items?.some((sub) => pathname.startsWith(sub.url));

//               return item?.items && item?.items?.length > 0 ? (
//                 <Collapsible
//                   key={item.title}
//                   asChild
//                   defaultOpen={isParentActive}
//                   className="group/collapsible"
//                 >
//                   <SidebarMenuItem>
//                     <div
//                       className={cn(
//                         "rounded-lg overflow-hidden",
//                         isParentActive ? "bg-[#22398A] " : "bg-transparent"
//                       )}
//                     >
//                       <CollapsibleTrigger asChild>
//                         <SidebarMenuButton
//                           tooltip={item.title}
//                           isActive={isParentActive}
//                           className={cn(
//                             "px-5 py-6 text-lg font-semibold rounded-md w-full flex justify-between items-center",
//                             isParentActive
//                               ? "text-white bg-gray-500!"
//                               : ""
//                           )}
//                         >
//                           {item.icon && <Icon className="mr-2 w-6 h-6" />}
//                           <Link href={item.url}>
//                             <span>{item.title}</span>
//                           </Link>
//                           <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                         </SidebarMenuButton>
//                       </CollapsibleTrigger>

//                       <CollapsibleContent>
//                         <SidebarMenuSub className="ml-4">
//                           {item.items?.map((subItem) => {
//                             const isSubActive = pathname === subItem.url;
//                             return (
//                               <SidebarMenuSubItem key={subItem.title}>
//                                 <SidebarMenuSubButton
//                                   asChild
//                                   isActive={isSubActive}
//                                   className={cn(
//                                     "px-5 py-2 text-base rounded-md",
//                                     isSubActive
//                                       ? "bg-[#22398A] text-white "
//                                       : ""
//                                   )}
//                                 >
//                                   <Link href={subItem.url} className="my-2">
//                                     <span className={cn("font-semibold pl-2 w-full",
//                                       isSubActive
//                                         ? 'text-white bg-gray-400 rounded-md'
//                                         : "text-gray-400"
//                                     )}>
//                                       {subItem.title}
//                                     </span>
//                                   </Link>
//                                 </SidebarMenuSubButton>
//                               </SidebarMenuSubItem>
//                             );
//                           })}
//                         </SidebarMenuSub>
//                       </CollapsibleContent>
//                     </div>
//                   </SidebarMenuItem>
//                 </Collapsible>
//               ) : (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     tooltip={item.title}
//                     isActive={pathname === item.url}
//                     className={cn(
//                       "px-5 py-6 text-lg font-semibold rounded-md",
//                       pathname === item.url
//                         ? "bg-[#22398A] text-white"
//                         : ""
//                     )}
//                   >
//                     <Link href={item.url}>
//                       <Icon className="mr-2 w-6 h-6" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               );
//             })}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Footer */}
//       <SidebarFooter className="p-4 border-t mt-4">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton
//                   size="lg"
//                   className="w-full flex justify-between items-center px-5 py-6 rounded-md"
//                 >
//                   <span className="text-lg font-semibold">Account</span>
//                   <IconChevronsDown className="ml-auto size-5" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-64 rounded-lg"
//                 side="bottom"
//                 align="end"
//                 sideOffset={4}
//               >
//                 <DropdownMenuLabel className="p-0 font-normal">
//                   <div className="px-3 py-2">{/* Avatar etc. */}</div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />

//                 <DropdownMenuGroup>
//                   <DropdownMenuItem
//                     onClick={() => router.push("/dashboard/profile")}
//                   >
//                     <IconUserCircle className="mr-2 h-5 w-5" />
//                     Profile
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <IconCreditCard className="mr-2 h-5 w-5" />
//                     Billing
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <IconBell className="mr-2 h-5 w-5" />
//                     Notifications
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <IconLogout className="mr-2 h-5 w-5" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>

//       <SidebarRail />
//     </Sidebar>
//   );
// }



