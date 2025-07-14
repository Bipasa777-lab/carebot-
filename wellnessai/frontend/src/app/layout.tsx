import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import NavBar from "../components/navbar"; // <-- Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WellnessAI",
  description: "AI-powered Medical Chatbot",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
