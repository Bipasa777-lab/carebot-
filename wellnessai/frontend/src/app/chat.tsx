import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";

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
            <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-blue-700">WellnessAI – Your Medical Assistant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ScrollArea className="h-96 p-2 border rounded-lg bg-gray-50">
                        <div className="space-y-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded-xl w-fit max-w-xs ${msg.sender === "user" ? "ml-auto bg-blue-100 text-right" : "bg-green-100 text-left"
                                        }`}
                                >
                                    <p className="text-sm text-gray-700 whitespace-pre-line">{msg.text}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="flex gap-2">
                        <Textarea
                            className="flex-1 resize-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your medical query..."
                        />
                        <Button onClick={handleSend} disabled={loading}>
                            <SendHorizonal className="h-4 w-4 mr-1" /> Send
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
