import '@coinbase/onchainkit/styles.css'; 
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
 
import { Providers } from '../components/providers';
 
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bobo Vision',
  description: 'Bobo see Bobo do',
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body>
        <Providers> 
          {children}
        </Providers>
      </body>
    </html>
  );
}