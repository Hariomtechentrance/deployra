import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionConfig } from "motion/react";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ExperienceStageProvider } from "@/components/layout/ExperienceStageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deployra | Engineering the Future with AI, Software & Digital Innovation",
  description:
    "Deployra Private Limited builds AI-powered software, enterprise platforms, mobile applications, and cloud solutions that help startups and enterprises scale with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            <ExperienceStageProvider>
              <Navbar />
              {children}
              <Footer />
            </ExperienceStageProvider>
          </SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
