"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (replace this with actual API call)
    const aiMessage: Message = {
      role: "ai",
      text: "🩺 This is a sample response. Please consult a doctor for urgent concerns.",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);

    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="max-w-3xl w-full mx-auto shadow-lg rounded-xl h-[90vh] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl text-blue-600">💬 WellnessAI Medical Chat</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4 px-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </CardContent>

      <form
        className="flex gap-2 p-4 border-t"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim()}>
          Send
        </Button>
      </form>
    </Card>
  );
}
