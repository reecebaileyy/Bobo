import type { Metadata } from "next";
import "./globals.css";
import AbstractProvider from "@/components/AbstractProvider";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const metadata: Metadata = {
  title: "BOBOVISION",
  description: "Bobo see Bobo do",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-cursor">
      <AbstractProvider>
        <body>
          {children}
        </body>
      </AbstractProvider>
    </html>
  );
}
