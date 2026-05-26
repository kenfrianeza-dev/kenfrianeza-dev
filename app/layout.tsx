import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import SidebarNav from "@/components/layout/sidebar-nav";
import ScrollToTop from "@/components/ui/scroll-to-top";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    title: "Ken Frianeza — Software Engineer",
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
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", geist.variable)}>
      <body className="min-w-[400px] min-h-full flex flex-col bg-surface-950 text-surface-200">
        <NextTopLoader 
          color="#3b82f6" 
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={3} 
          crawl={true} 
          showSpinner={false} 
          easing="ease" 
          speed={200} 
          shadow="0 0 10px #3b82f6,0 0 5px #3b82f6" 
          zIndex={99999} 
        />
        <Header />
        <SidebarNav />
        {children}
        <ScrollToTop />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#0f172a', // deep blue surface
              border: '1px solid #3b82f6', // accent-500
              color: '#60a5fa', // accent-400
            }
          }}
        />
      </body>
    </html>
  );
}
