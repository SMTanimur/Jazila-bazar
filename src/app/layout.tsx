import './globals.css';
import type { Metadata } from 'next';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { TailwindIndicator } from '@/components/common/shared/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Analytics } from '@/components/common/shared/analytics';
import { QueryProvider } from '@/components/providers/query.provider';
import { defaultMetadata } from '../lib/seo';
import GoogleProvider from '@/components/providers/google.provider';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <GoogleProvider>
            <QueryProvider>
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
