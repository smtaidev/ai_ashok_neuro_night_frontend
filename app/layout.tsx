import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { ReduxProvider } from "@/redux/provider";
import AppInitializer from "@/components/AppInitializer";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clarhet",
  description: "A business consultant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en" data-theme="light">
        <body className={`${poppins.variable} antialiased relative`}>
          <AppInitializer />
          <NextTopLoader
            showSpinner={false}
            color="#22398A"
            shadow="0 0 10px rgba(0, 0, 0, 0.5)"
          />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
