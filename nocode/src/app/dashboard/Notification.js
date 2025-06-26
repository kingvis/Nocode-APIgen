'use client';
import React from "react";

export default function Notification({ message, onClose, type = "success" }) {
  if (!message) return null;
  let bgColor = "bg-green-600";
  if (type === "delete") bgColor = "bg-red-600";
  if (type === "edit") bgColor = "bg-yellow-400 text-gray-900";
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fadeIn ${type === "edit" ? "text-gray-900" : ""}`}>
        <span>{message}</span>
        <button onClick={onClose} className={`ml-2 font-bold text-lg hover:text-gray-200 ${type === "edit" ? "text-gray-900 hover:text-gray-700" : "text-white"}`}>×</button>
      </div>
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.3s; }
      `}</style>
    </div>
  );
} 