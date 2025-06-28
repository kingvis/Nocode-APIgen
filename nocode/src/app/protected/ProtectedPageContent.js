'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Notification from '../dashboard/Notification';
import { fetchApiKeys } from '../dashboard/apiKeysService';

export default function ProtectedPageContent() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get('apiKey') || '';
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function validateKey() {
      if (!apiKey) {
        setNotification({ message: 'No API Key provided', type: 'delete' });
        setChecked(true);
        setIsValid(false);
        return;
      }
      // Fetch all API keys and check if the provided key exists
      const { data, error } = await fetchApiKeys();
      if (error) {
        setNotification({ message: 'Error validating API Key', type: 'delete' });
        setChecked(true);
        setIsValid(false);
        return;
      }
      const found = (data || []).some(k => k.key === apiKey);
      if (found) {
        setNotification({ message: 'Valid API key, /protected can be accessed', type: 'success' });
        setIsValid(true);
      } else {
        setNotification({ message: 'Invalid API Key', type: 'delete' });
        setIsValid(false);
      }
      setChecked(true);
    }
    validateKey();
  }, [apiKey]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-pink-100 to-red-100 animate-bgMove">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1); }
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bgMove {
          background-size: 200% 200%;
          animation: bgMove 12s ease-in-out infinite;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8) rotateY(60deg); }
          to { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        .animate-popIn { animation: popIn 1s cubic-bezier(0.4,0,0.2,1); }
        @keyframes float3d {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(20deg); }
        }
        .animate-float3d { animation: float3d 3s ease-in-out infinite; }
        @keyframes shine {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .animate-shine { animation: shine 2.5s linear infinite; }
      `}</style>
      {checked && isValid ? (
        <div className="flex flex-col items-center justify-center animate-fadeInUp">
          {/* 3D Animated SVG Trophy */}
          <div className="relative w-64 h-64 mb-8 animate-popIn">
            <svg className="absolute inset-0 w-full h-full animate-float3d" viewBox="0 0 256 256" fill="none">
              <ellipse cx="128" cy="220" rx="80" ry="18" fill="#e0e7ff" opacity="0.5" />
              <g filter="url(#glow)">
                <path d="M128 32c-44 0-80 36-80 80 0 36 24 66 56 76v20a24 24 0 0048 0v-20c32-10 56-40 56-76 0-44-36-80-80-80z" fill="url(#trophyGradient)"/>
                <ellipse cx="128" cy="112" rx="60" ry="60" fill="#fff" fillOpacity="0.1"/>
              </g>
              <defs>
                <radialGradient id="trophyGradient" cx="0" cy="0" r="1" gradientTransform="rotate(90 0 128) scale(128)" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbc2eb"/>
                  <stop offset="0.5" stopColor="#a1c4fd"/>
                  <stop offset="1" stopColor="#6366f1"/>
                </radialGradient>
                <filter id="glow" x="0" y="0" width="256" height="256" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="8" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            {/* Shine effect */}
            <svg className="absolute left-1/4 top-1/4 w-24 h-24 animate-shine" viewBox="0 0 64 64" fill="none">
              <ellipse cx="32" cy="32" rx="24" ry="8" fill="#fff" fillOpacity="0.3"/>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 mb-4 animate-fadeInUp">Welcome to the Protected Playground!</h2>
          <p className="text-lg text-gray-700 mb-6 animate-fadeInUp">Your API key is valid. Enjoy exploring the features and endpoints available to you.</p>
          <div className="flex gap-4 mt-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-200 animate-fadeInUp">Get Started</button>
            <button className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-200 animate-fadeInUp">API Docs</button>
          </div>
        </div>
      ) : checked ? (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: 'success' })} />
      ) : (
        <div className="text-gray-500 animate-fadeInUp">Validating API Key...</div>
      )}
    </div>
  );
} 