
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
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/appSlice";
import { decodedToken } from "@/utils/jwt";

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
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  if (token) {
    const userInfo = decodedToken(token);
    console.log("User Info: ", userInfo);
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    router.push('/')
  };

  return (
    <Sidebar collapsible="icon" className="w-80 min-h-screen bg-white! ">
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
                            "px-5 py-6 text-lg font-semibold rounded-md w-full flex justify-between items-center text-[#0B1C33]/70",
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
                                    "px-5 py-2 text-base rounded-md ",
                                    isSubActive
                                      ? "bg-[#22398A] text-white "
                                      : ""
                                  )}
                                >
                                  <Link href={subItem.url} className="my-2">
                                    <span className={cn("font-semibold pl-2 w-full flex justify-start items-center",
                                      isSubActive
                                        ? 'text-white'
                                        : "text-[#0B1C33]/70"
                                    )}>
                                      <Dot className="size-10" />
                                      <span>
                                        {subItem.title.length > 16
                                          ? subItem.title.slice(0, 15) + "..."
                                          : subItem.title}
                                      </span>
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
                      "px-5 py-6 text-lg font-semibold rounded-md text-[#0B1C33]/70",
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
              className="w-full flex justify-start items-center px-5 py-6 rounded-md text-red-500"
              onClick={() => handleLogout()}
            >
              <IconLogout className="size-5" />
              <span className="text-lg font-semibold">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}