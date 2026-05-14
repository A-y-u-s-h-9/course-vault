"use client";
import { useState, useEffect } from 'react';

export default function MaterialDisplay({ initialMaterials = [], upvoteAction }) {
  const [materials, setMaterials] = useState(initialMaterials);
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewFile, setPreviewFile] = useState(null);
  const [codeContent, setCodeContent] = useState('');
  const [upvotedItems, setUpvotedItems] = useState(new Set()); // Tracks what you clicked

  const filteredMaterials = materials.filter(file => 
    activeFilter === 'all' || file.category === activeFilter
  );

  const getFileTypeCategory = (ext) => {
    const e = ext.toLowerCase();
    if (['pdf'].includes(e)) return 'pdf';
    if (['png', 'jpg', 'jpeg'].includes(e)) return 'image';
    if (['txt', 'm', 'c', 'cpp', 'py', 'js', 'ino'].includes(e)) return 'code';
    return 'unknown';
  };

  useEffect(() => {
    if (previewFile && getFileTypeCategory(previewFile.file_type) === 'code') {
      fetch(previewFile.publicUrl)
        .then(res => res.text())
        .then(text => setCodeContent(text))
        .catch(() => setCodeContent("Failed to load file. The server is crying."));
    }
  }, [previewFile]);

  const handleUpvote = async (id) => {
    if (upvotedItems.has(id)) return; // Prevent spamming
    
    // Optimistic UI update (feels instant)
    setMaterials(materials.map(m => m.id === id ? { ...m, lifesavers: (m.lifesavers || 0) + 1 } : m));
    setUpvotedItems(new Set([...upvotedItems, id]));
    
    // Tell the database
    await upvoteAction(id);
  };

  const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'lab-report', label: 'Lab Reports' },
    { id: 'lab-output', label: 'Lab Outputs / Code' },
    { id: 'exam-prep', label: 'PYQs & Exam Prep' },
    { id: 'notes', label: 'Notes' },
    { id: 'assignment', label: 'Assignments' }
  ];

  return (
    <div>
      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-200 dark:border-stone-800 pb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
              activeFilter === cat.id 
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-md' 
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-stone-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FILE LIST */}
      <div className="space-y-4">
        {filteredMaterials.map((file) => (
          <div key={file.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 transition-all shadow-sm gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 dark:bg-stone-950 text-stone-500 dark:text-stone-400 rounded-lg flex flex-col items-center justify-center">
                <span className="font-mono text-xs font-black">{file.file_type}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">{file.title}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-sm">
                    {file.category ? file.category.replaceAll('-', ' ') : 'General'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Uploaded: {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Trust Score Button */}
              <button 
                onClick={() => handleUpvote(file.id)}
                disabled={upvotedItems.has(file.id)}
                className={`px-3 py-2 flex items-center gap-2 text-sm font-bold rounded-lg transition-colors border ${
                  upvotedItems.has(file.id) 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50' 
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                🛟 {file.lifesavers || 0}
              </button>

              <button 
                onClick={() => setPreviewFile(file)}
                className="px-4 py-2 bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-bold rounded-lg transition-colors"
              >
                Peek 👁️
              </button>
              
              <a 
                href={file.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
              >
                Get File
              </a>
            </div>
          </div>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-20 text-stone-400 dark:text-stone-600 font-medium border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
            No materials found. We are flying blind.
          </div>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-stone-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800 bg-[#F9F9F8] dark:bg-stone-900">
              <div>
                <h3 className="font-black text-lg">{previewFile.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <a href={previewFile.publicUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Download</a>
                <button onClick={() => setPreviewFile(null)} className="p-2 bg-stone-200 dark:bg-stone-800 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-stone-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-stone-100 dark:bg-stone-950 p-4">
              {getFileTypeCategory(previewFile.file_type) === 'pdf' && <iframe src={`${previewFile.publicUrl}#toolbar=0`} className="w-full h-full rounded-lg border-0 bg-white" />}
              {getFileTypeCategory(previewFile.file_type) === 'image' && <img src={previewFile.publicUrl} className="max-w-full max-h-full mx-auto rounded-lg" />}
              {getFileTypeCategory(previewFile.file_type) === 'code' && (
                <div className="w-full h-full rounded-lg bg-[#1E1E1E] p-4 relative overflow-auto">
                  <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">{codeContent}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}