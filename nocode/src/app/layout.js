'use client';
import React, { useState } from "react";
import "./globals.css";

const navItems = [
  { name: "Overview", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ), href: "/dashboard" },
  { name: "API Playground", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 18v-1a4 4 0 00-4-4H5a4 4 0 00-4 4v1" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="7" r="4" stroke="#94a3b8" strokeWidth="2"/></svg>
  ), href: "/playground" },
  { name: "Use Cases", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 3v2m6.364 1.636l-1.414 1.414M21 12h-2M17.364 17.364l-1.414-1.414M12 21v-2M6.636 17.364l1.414-1.414M3 12h2M6.636 6.636l1.414 1.414" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/></svg>
  ), href: "#" },
  { name: "Billing", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#94a3b8" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#94a3b8" strokeWidth="2"/></svg>
  ), href: "#" },
  { name: "Settings", icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Zm7.94-2.06a1 1 0 0 0 .26-1.09l-1-1.73a1 1 0 0 1 0-.88l1-1.73a1 1 0 0 0-.26-1.09l-2.12-2.12a1 1 0 0 0-1.09-.26l-1.73 1a1 1 0 0 1-.88 0l-1.73-1a1 1 0 0 0-1.09.26l-2.12 2.12a1 1 0 0 0-.26 1.09l1 1.73a1 1 0 0 1 0 .88l-1 1.73a1 1 0 0 0 .26 1.09l2.12 2.12a1 1 0 0 0 1.09.26l1.73-1a1 1 0 0 1 .88 0l1.73 1a1 1 0 0 0 1.09-.26l2.12-2.12Z" stroke="#94a3b8" strokeWidth="2"/></svg>
  ), href: "#" },
  { name: "Documentation", icon: (<img src="/file.svg" alt="doc" className="inline w-5 h-5 mr-1" />), href: "#", external: true },
  { name: "Tavily MCP", icon: (<img src="/globe.svg" alt="mcp" className="inline w-5 h-5 mr-1" />), href: "#", external: true },
];

export default function RootLayout({ children }) {
  const [workspace, setWorkspace] = useState("Personal");
  const [dropdown, setDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <html lang="en">
      <body className="antialiased bg-background">
        <div className="flex min-h-screen bg-[#f7f8fa]">
          {/* Sidebar */}
          <aside
            className={`
              fixed top-0 left-0 z-40
              w-72 bg-white shadow-xl rounded-r-3xl flex flex-col p-6
              transition-all duration-500 ease-in-out
              ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-80 opacity-0 pointer-events-none'}
              animate-slideInLeft
            `}
            style={{ minWidth: sidebarOpen ? '18rem' : '0', maxWidth: sidebarOpen ? '18rem' : '0', height: '100vh' }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 36V8" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/><path d="M20 8l-6 6" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/><path d="M20 8l6 6" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/><path d="M8 20h24" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/><path d="M32 20l-6 6" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/><path d="M32 20l-6-6" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/><path d="M20 36l6-6" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/><path d="M20 36l-6-6" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/></svg>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">no code app</span>
            </div>
            {/* Workspace Switcher */}
            <div className="mb-8">
              <button onClick={() => setDropdown(d => !d)} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold shadow transition hover:bg-blue-100 focus:outline-none">
                <span className="w-8 h-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold">V</span>
                <span>{workspace}</span>
                <svg className={`ml-auto transition-transform ${dropdown ? 'rotate-180' : ''}`} width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {dropdown && (
                <div className="absolute z-10 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 animate-fadeIn">
                  <button onClick={() => { setWorkspace('Personal'); setDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-xl">Personal</button>
                  <button onClick={() => { setWorkspace('Team'); setDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-xl">Team</button>
                </div>
              )}
            </div>
            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold text-gray-700 transition hover:bg-blue-50 group animate-fadeInLeft`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                      <span className="flex-1">{item.name}</span>
                      {item.external && (
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="ml-1 text-gray-400"><path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 19l14-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {/* User Profile */}
            <div className="mt-12 flex items-center gap-3 p-3 rounded-xl bg-blue-50">
              <span className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-lg">V</span>
              <span className="font-semibold text-gray-900 flex-1">vis sal</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-blue-100 transition">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <style jsx global>{`
              @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px);} to { opacity: 1; transform: translateX(0);} }
              .animate-slideInLeft { animation: slideInLeft 0.5s cubic-bezier(0.4,0,0.2,1); }
              @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-10px);} to { opacity: 1; transform: translateX(0);} }
              .animate-fadeInLeft { animation: fadeInLeft 0.3s; }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
          </aside>
          {/* Main content */}
          <main className="flex-1 p-8 relative"
            style={{ marginLeft: sidebarOpen ? '18rem' : '0', transition: 'margin-left 0.5s' }}
          >
            {/* Sidebar Toggle Button */}
            <button
              className="absolute top-0 left-0 z-50 mt-2 ml-2 bg-white border border-gray-200 rounded-full shadow p-2 transition hover:bg-blue-50 focus:outline-none"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
              style={{ transition: 'left 0.5s' }}
            >
              {sidebarOpen ? (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 