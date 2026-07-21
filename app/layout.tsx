import type { Metadata } from "next";
import { Open_Sans, JetBrains_Mono } from "next/font/google";
import { RootProvider } from "@/providers/root-provider";
import { FloatingNavbar } from "@/components/navbar/floating-navbar";
import { InteractiveFooter } from "@/components/footer/interactive-footer";
import { NoiseTexture } from "@/components/backgrounds/noise-texture";
import { siteConfig } from "@/config/site";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${openSans.variable} ${jetbrainsMono.variable} font-sans bg-void text-snow min-h-full flex flex-col antialiased`}
      >
        <RootProvider>
          <FloatingNavbar />
          <main className="flex-grow">{children}</main>
          <InteractiveFooter />
          <NoiseTexture opacity={0.025} />
        </RootProvider>
      </body>
    </html>
  );
}
