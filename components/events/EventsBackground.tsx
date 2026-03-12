import React from 'react';
import Image from 'next/image';

const EventsBackground = () => {
  return (
    <>
      {/* 1. Premium Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
           }}
      />

      {/* User Requested: Left Side Image */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 h-[90vh] w-[45vw] z-0 pointer-events-none opacity-20 hidden md:block">
         <Image
            src="/images/2.png"
            alt="Decorative Element"
            fill
            className="object-contain object-left"
            priority
         />
      </div>

      {/* 3. Large Typography (Fixed Background) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap select-none">
         <h1 className="text-[15vw] md:text-[20vw] font-black font-poppins leading-none tracking-tighter text-white/5 rotate-[-5deg]">
            FEMFLARE
         </h1>
      </div>
    </>
  );
};

export default EventsBackground;
