"use client";
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; 

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('analog-and-digital-communication');
  const [category, setCategory] = useState('notes');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { alert("Please select a file."); return; }

    // THE BOUNCER: 20MB Limit (20 * 1024 * 1024 bytes)
    if (file.size > 20 * 1048576) {
      alert("Hold up. This file is over 20MB. Compress your PDFs, we are on a free tier!");
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${subject}/${fileName}`; 

      const { error: uploadError } = await supabase.storage.from('vault').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from('materials').insert([{
        title: title,
        subject: subject,
        category: category,
        file_path: filePath,
        file_type: fileExt.toUpperCase(),
      }]);

      if (dbError) throw dbError;

      alert("Success! Material uploaded and sent to HQ for judgement.");
      setTitle(''); setFile(null); e.target.reset(); 

    } catch (error) {
      console.error('Upload failed:', error);
      alert("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Back to Hub
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-stone-950 dark:text-white mb-2">Upload Material</h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Contribute to the vault. All uploads are reviewed before going public.</p>
        </header>

        <form onSubmit={handleUpload} className="bg-white dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">File Title</label>
              <input type="text" placeholder="e.g. Lab 4 Final" className="w-full bg-[#F9F9F8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">Subject</label>
              <select className="w-full bg-[#F9F9F8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="analog-and-digital-communication">Analog & Digital Communication</option>
                <option value="digital-signal-processing">Digital Signal Processing</option>
                <option value="em-theory-and-transmission-lines">EM Theory & Transmission Lines</option>
                <option value="control-systems">Control Systems</option>
                <option value="advanced-numerical-methods">Advanced Numerical Methods</option>
                <option value="electronic-devices">Electronic Devices</option>
                <option value="environmental-sciences">Environmental Sciences</option>
                <option value="all-subjects">All Subjects / General</option> {/* NEW */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">Category</label>
              <select className="w-full bg-[#F9F9F8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-3 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="holy-text">📜 Official / Holy Text (Pinned)</option>
                <option value="lab-report">Lab Report</option>
                <option value="lab-output">Lab Output/Code</option>
                <option value="assignment">Assignment</option>
                <option value="notes">Notes/Lecture Material</option>
                <option value="exam-prep">Exam Prep / PYQ</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">File</label>
            <input type="file" className="w-full text-stone-500 dark:text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-700 dark:file:text-stone-300 hover:file:bg-stone-200 transition-colors cursor-pointer" onChange={(e) => setFile(e.target.files[0])} required />
          </div>

          <button type="submit" disabled={isUploading} className="w-full mt-4 font-bold py-3 px-4 rounded-lg transition-all shadow-md flex items-center justify-center bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-stone-50 dark:text-stone-900 disabled:opacity-50">
            {isUploading ? 'Uploading...' : 'Submit to Vault'}
          </button>
        </form>
      </div>
    </main>
  );
}