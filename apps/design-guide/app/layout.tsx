import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatsian - Multi-Platform Social Media Management",
  description: "Manage all your social media in one place. Post, schedule, and publish content across 14+ platforms including Instagram, Twitter, LinkedIn, Facebook, TikTok, YouTube, and more.",
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
