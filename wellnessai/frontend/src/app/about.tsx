"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50 p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            📄 About WellnessAI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 text-md">
          <p>
            <strong>WellnessAI</strong> is a smart, AI-powered medical assistant built to
            provide accurate, reliable, and private health advice.
          </p>
          <p>
            Developed during a hackathon to solve the issue of medical misinformation in
            rural communities.
          </p>
          <p>
            <strong>Team:</strong> Bipasa Saha & Collaborators
          </p>
          <p>
            <strong>Version:</strong> 1.0.0 (Beta)
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
