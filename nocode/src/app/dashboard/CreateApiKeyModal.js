'use client';
import React, { useState, useEffect } from "react";

export default function CreateApiKeyModal({ open, onClose, onCreate, editKey, loading }) {
  const isEdit = !!editKey;
  const [name, setName] = useState(editKey?.name || "");
  const [type, setType] = useState(editKey?.type || "dev");
  const [limitEnabled, setLimitEnabled] = useState(!!editKey?.limit);
  const [limit, setLimit] = useState(editKey?.limit || "");

  useEffect(() => {
    if (open) {
      setName(editKey?.name || "");
      setType(editKey?.type || "dev");
      setLimitEnabled(!!editKey?.limit);
      setLimit(editKey?.limit || "");
    }
  }, [open, editKey]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">{isEdit ? 'Edit API key' : 'Create a new API key'}</h2>
        <p className="mb-6 text-gray-500 text-center">Enter a name and limit for the {isEdit ? 'API key' : 'new API key'}.</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!name.trim()) return;
            onCreate({
              ...(isEdit ? { id: editKey.id } : {}),
              name: name.trim(),
              type,
              usage: editKey?.usage || 0,
              key: editKey?.key || `${type === "dev" ? "tvly-dev-" : "tvly-prod-"}${Math.random().toString(36).slice(2, 18)}****************`,
              limit: limitEnabled ? limit : null,
            });
            onClose();
          }}
        >
          <label className="block mb-2 font-medium text-gray-700">Key Name <span className="text-xs font-normal text-gray-400">— A unique name to identify this key</span></label>
          <input
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Key Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label className="block mb-2 font-medium text-gray-700">Key Type <span className="text-xs font-normal text-gray-400">— Choose the environment for this key</span></label>
          <div className="flex gap-4 mb-4">
            <label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition ${type === "dev" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}` }>
              <input type="radio" className="mr-2 accent-blue-500" checked={type === "dev"} onChange={() => setType("dev")}/>
              <span className="font-bold text-gray-800">Development</span>
              <div className="text-xs text-gray-500 mt-1">Rate limited to 100 requests/minute</div>
            </label>
            <label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition ${type === "prod" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}` }>
              <input type="radio" className="mr-2 accent-blue-500" checked={type === "prod"} onChange={() => setType("prod")}/>
              <span className="font-bold text-gray-800">Production</span>
              <div className="text-xs text-gray-500 mt-1">Rate limited to 1,000 requests/minute</div>
            </label>
          </div>
          <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
            <input type="checkbox" checked={limitEnabled} onChange={() => setLimitEnabled(v => !v)} className="accent-blue-500" />
            <span className="text-gray-700 font-medium">Limit monthly usage*</span>
          </label>
          <input
            className="w-full mb-2 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition disabled:opacity-50"
            placeholder="1000"
            type="number"
            min="1"
            value={limit}
            onChange={e => setLimit(e.target.value)}
            disabled={!limitEnabled}
          />
          <div className="text-xs text-gray-400 mb-4">* If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.</div>
          <div className="flex gap-4 mt-6 justify-center">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-full shadow transition text-lg" disabled={loading}>{isEdit ? 'Save' : 'Create'}</button>
            <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-8 py-2 rounded-full shadow transition text-lg" onClick={onClose} disabled={loading}>Cancel</button>
          </div>
        </form>
      </div>
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.3s; }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </div>
  );
} 