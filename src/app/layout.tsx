import type { Metadata, Viewport } from "next"; // 1. Viewport hier importiert
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://davimeyer.dev"),
  title: "Davi Meyer | Software Engineer",
  description:
    "Davi Meyer – Full Stack Developer & Software Engineer at SIX Group. Portfolio with projects, experience and contact.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Davi Meyer",
    title: "Davi Meyer | Software Engineer",
    description:
      "Davi Meyer – Full Stack Developer & Software Engineer at SIX Group.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Davi Meyer",
  url: "https://davimeyer.dev",
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "SIX Group" },
  sameAs: ["https://github.com/DaviMeyer"],
};

// 2. Dieser Teil kontrolliert die Leisten auf dem iPhone/Android
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}