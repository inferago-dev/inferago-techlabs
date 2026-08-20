import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inferago Tech & Digital Services",
  description:
    "Inferago builds, launches and grows digital products — websites, applications, custom software, digital marketing and AI integration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased [--font-mono-fallback:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
