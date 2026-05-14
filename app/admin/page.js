"use client";
import { useState } from 'react';
import Link from 'next/link';
// import { supabase } from '@/lib/supabase'; // Make sure your supabase import is uncommented!

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('analog-and-digital-communication');

  const handleUpload = async (e) => {
    e.preventDefault();
    alert("Upload triggered! (Connect your Supabase logic here)");
    // Your existing Supabase upload code goes here
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Flee to Safety
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-bold tracking-widest uppercase rounded-sm mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Restricted Access
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-stone-950 dark:text-white mb-2">
            Upload Material
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium">
            If you are uploading this at 11:59 PM, Godspeed to you.
          </p>
        </header>

        <form onSubmit={handleUpload} className="bg-white dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">File Title</label>
            <input 
              type="text" 
              placeholder="e.g. Lab 4 (Working final copy 2)"
              className="w-full bg-[#F9F9F8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-400 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">Subject Archive</label>
            <select 
              className="w-full bg-[#F9F9F8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-400 transition-colors"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="analog-and-digital-communication">Analog & Digital Communication</option>
              <option value="digital-signal-processing">Digital Signal Processing</option>
              <option value="microcontrollers">Microcontrollers</option>
              <option value="control-systems">Control Systems</option>
              <option value="em-theory-and-transmission-lines">EM Theory & Transmission Lines</option>
              <option value="advanced-numerical-methods">Advanced Numerical Methods</option>
              <option value="electronic-devices">Electronic Devices</option>
              <option value="environmental-sciences">Environmental Sciences</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">File</label>
            <input 
              type="file" 
              className="w-full text-stone-500 dark:text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-700 dark:file:text-stone-300 hover:file:bg-stone-200 dark:hover:file:bg-stone-700 transition-colors cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-50 dark:text-stone-900 font-bold py-3 px-4 rounded-lg transition-all shadow-md"
          >
            Deploy to Vault
          </button>
        </form>

      </div>
    </main>
  );
}