import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import MaterialDisplay from './MaterialDisplay';

export default async function SubjectPage({ params }) {
  const { slug } = await params;
  const subjectName = slug.replaceAll('-', ' ');

  // Fetch approved files - Order by date since upvotes are removed
  const { data: uploadedFiles } = await supabase
    .from('materials')
    .select('*')
    .eq('subject', slug)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  // Attach public URLs
  const materialsWithUrls = (uploadedFiles || []).map(file => {
    const { data } = supabase.storage.from('vault').getPublicUrl(file.file_path);
    return { ...file, publicUrl: data.publicUrl };
  });

  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Retreat to Hub
        </Link>

        <header className="mb-12 border-b-2 border-stone-200 dark:border-stone-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter capitalize mb-4">
            {subjectName}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium">
            Accessing the batch archives. Reference these materials responsibly.
          </p>
        </header>

        {/* Removed upvoteAction prop */}
        <MaterialDisplay initialMaterials={materialsWithUrls} />

      </div>
    </main>
  );
}