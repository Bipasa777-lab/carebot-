import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50 p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">📄 About WellnessAI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 text-md">
          <p>
            <strong>WellnessAI</strong> is a smart, AI-powered medical assistant built to provide accurate, reliable, and private health advice. Our mission is to empower individuals with fast, expert-level responses through open-source models like <strong>MedItorn</strong> and tools like <strong>LangChain</strong>.
          </p>
          <p>
            This project was developed during a hackathon to solve the pressing issue of medical misinformation, especially in underserved and rural communities. WellnessAI integrates emergency features, voice support, and multilingual capabilities.
          </p>
          <p>
            <strong>Team:</strong> Bipasa Saha and collaborators passionate about AI for healthcare.
          </p>
          <p>
            <strong>Version:</strong> 1.0.0 (Beta)
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
