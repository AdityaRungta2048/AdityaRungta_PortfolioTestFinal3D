import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com/'),
  title: "Aditya Rungta ✌️",
  description: "A software engineer by profession, a builder at heart.",
  keywords: "Aditya Rungta, Software Engineer, Full-Stack Developer, AI Developer, Machine Learning, Backend Developer, Python, Java, Kotlin, React Native, Portfolio",
  authors: [{ name: "Aditya Rungta" }],
  creator: "Aditya Rungta",
  publisher: "Aditya Rungta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Aditya Rungta - Software Engineer",
    description: "Software engineer, full-stack developer and AI enthusiast.",
    siteName: "Aditya Rungta's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rungta - Software Engineer",
    description: "Software engineer, full-stack developer and AI enthusiast.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''}/>
    </html>
  );
}
