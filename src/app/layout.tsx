import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/providers/SmoothScroll';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Jigar Interiors | Design & Build Company | Architecture, Interior & Technology',
  description: 'Jigar Interiors is a design & build firm combining architecture, interior design, and advanced technology to deliver intelligent, high-performance spaces.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0b0b0b] text-white min-h-screen antialiased font-inter">
        <SmoothScroll>
          <Preloader />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
