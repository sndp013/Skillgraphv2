import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillGraph | Proof-based Portfolios",
  description: "Create a powerful public portfolio in under 3 minutes that showcases your real work, projects, and outcomes.",
  openGraph: {
    title: "SkillGraph | Proof-based Portfolios",
    description: "The traditional resume is dead. Build your proof and get hired fast with SkillGraph.",
    url: "https://skillgraph.com",
    siteName: "SkillGraph",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillGraph Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillGraph | Proof-based Portfolios",
    description: "Build your proof and get hired fast with SkillGraph.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
