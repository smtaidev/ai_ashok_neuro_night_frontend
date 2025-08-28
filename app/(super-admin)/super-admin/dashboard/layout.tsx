import ClarhetAIChat from "@/components/chatwithai/ClarhetAIChat";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import Providers from "@/components/layout/providers";
import SuperAdminAppSidebar from "@/components/layout/super-admin-app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";
import toast, { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Clarhet Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Providers activeThemeValue={activeThemeValue as string}>
        <KBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <SuperAdminAppSidebar />
            <SidebarInset>
              <Header />
              {/* page main content */}
              <div
                className={`py-6 pr-6 pl-16 space-y-6 bg-[#F5F7FA] ${isScaled ? "scale-90" : ""
                  }`}
              >
                {children}
              </div>
              {/* <ClarhetAIChat
                apiEndpoint="https://clarhet-server-sable.vercel.app/api/v1/chat-bot/create-chat"
              /> */}
              <Toaster />
              {/* page main content ends */}
            </SidebarInset>
          </SidebarProvider>
        </KBar>
      </Providers>
    </ThemeProvider>
  );
}
