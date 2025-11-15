import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Q8T Website",
  description: "Q8T Turborepo Website",
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
