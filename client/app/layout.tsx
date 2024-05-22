import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Header } from './Header';

import './globals.css';

const inter = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'rawdog',
  description: 'Learning tanstack'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
