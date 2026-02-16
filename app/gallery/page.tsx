"use cache";
import GalleryGrid from '@/components/gallery/GalleryGrid';

const galleryImages = [
  {
    src: '/images/a.jpeg',
    alt: 'Gallery Image A',
    category: 'Community'
  },
  {
    src: '/images/b.jpeg',
    alt: 'Gallery Image B',
    category: 'Leadership'
  },
  {
    src: '/images/h.jpeg',
    alt: 'Gallery Image H',
    category: 'Community'
  },
  {
    src: '/images/c.jpeg',
    alt: 'Gallery Image C',
    category: 'Arts'
  },
  {
    src: '/images/d.jpeg',
    alt: 'Gallery Image D',
    category: 'Fashion'
  },
  {
    src: '/images/e.jpeg',
    alt: 'Gallery Image E',
    category: 'Tech'
  },
  {
    src: '/images/f.jpeg',
    alt: 'Gallery Image F',
    category: 'Community'
  },
  {
    src: '/images/g.jpeg',
    alt: 'Gallery Image G',
    category: 'Leadership'
  }
];


export default async function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#e0dac8] text-[#1a1a1a] font-sans pt-32 pb-24 relative overflow-x-hidden">

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
        <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-oswald font-bold uppercase tracking-tighter text-[#1a1a1a] mb-8">
                Gallery
            </h1>

            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/fybT9k3BZZs?si=-87mIudCxHLkOaiD"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>        {/* Gallery Grid Component */}
        <GalleryGrid images={galleryImages} />

      </div>
    </main>
  );
}
