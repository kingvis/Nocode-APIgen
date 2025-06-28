'use client';
import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import CreateApiKeyModal from "./CreateApiKeyModal";
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from "./apiKeysService";

export default function DashboardOverview() {
  const [payg, setPayg] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [showKey, setShowKey] = useState({});
  const [copyFeedback, setCopyFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "success" });

  function showNotification(message, type = "success") {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "success" }), 2500);
  }

  useEffect(() => {
    setLoading(true);
    fetchApiKeys().then(({ data, error }) => {
      if (error) setError(error.message);
      else setApiKeys(data || []);
      setLoading(false);
    });
  }, []);

  const handleShow = id => setShowKey(k => ({ ...k, [id]: !k[id] }));
  const handleCopy = (id, key) => {
    navigator.clipboard.writeText(key);
    setCopyFeedback(f => ({ ...f, [id]: true }));
    setTimeout(() => setCopyFeedback(f => ({ ...f, [id]: false })), 1200);
    showNotification("API Key copied to clipboard!", "success");
  };
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this API key?')) return;
    setLoading(true);
    const { error } = await deleteApiKey(id);
    if (error) setError(error.message);
    else {
      setApiKeys(keys => keys.filter(k => k.id !== id));
      showNotification("API Key deleted successfully!", "delete");
    }
    setLoading(false);
  };
  const handleCreateOrEdit = async newKey => {
    setLoading(true);
    setError("");
    if (editKey) {
      // Update
      const { error, data } = await updateApiKey(newKey.id, {
        name: newKey.name,
        type: newKey.type,
        usage: newKey.usage,
        key: newKey.key,
        limit: newKey.limit || null,
      });
      if (error) setError(error.message);
      else {
        setApiKeys(keys => keys.map(k => k.id === newKey.id ? { ...data[0] } : k));
        showNotification("API Key updated successfully!", "edit");
      }
    } else {
      // Create
      const { error, data } = await createApiKey({
        name: newKey.name,
        type: newKey.type,
        usage: newKey.usage,
        key: newKey.key,
        limit: newKey.limit || null,
      });
      if (error) setError(error.message);
      else {
        setApiKeys(keys => [...keys, data[0]]);
        showNotification("API Key created successfully!", "success");
      }
    }
    setEditKey(null);
    setShowCreate(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center py-10 px-2 bg-gradient-to-br from-[#e0e7ff] via-[#fbc2eb] to-[#a1c4fd] animate-bgMove">
      {/* Floating SVGs for background */}
      <svg className="absolute left-[-80px] top-[-80px] w-64 h-64 opacity-30 animate-float-slow z-0" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="100" fill="#6366f1" /></svg>
      <svg className="absolute right-[-100px] bottom-[-100px] w-80 h-80 opacity-20 animate-float-fast z-0" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="100" fill="#fbc2eb" /></svg>
      {/* Breadcrumb */}
      <div className="w-full max-w-5xl mb-4 text-sm text-gray-400 flex items-center gap-2 z-10">
        <span>Pages</span> <span>/</span> <span className="text-gray-600 font-semibold">Overview</span>
      </div>
      {/* Header */}
      <h1 className="w-full max-w-5xl text-4xl font-extrabold text-gray-900 mb-8 z-10 animate-slideDown">Overview</h1>
      {/* Plan Card */}
      <div className="w-full max-w-5xl rounded-3xl shadow-xl mb-8 p-0 overflow-hidden bg-gradient-to-br from-[#e0e7ff] via-[#fbc2eb] to-[#a1c4fd] relative animate-float-card">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 pointer-events-none animate-shimmer" />
        <div className="p-8 pb-4 flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div>
            <span className="inline-block bg-white/60 text-xs font-semibold text-gray-700 px-3 py-1 rounded mb-2 animate-fadeIn">CURRENT PLAN</span>
            <div className="text-5xl font-extrabold text-gray-900 mb-2 animate-gradientText bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Research<span className="bg-gray-300/60 px-2 ml-1 rounded">er</span></div>
            <div className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2">
              API Usage <span className="text-gray-400 cursor-pointer" title="API usage info">ⓘ</span>
            </div>
            <div className="text-gray-700 mb-2">Plan</div>
            <div className="w-full max-w-md h-2 bg-white/60 rounded-full mb-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-progressBar" style={{ width: '0%' }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">0/1,000 Credits</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" checked={payg} onChange={() => setPayg(v => !v)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300" style={{ left: payg ? '1.25rem' : '0', boxShadow: payg ? '0 0 12px #6366f1' : 'none' }} />
                  <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300" />
                </span>
                <span className="text-gray-700 font-medium">Pay as you go</span>
                <span className="text-gray-400 cursor-pointer" title="Pay as you go info">ⓘ</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-end mt-6 md:mt-0">
            <button className="bg-white/60 hover:bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg shadow transition flex items-center gap-2 transform hover:scale-105 hover:shadow-2xl duration-200 animate-fadeIn">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M16 10v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/><path d="M8 10v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
              Manage Plan
            </button>
          </div>
        </div>
      </div>
      {/* API Keys Section */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 z-10 animate-fadeInUp">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
          <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-2xl font-bold text-blue-500 hover:bg-blue-100 transform hover:scale-110 transition duration-200 shadow hover:shadow-xl" onClick={() => { setShowCreate(true); setEditKey(null); }} disabled={loading}>+</button>
        </div>
        <div className="text-gray-500 mb-4 text-sm">
          The key is used to authenticate your requests to the Research API. To learn more, see the <a href="#" className="underline">documentation page</a>.
        </div>
        {error && <div className="mb-4 text-red-500 font-semibold animate-shakeX">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center py-10"><span className="loader mr-2"></span> Loading...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Usage</th>
                <th className="py-2 px-4">Key</th>
                <th className="py-2 px-4 text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((k, i) => (
                <tr key={k.id} className={`border-b border-gray-100 hover:bg-blue-50 transition duration-200 animate-fadeInRow`} style={{ animationDelay: `${i * 60}ms` }}>
                  <td className="py-2 px-4 font-semibold text-gray-900">{k.name}</td>
                  <td className="py-2 px-4"><span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{k.type}</span></td>
                  <td className="py-2 px-4">{k.usage}</td>
                  <td className="py-2 px-4">
                    <span className="bg-gray-100 px-3 py-1 rounded font-mono tracking-wider text-gray-700 select-all">
                      {showKey[k.id] ? k.key : k.key.replace(/.(?=.{4})/g, '*')}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center flex gap-2 items-center justify-center">
                    <button title="Show" className="hover:text-blue-600 transform hover:scale-125 transition duration-150" onClick={() => handleShow(k.id)} disabled={loading}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                    </button>
                    <button title="Copy" className="hover:text-blue-600 transform hover:scale-125 transition duration-150" onClick={() => handleCopy(k.id, k.key)} disabled={loading}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                      {copyFeedback[k.id] && <span className="ml-1 text-xs text-green-600 animate-pulse">Copied!</span>}
                    </button>
                    <button title="Edit" className="hover:text-blue-600 transform hover:scale-125 transition duration-150" onClick={() => { setEditKey(k); setShowCreate(true); }} disabled={loading}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button title="Delete" className="hover:text-red-600 transform hover:scale-125 transition duration-150" onClick={() => handleDelete(k.id)} disabled={loading}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
      <CreateApiKeyModal
        open={showCreate}
        onClose={() => { setShowCreate(false); setEditKey(null); }}
        onCreate={handleCreateOrEdit}
        editKey={editKey}
        loading={loading}
      />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "success" })} />
      <style jsx global>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bgMove {
          background-size: 200% 200%;
          animation: bgMove 12s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(1.08); }
        }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        @keyframes shimmer {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .animate-shimmer { animation: shimmer 2.5s linear infinite; }
        @keyframes float-card {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-card { animation: float-card 5s ease-in-out infinite; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1); }
        @keyframes fadeInRow {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInRow { animation: fadeInRow 0.5s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.7s cubic-bezier(0.4,0,0.2,1); }
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradientText {
          background-size: 200% 200%;
          animation: gradientText 4s ease-in-out infinite;
        }
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 80%; }
        }
        .animate-progressBar { animation: progressBar 2s cubic-bezier(0.4,0,0.2,1) forwards; }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shakeX { animation: shakeX 0.5s; }
      `}</style>
    </div>
  );
} 