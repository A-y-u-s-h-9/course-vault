import Link from 'next/link';

// Note: Keep your existing Supabase fetching logic up here if you have it!

export default async function SubjectPage({ params }) {
  const { slug } = await params;
  const subjectName = slug.replaceAll('-', ' ');

  const materials = [];

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Back to Vault
        </Link>

        <header className="mb-16 border-b border-stone-200 dark:border-stone-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter capitalize mb-4">
            {subjectName}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium">
            Archived materials. Use at your own risk. Do not copy blindly.
          </p>
        </header>

        <div className="space-y-4">
          {materials.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-400 dark:hover:border-stone-500 transition-all group shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-stone-100 dark:bg-stone-950 text-stone-500 dark:text-stone-400 rounded flex items-center justify-center font-mono text-xs font-bold group-hover:bg-stone-900 group-hover:text-white dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900 transition-colors">
                  {file.type}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">{file.title}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{file.date}</p>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-bold rounded transition-colors">
                Download
              </button>
            </div>
          ))}

          {materials.length === 0 && (
            <div className="text-center py-20 text-stone-400 dark:text-stone-600 font-medium border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
              No materials uploaded yet. Everyone is doomed.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}