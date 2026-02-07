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
                <h1 className="flex flex-col items-center pt-52 leading-none font-poppins">
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
            <div className="w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-end md:items-end">

                {/* Date and Tagline */}
                <div className="mb-8 md:mb-0">
                <h2 className="text-[#FF5722] text-5xl md:text-6xl font-bold tracking-tighter">
                    27-03-2026
                </h2>
                <div className="h-1 w-full bg-[#FF5722] my-2"></div>
                <p className="font-bold text-sm md:text-base tracking-wide uppercase mt-2 mix-blend-difference text-white/80">
                    KLUNIVERSITY <br />FEMFLAIR 2026
                </p>
                </div>

                {/* Center Arrow */}
                <div className="absolute left-1/2 bottom-12 transform -translate-x-1/2 mb-8 md:mb-0 text-[#FF5722]">
                <ArrowDown size={48} strokeWidth={1.5} />
                </div>

                {/* Right Description */}
                <div className="max-w-xs text-right">
                    <div className="text-[#FF5722] font-bold text-sm tracking-widest mb-2">
                        KL UNIVERSITY <span className="text-slate-600 font-normal">— FEMFLAIR</span>
                    </div>
                    <p className="text-slate-800 text-xs leading-relaxed font-medium">
                        A vibrant women-led community.
 celebrates confidence, creativity, and self-expression.
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
