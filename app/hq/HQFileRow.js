"use client";
import { useState, useEffect } from 'react';

export default function HQFileRow({ file, serverAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false); // NEW: Loading state
  const [codeContent, setCodeContent] = useState('');

  const getFileTypeCategory = (ext) => {
    const e = ext.toLowerCase();
    if (['pdf'].includes(e)) return 'pdf';
    if (['png', 'jpg', 'jpeg'].includes(e)) return 'image';
    if (['txt', 'm', 'c', 'cpp', 'py', 'js', 'ino'].includes(e)) return 'code';
    return 'unknown';
  };

  const handlePreviewOpen = () => {
    setShowPreview(true);
    setLoadingPreview(true);
    // If it's a PDF or Image, the browser handles loading via iframe/img onload.
    // For code, we fetch manually.
  };

  useEffect(() => {
    if (showPreview && getFileTypeCategory(file.file_type) === 'code') {
      fetch(file.publicUrl)
        .then(res => res.text())
        .then(text => {
          setCodeContent(text);
          setLoadingPreview(false); // Stop loading when text arrives
        })
        .catch(() => {
          setCodeContent("Error loading code preview.");
          setLoadingPreview(false);
        });
    }
  }, [showPreview, file]);

  return (
    <div className="group border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors">
      <form action={serverAction} className="p-3">
        <input type="hidden" name="id" value={file.id} />
        <input type="hidden" name="filePath" value={file.file_path} />

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className={`w-2 h-2 rounded-full shrink-0 ${file.status === 'pending' ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold truncate text-stone-900 dark:text-stone-200">{file.title}</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 border border-stone-200 dark:border-stone-700 uppercase">
                {file.file_type}
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest truncate">{file.subject.replaceAll('-', ' ')}</p>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="password" 
              name="secretKey" 
              placeholder="KEY" 
              required 
              className="w-16 px-2 py-1 text-[10px] border border-stone-200 dark:border-stone-800 rounded bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-mono"
            />

            <div className="flex items-center gap-1.5 ml-2">
              {/* VIEW BUTTON WITH LOADING TRIGGER */}
              <button 
                type="button" 
                onClick={handlePreviewOpen} 
                className="p-1.5 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-all active:scale-90" 
                title="View"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>

              <button 
                type="button" 
                onClick={() => setIsEditing(!isEditing)} 
                className={`p-1.5 rounded transition-all active:scale-90 ${isEditing ? 'text-white bg-indigo-600 shadow-sm' : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>

              {file.status === 'pending' && (
                <button type="submit" name="actionType" value="approve" className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase rounded transition-all">
                  Approve
                </button>
              )}

              <button type="submit" name="actionType" value="delete" className="p-1.5 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 p-3 bg-indigo-50/30 dark:bg-indigo-900/10 rounded border border-indigo-100 dark:border-indigo-800/50 grid grid-cols-1 sm:grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-1">
            <input type="text" name="title" defaultValue={file.title} className="p-2 text-xs border border-indigo-200 dark:border-indigo-800 rounded dark:bg-stone-950 outline-none" />
            <select name="subject" defaultValue={file.subject} className="p-2 text-xs border border-indigo-200 dark:border-indigo-800 rounded dark:bg-stone-950">
                <option value="analog-and-digital-communication">Analog Comm</option>
                <option value="digital-signal-processing">DSP</option>
                <option value="em-theory-and-transmission-lines">EM Theory</option>
                <option value="control-systems">Control Systems</option>
                <option value="advanced-numerical-methods">Numerical</option>
                <option value="electronic-devices">EDC</option>
                <option value="environmental-sciences">Env Sc</option>
                <option value="all-subjects">General</option>
            </select>
            <div className="flex gap-2">
              <select name="category" defaultValue={file.category} className="flex-1 p-2 text-xs border border-indigo-200 dark:border-indigo-800 rounded dark:bg-stone-950">
                  <option value="holy-text">Official</option>
                  <option value="lab-report">Lab Report</option>
                  <option value="lab-output">Code</option>
                  <option value="assignment">Assignment</option>
                  <option value="notes">Notes</option>
                  <option value="exam-prep">PYQ</option>
              </select>
              <button type="submit" name="actionType" value="edit" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase rounded">Update</button>
            </div>
          </div>
        )}
      </form>

      {/* PREVIEW MODAL WITH LOADING STATE */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-stone-950/90 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-950 w-full max-w-5xl h-[95vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 dark:border-stone-800">
            <div className="p-3 border-b flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 bg-stone-50 dark:bg-stone-900">
              <span>{loadingPreview ? 'Establishing Connection...' : `Previewing: ${file.title}`}</span>
              <button onClick={() => {setShowPreview(false); setLoadingPreview(false);}} className="w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white rounded-lg transition-colors">✕</button>
            </div>
            
            <div className="flex-1 bg-stone-100 dark:bg-stone-900 p-2 overflow-hidden relative">
              {/* LOADING OVERLAY */}
              {loadingPreview && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900">
                  <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 animate-pulse">Decrypting File...</p>
                </div>
              )}

              {getFileTypeCategory(file.file_type) === 'pdf' && (
                <iframe 
                  src={`${file.publicUrl}#toolbar=0`} 
                  className="w-full h-full rounded border-0" 
                  onLoad={() => setLoadingPreview(false)} // Stop loading for PDFs
                />
              )}
              
              {getFileTypeCategory(file.file_type) === 'image' && (
                <div className="h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 rounded">
                  <img 
                    src={file.publicUrl} 
                    className="max-h-full rounded shadow-lg" 
                    onLoad={() => setLoadingPreview(false)} // Stop loading for Images
                  />
                </div>
              )}
              
              {getFileTypeCategory(file.file_type) === 'code' && (
                <div className="bg-black p-4 h-full overflow-auto rounded font-mono text-xs border border-stone-800">
                  <pre className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">{codeContent}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}