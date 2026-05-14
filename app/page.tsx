"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch on the toggle icon
  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto relative">
        
        
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="absolute top-0 right-0 p-3 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            )}
          </button>
        )}

        
        <header className="mb-20 border-b-2 border-stone-900 dark:border-stone-700 pb-12 mt-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-bold tracking-widest uppercase rounded-sm transition-colors">
              ECE 2nd Year (Probably)
            </span>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-bold tracking-widest uppercase rounded-sm transition-colors">
              Last Night Study Specialist
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-stone-950 dark:text-white mb-6 leading-none transition-colors">
            Ar Chaap <br /> Newa Jacche Na.
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-medium transition-colors">
            The official archive of lab reports we did in a hurry, assignments we definitely copied, and notes we didn't look at until 3 AM last night.
            <span className="text-stone-400 dark:text-stone-600"> Pls just let us pass.</span>
          </p>
          
          
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link href="/admin" className="px-6 py-3 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-50 dark:text-stone-900 font-bold rounded-lg transition-all shadow-md flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Admin Entry (Do Not Click)
            </Link>

            <Link href="/squad" className="px-6 py-3 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-950 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
              📸 Meet the Chaap Association
            </Link>
          </div>
        </header>

        
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-black tracking-widest uppercase text-stone-400 dark:text-stone-500">Active ECE Lab Archives</h2>
            <span className="text-xs text-stone-300 dark:text-stone-600 italic">Material added minutes before the deadline...</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            
            <Link href="/subjects/analog-and-digital-communication" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Analog & Digital Comm</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">PSPICE circuits we hope don't explode</p>
            </Link>

            <Link href="/subjects/digital-signal-processing" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Digital Signal Processing</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">MATLAB scripts that mostly work</p>
            </Link>

            <Link href="/subjects/microcontrollers" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M12 16h.01M4 8h.01M4 12h.01M4 16h.01M12 4v1m0 11v3"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Microcontrollers</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Arduino code we copied from Instructables</p>
            </Link>

            <Link href="/subjects/control-systems" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Control Systems</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Bode plots drawn with extreme anxiety</p>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}