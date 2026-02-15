"use cache";
import GalleryGrid from '@/components/gallery/GalleryGrid';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1000&auto=format&fit=crop',
    alt: 'Women Leadership Conference',
    category: 'Leadership'
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
    alt: 'Community & Friendship',
    category: 'Community'
  },
  {
    src: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=1000&auto=format&fit=crop',
    alt: 'Professional Collaboration',
    category: 'Work'
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    alt: 'Healthcare Excellence',
    category: 'Health'
  },
  {
    src: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?q=80&w=1000&auto=format&fit=crop',
    alt: 'Creative Arts Performance',
    category: 'Arts'
  },
  {
    src: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop',
    alt: 'Empowerment Workshop',
    category: 'Education'
  },
  {
    src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop',
    alt: 'Inspiring Speakers',
    category: 'Leadership'
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    alt: 'Collaborative Learning',
    category: 'Education'
  },
  {
    src: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop',
    alt: 'Women in Science',
    category: 'Tech'
  }
];


export default async function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#F1EBE0] text-[#1a1a1a] font-sans pt-32 pb-24 relative overflow-x-hidden">

      {/* Background Elements - Soft, dreamy aesthetic */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Soft gradient blob top right */}
         <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-rose-200/30 blur-[100px]" />
         {/* Soft gradient blob bottom left */}
         <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-orange-100/40 blur-[80px]" />

         {/* Subtle Grain Overlay for texture */}
         <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
         />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}


        {/* Gallery Grid Component */}
        <GalleryGrid images={galleryImages} />

      </div>
    </main>
  );
}
