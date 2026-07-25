import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import { ServiceWorkerRegistration } from '@/components/sw-registration';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'POS - Point of Sale',
  description: 'Point of Sale system for managing products, inventory, and transactions',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'POS',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#F68B1E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" href="/icons/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <div className="overflow-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ServiceWorkerRegistration />
            <NextTopLoader showSpinner={false} />
            {children}
            <ToastContainer />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
