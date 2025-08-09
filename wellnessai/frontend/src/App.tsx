"use client";
import React from "react";
import ChatWindow from "./components/ChatWindow"; // Adjust path if needed

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-pink-100 px-4 py-8">
      <h1 className="text-4xl font-bold text-zinc-900 mb-4 text-center">
        Welcome to WellnessAI Carebot!
      </h1>
      <p className="text-zinc-700 text-lg mb-8 text-center">
        Your AI-powered medical chatbot is ready to assist you.
      </p>

      <div className="w-full max-w-2xl shadow-lg rounded-xl border border-zinc-300 bg-white">
        <ChatWindow />
      </div>
    </main>
  );
}
