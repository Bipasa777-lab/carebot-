"use client";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { SendHorizonal } from "lucide-react";
// import { Input } from "@/components/ui/input";

export default function ChatPage() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        const newMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Something went wrong." }]);
        }

        setLoading(false);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
            <h1>Welcome to WellnessAI Carebot! Your app is running.</h1>
        </main>
    );
}
