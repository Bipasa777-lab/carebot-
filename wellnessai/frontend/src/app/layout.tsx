"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import NavBar from "../components/navbar"; // <-- Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WellnessAI",
  description: "AI-powered Medical Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <NavBar />
        <img src="/images/your-image.jpg" alt="Description" />
        {children}
      </body>
    </html>
  );
}
