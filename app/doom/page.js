import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default async function DoomPage() {
  // Fetch live dooms directly from the database
  const { data: impendingDoom } = await supabase
    .from('dooms')
    .select('*')
    .order('created_at', { ascending: true }); // Oldest threats first

  const activeDooms = impendingDoom || [];

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Retreat to Hub
        </Link>

        <header className="mb-16 border-b-2 border-red-900/20 dark:border-red-900/50 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-bold tracking-widest uppercase rounded-sm mb-6 animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Impending Doom
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-red-950 dark:text-red-50">
            The Radar
          </h1>
          <p className="text-stone-600 dark:text-stone-400 font-medium text-lg">
            A comprehensive, live-updating list of everything we are currently procrastinating on.
          </p>
        </header>

        <div className="space-y-6">
          {activeDooms.map((doom) => (
            <div key={doom.id} className={`p-6 md:p-8 rounded-2xl border-2 transition-all shadow-sm ${
              doom.severity === 'critical' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' : 
              doom.severity === 'high' ? 'bg-orange-50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-900/30' :
              'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
            }`}>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-sm ${
                      doom.type === 'Exam' ? 'bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}>
                      {doom.type}
                    </span>
                    <span className="text-sm font-bold text-stone-500">{doom.subject}</span>
                  </div>
                  <h3 className="text-2xl font-black">{doom.title}</h3>
                </div>
                
                <div className="text-left md:text-right">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Deadline</p>
                  <p className={`text-xl font-black ${
                    doom.severity === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-stone-900 dark:text-stone-100'
                  }`}>
                    {doom.date_string}
                  </p>
                </div>
              </div>

            </div>
          ))}

          {activeDooms.length === 0 && (
            <div className="text-center py-20 text-stone-400 dark:text-stone-600 font-medium border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
              Radar is completely clear. Go back to sleep.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}