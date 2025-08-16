import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Beautiful landing page with Next.js, Tailwind, and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
