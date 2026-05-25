import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import SidebarNav from "@/components/layout/sidebar-nav";
import ScrollToTop from "@/components/ui/scroll-to-top";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* TODO: Replace with your actual deployed URL */
const SITE_URL = "https://kenfrianeza.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ken Frianeza | Software Engineer",
    template: "%s | Ken Frianeza",
  },
  description:
    "Software Engineer building production-grade web applications that power real institutions. Specializing in performance optimization, clean architecture, and end-to-end feature deployment across React, Node.js, Laravel, and AWS.",
  keywords: [
    "Ken Frianeza",
    "Software Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "Node.js",
    "Laravel",
    "PHP Developer",
    "Python",
    "TypeScript",
    "GraphQL",
    "REST API",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MySQL",
    "Clean Architecture",
    "Performance Optimization",
    "Quezon City",
    "Philippines",
  ],
  authors: [{ name: "Ken Frianeza" }],
  creator: "Ken Frianeza",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ken Frianeza | Software Engineer",
    description:
      "Software Engineer building production-grade web applications that power real institutions. Specializing in performance optimization, clean architecture, and end-to-end deployment.",
    url: SITE_URL,
    siteName: "Ken Frianeza — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ken Frianeza | Software Engineer",
    description:
      "Building production-grade web applications with clean architecture, performance optimization, and modern tech stacks.",
    creator: "@kenfrianeza",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface-950 text-surface-200">
        <Header />
        <SidebarNav />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
