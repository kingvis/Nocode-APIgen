'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('API Key is required');
      return;
    }
    setError('');
    // Redirect to /protected with apiKey as query param
    router.push(`/protected?apiKey=${encodeURIComponent(apiKey.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 animate-bgMove">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadeInUp">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">API Playground</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-semibold text-gray-700">Enter your API Key:</label>
          <input
            type="text"
            className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
            required
          />
          {error && <div className="text-red-500 text-sm font-semibold animate-shakeX">{error}</div>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-full shadow transition text-lg mt-2">Submit</button>
        </form>
      </div>
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1); }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shakeX { animation: shakeX 0.5s; }
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bgMove {
          background-size: 200% 200%;
          animation: bgMove 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 