import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Khaled Abuelenein | Full Stack Developer",
  description:
    "Professional portfolio of Khaled Abuelenein - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects and get in touch.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Khaled Abuelenein",
  ],
  authors: [{ name: "Khaled Abuelenein" }],
  creator: "Khaled Abuelenein",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khaledabuelenein.dev",
    title: "Khaled Abuelenein | Full Stack Developer",
    description:
      "Professional portfolio of Khaled Abuelenein - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Khaled Abuelenein Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaled Abuelenein | Full Stack Developer",
    description:
      "Professional portfolio of Khaled Abuelenein - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    creator: "@khaledabuelenein",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
