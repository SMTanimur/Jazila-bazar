import { Analytics } from "@/components/common/shared/analytics";
import { TailwindIndicator } from "@/components/common/shared/tailwind-indicator";
import GlobalModals from "@/components/providers/GlobalModals";
import GoogleProvider from "@/components/providers/google.provider";
import { QueryProvider } from "@/components/providers/query.provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

import "../assets/css/swiper-carousel.css";
import { defaultMetadata } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GoogleProvider>
            <QueryProvider>
              <GlobalModals />
              {children}
              <TailwindIndicator />
              <Analytics />
            </QueryProvider>
          </GoogleProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
