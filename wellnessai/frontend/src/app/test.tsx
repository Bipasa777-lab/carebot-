'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse('Error testing prompt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Test AI Prompts</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt here..."
        className="w-full p-4 border rounded resize-none h-32"
      />
      <Button onClick={handleTest} disabled={loading}>
        {loading ? 'Testing...' : 'Submit Prompt'}
      </Button>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
