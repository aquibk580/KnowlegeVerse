import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ConfettiProvider } from "@/components/providers/ConfettiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KnowlegeVerse",
  description:
    "Ride the wave of knowledge with KnowledgeVerse, a powerful Learning Management System tailored for the digital age. Whether you're teaching a large class or learning a new skill, KnowledgeVerse offers an intuitive platform with advanced features like interactive content, adaptive learning paths, and detailed analytics. Experience the future of education with a system built for speed, security, and scalability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
