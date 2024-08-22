import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ai-professor",
  description: "AI + rag powered ratemyprofessor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={open_sans.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
