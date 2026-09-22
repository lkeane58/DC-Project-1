import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hopkins Study | Fall 2026",
  description:
    "A focused study-group discovery and creation space for Johns Hopkins students in Fall 2026.",
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
