'use client';

import ClarhetAIChat from "@/components/chatwithai/ClarhetAIChat";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import Providers from "@/components/layout/providers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { decodedToken } from "@/utils/jwt";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScaled = 'light'?.endsWith("-scaled");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedData = decodedToken(token);
      setUserInfo(decodedData);
    }
  }, []);

  const { role, companyRole }: any = userInfo;

  if (companyRole === 'company Admin' && (role === 'companyAdmin' || role === 'companyEmployee')) {
    return redirect('/unauthorized');
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Providers activeThemeValue={'light' as string}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <SidebarInset>
            <Header />
            {/* page main content */}
            <div
              className={`py-6 pr-6 pl-16 space-y-6 bg-[#F5F7FA] ${isScaled ? "scale-90" : ""
                }`}
            >
              {children}
            </div>
            <ClarhetAIChat
              apiEndpoint="https://clarhet-server-sable.vercel.app/api/v1/chat-bot/create-chat"
            />
            <Toaster />
            {/* page main content ends */}
          </SidebarInset>
        </SidebarProvider>
      </Providers>
    </ThemeProvider>
  );
}
