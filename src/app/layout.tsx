import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JHU Study Groups & Room Booking | Fall 2026",
  description:
    "Official Johns Hopkins University study group matching and campus room reservation platform for Fall 2026 semester.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

