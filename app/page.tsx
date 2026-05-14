"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // NEW: We need to talk to the database

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [doomCount, setDoomCount] = useState(0); // NEW: State to hold the number of dooms

  useEffect(() => {
    setMounted(true);

    // NEW: Sneakily check the radar the second the page loads
    const fetchDoomCount = async () => {
      const { count } = await supabase
        .from('dooms')
        .select('*', { count: 'exact', head: true });
      
      if (count) setDoomCount(count);
    };

    fetchDoomCount();
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300 relative">
      <div className="max-w-5xl mx-auto relative">
        
        {/* THEME TOGGLE */}
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

        {/* HEADER */}
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
            Ar CHAAP <br /> Newa Jacche NA.
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-medium transition-colors">
            The official archive of lab reports we did in a hurry, assignments we definitely copied, and notes we didn't look at until 3 AM last night.
            <span className="text-stone-400 dark:text-stone-600"> Pls just let us pass.</span>
          </p>
          
          {/* ACTION BUTTONS */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link href="/admin" className="px-6 py-3 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-50 dark:text-stone-900 font-bold rounded-lg transition-all shadow-md flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Upload Material (No Trash Pls)
            </Link>

            <a href="#archives" className="px-6 py-3 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-950 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
              Browse Archives ↓
            </a>

            {/* UPDATED DOOM RADAR BUTTON */}
            <Link href="/doom" className="relative px-6 py-3 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-900/50 font-bold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Doom Radar
              
              {/* THE ANXIETY BADGE */}
              {doomCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white shadow-md animate-bounce border-2 border-[#F9F9F8] dark:border-stone-950">
                  {doomCount}
                </span>
              )}
            </Link>

            <Link href="/squad" className="px-6 py-3 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-950 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2 text-sm">
              📸 Meet the Chaap Association
            </Link>
          </div>
        </header>

        {/* SUBJECT ARCHIVES GRID */}
        <section id="archives" className="scroll-mt-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-black tracking-widest uppercase text-stone-400 dark:text-stone-500">Active ECE Subject Archives</h2>
            <span className="text-xs text-stone-300 dark:text-stone-600 italic">Material added minutes before the deadline...</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* NEW ALL SUBJECTS CARD */}
            <Link href="/subjects/all-subjects" className="block p-6 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/40 rounded-xl hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all group relative overflow-hidden md:col-span-2 lg:col-span-3">
              <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-amber-900 dark:text-amber-100 group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="font-black text-xl mb-2 text-amber-950 dark:text-amber-50 pr-8">All Subjects / General Vault</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">Syllabus, Academic Calendar, and universal survival guides.</p>
            </Link>
            
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

            <Link href="/subjects/em-theory-and-transmission-lines" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">EM Theory</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Magic equations no one understands</p>
            </Link>

            <Link href="/subjects/control-systems" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Control Systems</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Bode plots drawn with extreme anxiety</p>
            </Link>

             <Link href="/subjects/advanced-numerical-methods" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Numerical Methods</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Math we already forgot from Sem 1</p>
            </Link>

            <Link href="/subjects/electronic-devices" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3V2m6 1v1m-6 18v1m6-1v1M4 9H3m18 0h-1M4 15H3m18 0h-1m-4-6v6H9V9h6z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Electronic Devices</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Memorizing semiconductor physics at 2 AM</p>
            </Link>

            <Link href="/subjects/environmental-sciences" className="block p-6 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-lg transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-5 text-stone-900 dark:text-white group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-stone-950 dark:text-stone-100 pr-8">Environmental Sciences</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Why is this even in our syllabus?</p>
            </Link>

          </div>
        </section>

      </div>

      {/* FLOATING HQ BUTTON */}
      <Link href="/hq" className="fixed bottom-8 right-8 w-14 h-14 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group z-50 border border-stone-700 dark:border-stone-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        <span className="absolute right-16 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Level 5 Clearance
        </span>
      </Link>
    </main>
  );
}