"use client";
import { useState, useEffect } from 'react';

export default function MaterialDisplay({ initialMaterials = [] }) {
  const [materials] = useState(initialMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [codeContent, setCodeContent] = useState('');

  const getFileTypeCategory = (ext) => {
    const e = ext.toLowerCase();
    if (['pdf'].includes(e)) return 'pdf';
    if (['png', 'jpg', 'jpeg'].includes(e)) return 'image';
    if (['txt', 'm', 'c', 'cpp', 'py', 'js', 'ino'].includes(e)) return 'code';
    return 'unknown';
  };

  const handlePreviewOpen = (file) => {
    setSelectedFile(file);
    setShowPreview(true);
    setLoadingPreview(true);
  };

  useEffect(() => {
    if (showPreview && selectedFile && getFileTypeCategory(selectedFile.file_type) === 'code') {
      fetch(selectedFile.publicUrl)
        .then(res => res.text())
        .then(text => {
          setCodeContent(text);
          setLoadingPreview(false);
        })
        .catch(() => {
          setCodeContent("Error loading code.");
          setLoadingPreview(false);
        });
    }
  }, [showPreview, selectedFile]);

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const holyTexts = filteredMaterials.filter(m => m.category === 'holy-text');
  const communityArchives = filteredMaterials.filter(m => m.category !== 'holy-text');

  return (
    <div className="space-y-8">
      
      {/* SEARCH & FILTERS BAR */}
      <div className="sticky top-4 z-40 flex flex-col md:flex-row gap-4 p-4 bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="Search the archive..."
            className="w-full pl-4 pr-4 py-2 bg-stone-100 dark:bg-stone-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {['all', 'lab-report', 'lab-output', 'assignment', 'notes', 'exam-prep'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' 
                : 'bg-stone-100 dark:bg-stone-900 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* HOLY TEXTS */}
      {holyTexts.length > 0 && (
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6 flex items-center gap-3">
            The Holy Texts 📜
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {holyTexts.map((file) => (
              <div key={file.id} className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/10 border-2 border-amber-200 dark:border-amber-900/30">
                <h3 className="font-bold text-stone-900 dark:text-amber-100 mb-4">{file.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handlePreviewOpen(file)} className="flex-1 py-3 bg-amber-500 text-white text-[10px] font-black uppercase rounded-xl">Peek 👁️</button>
                  <a href={file.publicUrl} download className="px-4 py-3 bg-blue-600 text-white rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COMMUNITY ARCHIVES */}
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6">Collective Knowledge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communityArchives.map((file) => (
            <div key={file.id} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-blue-500/50 transition-all">
              <div className="mb-4">
                <span className="text-[9px] font-black text-blue-500 uppercase bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded mb-2 inline-block">
                  {file.category.replace('-', ' ')}
                </span>
                <h3 className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">{file.title}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handlePreviewOpen(file)} className="flex-1 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-white text-stone-600 dark:text-stone-300 text-[10px] font-black uppercase rounded-xl transition-all">Peek 👁️</button>
                <a href={file.publicUrl} download className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIEW MODAL */}
      {showPreview && selectedFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-stone-950 w-full max-w-6xl h-[85vh] rounded-[2rem] flex flex-col overflow-hidden border border-stone-200 dark:border-stone-800">
            <div className="p-5 border-b dark:border-stone-800 flex justify-between items-center">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">{selectedFile.title}</h3>
              <button onClick={() => setShowPreview(false)} className="w-10 h-10 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-full">✕</button>
            </div>
            <div className="flex-1 bg-stone-100 dark:bg-stone-950 p-4 relative">
              {loadingPreview && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-100 dark:bg-stone-950">
                  <div className="w-8 h-8 border-4 border-t-amber-500 rounded-full animate-spin"></div>
                </div>
              )}
              <div className="w-full h-full rounded-2xl overflow-hidden border bg-white dark:bg-stone-900">
                {getFileTypeCategory(selectedFile.file_type) === 'pdf' && <iframe src={`${selectedFile.publicUrl}#toolbar=0`} className="w-full h-full border-0" onLoad={() => setLoadingPreview(false)} />}
                {getFileTypeCategory(selectedFile.file_type) === 'image' && <div className="h-full flex items-center justify-center"><img src={selectedFile.publicUrl} className="max-h-full rounded" onLoad={() => setLoadingPreview(false)} /></div>}
                {getFileTypeCategory(selectedFile.file_type) === 'code' && <div className="bg-black p-8 h-full overflow-auto font-mono text-sm text-emerald-400"><pre>{codeContent}</pre></div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}