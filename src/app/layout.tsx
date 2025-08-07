import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { inter } from '../ui/fonts'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TattooMS - Professional Tattoo Management System",
  description: "Streamline your tattoo business with our comprehensive management system. Track sessions, manage equipment, handle client communications, and grow your business - all in one place.",
  keywords: "tattoo management, tattoo business, artist tools, session tracking, equipment management, client communication",
  authors: [{ name: "TattooMS Team" }],
  openGraph: {
    title: "TattooMS - Professional Tattoo Management System",
    description: "The complete management system designed specifically for tattoo artists. Track sessions, manage equipment, handle client communications, and grow your business.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>

    </html>
  );
}
