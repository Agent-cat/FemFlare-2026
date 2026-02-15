"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowDown } from 'lucide-react';
import ScrollSequence from './ScrollSequence';
import Link from 'next/link';


const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Total frames: 192 (from file listing)
  const totalFrames = 192;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#F1EBE0]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between text-black font-sans">

        {/* Background Animation */}
        <ScrollSequence frameCount={totalFrames} containerRef={containerRef} />

        {/* Helper overlay to improve text readability if images are busy */}
        <div className="absolute inset-0 bg-white/10 z-0 pointer-events-none" />

        {/* --- Original Content Wrapper (z-10 for layering above canvas) --- */}
        <div className="relative z-10 flex flex-1 flex-col justify-between h-full">

            <div className="flex flex-1 relative p-6 md:p-12">
                {/* Left Sidebar Content */}
                <div className="hidden md:flex flex-col justify-between w-12 border-r border-gray-300/0">
                <div className="transform -rotate-90 origin-bottom-left whitespace-nowrap absolute top-1/2 -left-4 tracking-widest font-bold text-sm mix-blend-difference text-white/90">
                    WE ARE THE WOMEN OF THE WORLD
                </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 md:mt-0">
                <h1 className="flex flex-col items-center pt-24 md:pt-52 leading-none font-poppins">
                    <div className="transform text-[#FF5722] text-xs font-semibold">
                    KL UNIVERSITY'S
                    </div>
                    <span className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-wide text-[#1a1a1a]">
                    FEMFLARE
                    </span>
                    <span className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-wide text-transparent stroke-text mt-2">
                    2026
                    </span>
                </h1>

                <div className="mt-12">
                    <Link href="/events">
                    <Button>
                        Register Events
                    </Button>
                    </Link>
                </div>
                </div>

                {/* Right Sidebar Content */}
                <div className="hidden md:flex flex-col justify-start items-end w-12 relative">
                    <div className="transform rotate-90 origin-top-right whitespace-nowrap absolute top-20 -right-2 tracking-widest text-[#FF5722] text-xs font-semibold">
                    KL UNIVERSITY
                    </div>
                    <div className="transform rotate-90 origin-top-right whitespace-nowrap absolute top-60 -right-2 tracking-widest text-gray-500 text-xs">
                    FEMFLARE
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full p-6 md:p-12 flex flex-col md:flex-row justify-end md:justify-between items-center md:items-end gap-8 md:gap-0 pb-12 md:pb-12">

                {/* Date and Tagline */}
                <div className="flex flex-col items-center md:items-start order-2 md:order-1">
                  <div className="flex flex-col items-center md:items-start text-[#FF5722] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <h2 className="flex items-center gap-2 md:gap-3 text-3xl md:text-5xl font-oswald font-bold tracking-tight uppercase">
                        24 MARCH <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FF5722]"></span> <span className="text-transparent stroke-text">2026</span>
                    </h2>
                  </div>
                  <div className="h-1 w-16 md:w-24 bg-[#FF5722] mt-3 mb-2 rounded-full"></div>
                  <p className="font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mix-blend-difference text-white/90 font-oswald text-center md:text-left">
                      KL UNIVERSITY • FEMFLAIR
                  </p>
                </div>

                {/* Center Arrow - Hidden on very small screens if needed, or adjusted */}
                <div className="order-3 md:order-2 md:absolute md:left-1/2 md:bottom-12 md:transform md:-translate-x-1/2 text-[#FF5722] mt-4 md:mt-0">
                    <ArrowDown size={32} className="md:w-12 md:h-12" strokeWidth={1.5} />
                </div>

                {/* Right Description */}
                <div className="max-w-xs text-center md:text-right order-1 md:order-3 relative">
                    <div className="text-[#FF5722] font-bold text-xs md:text-sm tracking-widest mb-2">
                        KL UNIVERSITY <span className="text-slate-600 font-normal">— FEMFLAIR</span>
                    </div>
                    <p className="text-slate-800 text-xs leading-relaxed font-medium md:ml-auto">
                        A vibrant women-led community.<br className="hidden md:block"/>
                        celebrates confidence, creativity, and self-expression.<br className="hidden md:block"/>
                        Together, we inspire growth, leadership, and change
                    </p>
                </div>
            </div>



        </div>
      </div>


    </section>
  );
};

export default HeroSection;
