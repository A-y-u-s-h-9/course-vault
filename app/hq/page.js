import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import HQFileRow from './HQFileRow'; 

export const dynamic = 'force-dynamic';

export default async function HQPage() {
  // Fetch files
  const { data: materials } = await supabase.from('materials').select('*').order('created_at', { ascending: false });
  const pending = materials?.filter(m => m.status === 'pending') || [];
  const approved = materials?.filter(m => m.status === 'approved') || [];

  // Fetch active dooms
  const { data: dooms } = await supabase.from('dooms').select('*').order('created_at', { ascending: true });

  // SECURE SERVER ACTION (Handles files AND dooms)
  async function handleAction(formData) {
    "use server";
    const secretKey = formData.get('secretKey');
    const actionType = formData.get('actionType');

    // Password Check
    if (secretKey !== process.env.VAULT_SECRET_KEY) return; 

    // --- MATERIAL ACTIONS ---
    const id = formData.get('id');
    if (actionType === 'approve') {
      await supabase.from('materials').update({ status: 'approved' }).eq('id', id);
    } else if (actionType === 'reject' || actionType === 'delete') {
      const filePath = formData.get('filePath');
      await supabase.storage.from('vault').remove([filePath]);
      await supabase.from('materials').delete().eq('id', id);
    } else if (actionType === 'edit') {
      await supabase.from('materials').update({ 
        title: formData.get('title'), 
        subject: formData.get('subject'),
        category: formData.get('category') 
      }).eq('id', id);
    } 
    // --- DOOM ACTIONS ---
    else if (actionType === 'add_doom') {
      await supabase.from('dooms').insert([{
        title: formData.get('title'),
        subject: formData.get('subject'),
        date_string: formData.get('date_string'),
        type: formData.get('type'),
        severity: formData.get('severity')
      }]);
    } else if (actionType === 'delete_doom') {
      await supabase.from('dooms').delete().eq('id', id);
    }

    revalidatePath('/', 'layout'); // Refresh everything instantly
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* BACK BUTTON (Moved to the top) */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Flee to Safety
        </Link>

        {/* HEADER (Removed flex layout) */}
        <header className="mb-12 border-b-2 border-stone-900 dark:border-stone-700 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-bold tracking-widest uppercase rounded-sm mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Judgement Room
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">Vault Headquarters</h1>
          <p className="text-stone-600 dark:text-stone-400 font-medium">Decide the fate of uploads and manage the radar.</p>
        </header>

        {/* --- FILE MANAGEMENT GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-black tracking-wide uppercase mb-6 flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
              Awaiting Judgement ({pending.length})
            </h2>
            <div className="space-y-3">
              {pending.map(file => <HQFileRow key={file.id} file={file} serverAction={handleAction} />)}
              {pending.length === 0 && <p className="text-sm text-stone-500 italic">No one is currently trying to bypass the system.</p>}
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-black tracking-wide uppercase mb-6 flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              Approved & Live ({approved.length})
            </h2>
            <div className="space-y-3">
              {approved.map(file => <HQFileRow key={file.id} file={file} serverAction={handleAction} />)}
              {approved.length === 0 && <p className="text-sm text-stone-500 italic">The vault is completely empty.</p>}
            </div>
          </div>
        </div>

        {/* --- RADAR CONTROL SECTION --- */}
        <div className="bg-red-50 dark:bg-red-950/10 border-2 border-red-200 dark:border-red-900/30 p-6 md:p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-red-900 dark:text-red-400">
            📡 Radar Control (Doom Deployment)
          </h2>
          
          <form action={handleAction} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <input type="hidden" name="actionType" value="add_doom" />
            
            <input type="text" name="title" placeholder="Title (e.g. EM Theory Final)" required className="p-3 text-sm border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-stone-900 focus:outline-none" />
            <select name="subject" required defaultValue="" className="p-3 text-sm border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-stone-900 focus:outline-none text-stone-700 dark:text-stone-300">
                <option value="" disabled>Select Subject...</option>
                <option value="Analog & Digital Comm">Analog & Digital Comm</option>
                <option value="Digital Signal Processing">Digital Signal Processing</option>
                <option value="EM Theory">EM Theory</option>
                <option value="Control Systems">Control Systems</option>
                <option value="Numerical Methods">Numerical Methods</option>
                <option value="Electronic Devices">Electronic Devices</option>
                <option value="Environmental Sciences">Environmental Sciences</option>
                <option value="All Subjects">All Subjects / General</option>
            </select>
            <input type="text" name="date_string" placeholder="When? (e.g. Fri, 11:59 PM)" required className="p-3 text-sm border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-stone-900 focus:outline-none" />
            
            <select name="type" className="p-3 text-sm border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-stone-900 focus:outline-none">
              <option value="Submission">Submission</option>
              <option value="Exam">Exam</option>
              <option value="Lab Viva">Lab Viva</option>
            </select>
            
            <select name="severity" className="p-3 text-sm border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-stone-900 focus:outline-none">
              <option value="medium">Medium (Annoying)</option>
              <option value="high">High (Stressful)</option>
              <option value="critical">Critical (Panic)</option>
            </select>

            <div className="md:col-span-5 flex gap-4 mt-2">
              <input type="password" name="secretKey" placeholder="Master Key..." required className="w-1/3 p-3 text-sm border border-red-200 dark:border-red-900/50 rounded-lg bg-white dark:bg-stone-900 focus:outline-none" />
              <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">
                Broadcast New Doom
              </button>
            </div>
          </form>

          {/* List of Active Dooms to Delete */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-red-800 dark:text-red-400 uppercase tracking-wider mb-4 border-b border-red-200 dark:border-red-900/30 pb-2">Active Targets on Radar</h3>
            {dooms?.map(doom => (
              <div key={doom.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-stone-900 border border-red-100 dark:border-red-900/20 rounded-lg">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">{doom.title}</h4>
                  <p className="text-xs text-stone-500">{doom.subject} • {doom.date_string}</p>
                </div>
                <form action={handleAction} className="flex items-center gap-2 mt-3 sm:mt-0">
                  <input type="hidden" name="actionType" value="delete_doom" />
                  <input type="hidden" name="id" value={doom.id} />
                  <input type="password" name="secretKey" placeholder="Key..." required className="w-24 px-2 py-1.5 text-xs border border-stone-300 dark:border-stone-700 rounded bg-transparent focus:outline-none" />
                  <button type="submit" className="px-3 py-1.5 text-xs font-bold text-green-700 bg-green-100 rounded hover:bg-green-200">
                    Target Survived (Delete)
                  </button>
                </form>
              </div>
            ))}
            {(!dooms || dooms.length === 0) && <p className="text-sm text-stone-500 italic">No dooms on radar. Enjoy the peace while it lasts.</p>}
          </div>
        </div>

      </div>
    </main>
  );
}