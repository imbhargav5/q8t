import type { Metadata } from "next";
// Temporarily disabled for build - network restrictions prevent font fetching
// import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const sourceSerif4 = Source_Serif_4({
//   subsets: ["latin"],
//   variable: "--font-serif",
// });

// const jetbrainsMono = JetBrains_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

export const metadata: Metadata = {
  title: "Social Media Platform - Open Source Social Media Management",
  description: "A modern, open-source platform with comprehensive features for content creation, publishing, and customer engagement. Manage all your social media from one powerful dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
