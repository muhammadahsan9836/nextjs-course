import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // 1. Import Link for smooth navigation
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
  title: "Hunting Coder",
  description: "A blog for hunting coders by a hunting coder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Hey Its me Muhammad Ahsan")
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {/* 2. This is your NAVBAR */}
        <nav className="flex justify-center gap-8 py-8 text-lg font-medium">
          <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
          <Link href="/blogpost" className="hover:text-gray-400 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
        </nav>

        {/* 3. This is where your specific page content loads */}
        {children}
      </body>
    </html>
  );
}