import Link from 'next/link';
import Image from 'next/image'; // Next.js optimized image component

export default function SquadPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-8 md:p-16 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors mb-12 uppercase tracking-widest">
          ← Back to Reality
        </Link>

        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            The Chaap Association
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-medium max-w-2xl mx-auto">
            A highly prestigious group of ECE students bonded by extreme academic pressure, 
            questionable lab readings, and a shared fear of transient analysis.
          </p>
        </header>

        {/* The "Polaroid" Image Container */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-900 p-4 pb-8 md:p-6 md:pb-12 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-stone-950 border border-stone-200 dark:border-stone-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
          
          <div className="relative w-full aspect-video md:aspect-[4/3] bg-stone-200 dark:bg-stone-800 rounded overflow-hidden mb-6 border border-stone-100 dark:border-stone-700">
            {/* 
              Next.js Image component automatically optimizes loading.
              Make sure your image is named squad.jpg and is in the public folder!
            */}
            <Image 
              src="/squad.jpg" 
              alt="The Squad surviving ECE" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>

          <div className="text-center">
             <h2 className="font-bold text-xl text-stone-900 dark:text-stone-100 font-mono tracking-tight mt-6">
               Fig 1.0: The Holy Gear
             </h2>
             <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 italic px-4">
               Circa 2026. Documented evidence of an entire ECE squad celebrating a singular piece of gear we successfully manufactured in mechanical lab. We don't know how we did it. We are just glad nobody lost a finger.
             </p>
          </div>

        </div>

        {/* Optional: Member shoutouts */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-stone-200 dark:border-stone-800">
           <div className="text-center">
             <h3 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-sm mb-1">The Coder</h3>
             <p className="text-stone-500 dark:text-stone-400 text-sm">Copies MATLAB scripts faster than the speed of light.</p>
           </div>
           <div className="text-center">
             <h3 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-sm mb-1">The Hardware Guy</h3>
             <p className="text-stone-500 dark:text-stone-400 text-sm">Actually knows which resistor is which. Highly protected asset.</p>
           </div>
           <div className="text-center">
             <h3 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-sm mb-1">The Writer</h3>
             <p className="text-stone-500 dark:text-stone-400 text-sm">Writes the 20-page lab report intro at 4 AM.</p>
           </div>
        </div>

      </div>
    </main>
  );
}