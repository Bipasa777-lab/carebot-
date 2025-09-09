"use client";

import { MicIcon, PlusIcon, SendIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { sendMedicalChat } from "../../services/meditronService";

const ChatAssistantPage = (): JSX.Element => {
  const languages = ["Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "English"];
  const sampleQuestions = [
    "I'm feeling mild fever since last night.",
    "Can you suggest a diet for diabetes control?",
    "I have a headache and low energy today.",
    "What are the side effects of this medicine?",
    "Can you remind me to take my BP tablets daily?",
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  const handleSend = async () => {
    const text = (input || selectedQuestion || "").trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setSelectedQuestion(null);
    setInput("");
    setLoading(true);
    try {
      const data = await sendMedicalChat(text);
      const reply = data?.response?.message || data?.error || "No response received from medical AI.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: any) {
      console.error("Chat error:", e);
      const errorMsg = e.message || "Failed to connect to medical AI. Please check if the backend server is running.";
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${errorMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#cff2f1] min-h-screen w-full flex justify-center">
      <div className="bg-[#cff2f1] w-full max-w-[1440px] relative overflow-hidden">
        {/* gradient background */}
        <div className="absolute w-full h-full -z-10">
          <div className="absolute w-[1800px] h-[900px] top-[250px] left-[-400px] rounded-[900px/400px] rotate-[0.35deg] shadow-[0px_0px_200px_80px_#cff2f1] bg-[linear-gradient(180deg,rgba(207,242,241,0.5)_0%,rgba(84,237,239,0.5)_43%)]" />
        </div>

        {/* MAIN CONTENT */}
        <main className="flex flex-col items-center px-4 sm:px-6 md:px-12 py-10 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium text-black text-center mb-6 [font-family:'Outfit',Helvetica]">
            How can we assist you today?
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-black text-center mb-6 [font-family:'Outfit',Helvetica]">
            Choose your language
          </h2>

          {/* language buttons */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            {languages.map((language, index) => (
              <Button
                key={index}
                onClick={() => setSelectedLanguage(language)}
                variant="ghost"
                className={`px-6 py-3 rounded-lg text-base sm:text-lg md:text-xl shadow-md transition-colors 
                  ${
                    selectedLanguage === language
                      ? "bg-[#4fd1c5] text-white"
                      : "bg-white/40 text-black hover:bg-white/60"
                  }`}
              >
                {language}
              </Button>
            ))}
          </div>

          {/* input box */}
          <div className="relative w-full max-w-[1062px] mb-8 px-2">
            <div className="bg-white/60 rounded-xl shadow-md flex items-center px-4 py-3">
              <Button variant="ghost" size="icon" className="h-auto p-2 mr-2">
                <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Share your health concern here..."
                className="flex-1 border-none bg-transparent text-base sm:text-lg md:text-xl font-normal text-black opacity-80 [font-family:'Outfit',Helvetica] placeholder:text-black placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="flex gap-2 sm:gap-4 ml-2">
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  <MicIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-auto p-2" onClick={handleSend} disabled={loading}>
                  <SendIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* sample questions */}
          <Card className="w-full max-w-[900px] bg-white/70 shadow-md border-none">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-base sm:text-lg md:text-xl font-medium text-black [font-family:'Outfit',Helvetica] leading-relaxed">
                {sampleQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedQuestion(question);
                      setInput(question);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedQuestion === question
                        ? "bg-[#d1f7f6] text-black font-semibold"
                        : "hover:bg-[#e6fafa]"
                    }`}
                  >
                    {question}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* messages view */}
          <div className="w-full max-w-[900px] mt-6">
            <Card className="bg-white/70 shadow-md border-none">
              <CardContent className="p-4 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className="text-black">
                    <span className="font-semibold mr-2">{m.role === "user" ? "You" : "Assistant"}:</span>
                    <span>{m.content}</span>
                  </div>
                ))}
                {loading && <div className="text-black/70">Thinking…</div>}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatAssistantPage;
