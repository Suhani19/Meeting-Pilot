import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetingPilot — AI Meeting Lifecycle Agent",
  description: "Before the meeting. During the decision. After the action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0D12] text-[#F8FAFC] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
