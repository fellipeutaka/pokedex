import type { Metadata, ServerRuntime, Viewport } from "next";
import { Inter } from "next/font/google";

import { Background } from "~/components/background";
import { Footer } from "~/components/layout/footer";
import { Navbar } from "~/components/layout/navbar";
import { Providers } from "~/components/providers";
import { siteConfig } from "~/config/site";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind",
    "TailwindCSS",
    "TypeScript",
    "Pokémon",
    "Pokédex",
  ],
  authors: [{ name: "Fellipe Utaka", url: "https://fellipeutaka.vercel.app" }],
  creator: "Fellipe Utaka",
  publisher: "Fellipe Utaka",
  robots: "index, follow",
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@fellipeutaka",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const runtime: ServerRuntime = "edge";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className="motion-safe:scroll-smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className="grid min-h-screen grid-rows-[3.5rem,1fr,min-content] bg-background text-foreground antialiased"
        style={inter.style}
      >
        <Providers>
          <Navbar />
          <Background>{children}</Background>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
