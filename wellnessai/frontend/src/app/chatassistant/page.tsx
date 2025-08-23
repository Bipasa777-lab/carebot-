"use client";

import { MicIcon, PlusIcon, SendIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const ChatAssistantPage = (): JSX.Element => {
  const languages = ["Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "English"];
  const sampleQuestions = [
    "I'm feeling mild fever since last night.",
    "Can you suggest a diet for diabetes control?",
    "I have a headache and low energy today.",
    "What are the side effects of this medicine?",
    "Can you remind me to take my BP tablets daily?",
  ];

  // state for selected language + selected chat
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return (
    <div className="bg-[#cff2f1] min-h-screen w-full flex justify-center">
      <div className="bg-[#cff2f1] w-full max-w-[1440px] h-[1024px] relative overflow-hidden">
        {/* gradient background */}
        <div className="absolute w-full h-full">
          <div className="absolute w-[2261px] h-[992px] top-[391px] left-[-397px] rounded-[1130.65px/496px] rotate-[0.35deg] shadow-[0px_0px_250px_100px_#cff2f1] bg-[linear-gradient(180deg,rgba(207,242,241,0.5)_0%,rgba(84,237,239,0.5)_43%)]" />
        </div>

        {/* MAIN CONTENT */}
        <main className="flex flex-col items-center px-4 relative z-10">
          <h1 className="text-5xl font-medium text-black text-center mt-[82px] mb-[26px] [font-family:'Outfit',Helvetica]">
            How can we assist you today ?
          </h1>

          <h2 className="text-3xl font-medium text-black text-center mb-8 [font-family:'Outfit',Helvetica]">
            Choose your language
          </h2>

          {/* language buttons */}
          <div className="flex gap-[47px] mb-16 flex-wrap justify-center">
            {languages.map((language, index) => (
              <Button
                key={index}
                onClick={() => setSelectedLanguage(language)}
                variant="ghost"
                className={`w-[132px] h-14 rounded-[10px] shadow-[0px_0px_10px_5px_#00000040] text-2xl font-normal [font-family:'Outfit',Helvetica] h-auto transition-colors 
                  ${
                    selectedLanguage === language
                      ? "bg-[#4fd1c5] text-white"
                      : "bg-[#ffffff0f] text-black hover:bg-[#ffffff3f]"
                  }`}
              >
                {language}
              </Button>
            ))}
          </div>

          {/* input box */}
          <div className="relative w-full max-w-[1062px] mb-8">
            <div className="bg-[#ffffff6b] rounded-[20px] shadow-[0px_0px_10px_2px_#00000040] h-20 flex items-center px-6">
              <Button variant="ghost" size="icon" className="h-auto p-3 mr-4">
                <PlusIcon className="w-6 h-6" />
              </Button>

              <Input
                placeholder="Share your health concern here..."
                className="flex-1 border-none bg-transparent text-2xl font-normal text-black opacity-70 [font-family:'Outfit',Helvetica] placeholder:text-black placeholder:opacity-70 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="flex gap-4 ml-4">
                <Button variant="ghost" size="icon" className="h-auto p-3">
                  <MicIcon className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-auto p-3">
                  <SendIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* sample questions */}
          <Card className="w-full max-w-[900px] bg-[#ffffff6b] shadow-[0px_0px_10px_2px_#00000040] border-none">
            <CardContent className="p-8">
              <div className="text-[22px] font-medium text-black [font-family:'Outfit',Helvetica] leading-relaxed">
                {sampleQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedQuestion(question)}
                    className={`mb-4 p-3 rounded-lg cursor-pointer transition-colors ${
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
        </main>
      </div>
    </div>
  );
};

export default ChatAssistantPage;
