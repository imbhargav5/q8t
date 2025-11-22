import type { Metadata } from "next";
import "./globals.css";

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
