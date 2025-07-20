// src/app/page.tsx
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <Card className="w-full max-w-3xl shadow-2xl rounded-3xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-800">
            Welcome to WellnessAI 🌿
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-8">
          <p className="text-gray-700 text-lg">
            Your private, AI-powered medical assistant providing fast, expert health advice using Meditorn & LangChain.
          </p>
          <div className="flex justify-center">
            <Link href="/chat">
              <Button size="lg" className="text-white bg-green-600 hover:bg-green-700 rounded-full px-6 py-2">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
