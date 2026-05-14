import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import MaterialDisplay from './MaterialDisplay';

export default async function SubjectPage({ params }) {
  const { slug } = await params;
  const subjectName = slug.replaceAll('-', ' ');

  // Fetch approved files and order by highest lifesaver score first
  const { data: uploadedFiles } = await supabase
    .from('materials')
    .select('*')
    .eq('subject', slug)
    .eq('status', 'approved')
    .order('lifesavers', { ascending: false })
    .order('created_at', { ascending: false });

  // Attach public URLs
  const materialsWithUrls = (uploadedFiles || []).map(file => {
    const { data } = supabase.storage.from('vault').getPublicUrl(file.file_path);
    return { ...file, publicUrl: data.publicUrl };
  });

  // SECURE SERVER ACTION: Increments the trust score
  async function incrementLifesavers(id) {
    "use server";
    const { data } = await supabase.from('materials').select('lifesavers').eq('id', id).single();
    await supabase.from('materials').update({ lifesavers: (data?.lifesavers || 0) + 1 }).eq('id', id);
    revalidatePath(`/subjects/${slug}`);
  }

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
            Files with the highest Trust Score 🛟 float to the top. Do not copy blindly without at least changing the font.
          </p>
        </header>

        {/* PROPERLY PASSING THE PROPS */}
        <MaterialDisplay 
          initialMaterials={materialsWithUrls} 
          upvoteAction={incrementLifesavers} 
        />

      </div>
    </main>
  );
}