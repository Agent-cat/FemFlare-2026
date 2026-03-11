"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#ec4899] via-[#f43f5e] to-[#f97316] overflow-hidden flex flex-col justify-between text-[#333] font-sans">
         <div className="absolute top-[10%] left-[10%] w-12 h-12 md:w-24 md:h-24 bg-white/20 rounded-full blur-[2px] animate-bounce pointer-events-none" style={{ animationDuration: '4s' }} />
              <div className="absolute top-[60%] left-[5%] w-8 h-8 md:w-16 md:h-16 bg-white/20 rounded-full blur-[2px] animate-bounce pointer-events-none" style={{ animationDuration: '6s', animationDelay: '1s' }} />
              <div className="absolute top-[20%] right-[15%] w-16 h-16 md:w-32 md:h-32 bg-white/10 rounded-full blur-[3px] animate-bounce pointer-events-none" style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
              <div className="absolute bottom-[10%] right-[10%] w-10 h-10 md:w-20 md:h-20 bg-white/20 rounded-full blur-[2px] animate-bounce pointer-events-none" style={{ animationDuration: '4.5s', animationDelay: '2s' }} />
              <div className="absolute bottom-[30%] left-[40%] w-14 h-14 md:w-28 md:h-28 bg-white/10 rounded-full blur-[3px] animate-bounce pointer-events-none" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }} />

              {/* Background Stars/Sparkles */}
              <svg className="absolute top-[15%] left-[25%] w-6 h-6 md:w-8 md:h-8 text-white/60 animate-pulse pointer-events-none" style={{ animationDuration: '2s' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z"/>
              </svg>
              <svg className="absolute top-[40%] right-[20%] w-4 h-4 md:w-6 md:h-6 text-white/60 animate-pulse pointer-events-none" style={{ animationDuration: '3s', animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z"/>
              </svg>
              <svg className="absolute bottom-[20%] right-[35%] w-5 h-5 md:w-7 md:h-7 text-white/60 animate-pulse pointer-events-none" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z"/>
              </svg>
              <svg className="absolute bottom-[40%] left-[15%] w-8 h-8 md:w-10 md:h-10 text-white/60 animate-pulse pointer-events-none" style={{ animationDuration: '4s', animationDelay: '1.5s' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z"/>
              </svg>
              <svg className="absolute top-[10%] right-[40%] w-3 h-3 md:w-5 md:h-5 text-white/60 animate-pulse pointer-events-none" style={{ animationDuration: '2.8s', animationDelay: '0.2s' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z"/>
              </svg>

               {[
          { left: '15%', top: '30%', size: 60, delay: 0 },
          { left: '75%', top: '65%', size: 80, delay: 2 },
          { left: '55%', top: '15%', size: 50, delay: 4 },
        ].map((ring, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-white/15 hidden md:block"
            style={{ left: ring.left, top: ring.top, width: ring.size, height: ring.size, animation: `anim-ring 4s ease-out ${ring.delay}s infinite` }}
          />
        ))}
        {/* --- Original Content Wrapper (z-10 for layering above canvas) --- */}
        <div className="relative z-10 flex flex-1 flex-col justify-between h-full">
          {/* Women Image - Centered on Mobile, Left Side on Desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:translate-x-0 md:-left-24 lg:-left-32 md:bottom-0 z-0 w-[500px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[750px] 2xl:w-[900px] pointer-events-none opacity-30 md:opacity-50 mb-0 md:mb-[-20px]">
            <Image
              src="/images/womens.png"
              alt="FemFlare Women"
              width={1000}
              height={1200}
              className="w-full h-auto object-contain object-center md:object-bottom drop-shadow-2xl"
              priority
            />
          </div>

          <div className="flex flex-1 relative p-6 md:p-12 z-10">
            {/* Left Sidebar Content */}
            <div className="hidden md:flex flex-col justify-between w-12 border-r border-gray-300/0">
              <div className="transform -rotate-90 origin-bottom-left whitespace-nowrap absolute top-1/2 -left-4 tracking-widest font-bold text-sm mix-blend-difference text-white/90">
                WE ARE THE WOMEN OF THE WORLD
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 md:mt-0">
              <h1 className="flex flex-col items-center pt-24 md:pt-52 leading-none font-poppins">
                <div className="transform text-black text-xs font-semibold">
                  KL UNIVERSITY'S
                </div>
                <span className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-wider text-[#1a1a1a]">
                  FEMFLARE
                </span>
                <span className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-wide text-transparent stroke-text mt-2">
                  2026
                </span>
              </h1>

              <div className="mt-12">
                <Link href="/events">
                  <Button className="bg-black hover:bg-gray-900 text-white border-0 shadow-lg px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all outline-none">Register Events</Button>
                </Link>
              </div>
            </div>

            {/* Right Sidebar Content */}
            <div className="hidden md:flex flex-col justify-start items-end w-12 relative">
              <div className="transform rotate-90 origin-top-right whitespace-nowrap absolute top-20 -right-2 tracking-widest text-black text-xs font-semibold">
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
              <div className="flex flex-col items-center md:items-start text-black animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <h2 className="flex items-center gap-2 md:gap-3 text-3xl md:text-5xl font-oswald font-bold tracking-tight uppercase">
                  24 MARCH{" "}
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black"></span>{" "}
                  <span className="text-transparent stroke-text">2026</span>
                </h2>
              </div>
              <div className="h-1 w-16 md:w-24 bg-black mt-3 mb-2 rounded-full"></div>
              <p className="font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mix-blend-difference text-white/90 font-oswald text-center md:text-left">
                KL UNIVERSITY • FEMFLARE
              </p>
            </div>

            {/* Center Arrow - Hidden on very small screens if needed, or adjusted */}
            <div className="order-3 md:order-2 md:absolute md:left-1/2 md:bottom-12 md:transform md:-translate-x-1/2 text-black mt-4 md:mt-0">
              <ArrowDown
                size={32}
                className="md:w-12 md:h-12"
                strokeWidth={1.5}
              />
            </div>

            {/* Right Description */}
            <div className="max-w-xs text-center md:text-right order-1 md:order-3 relative">
              <div className="text-black font-bold text-xs md:text-sm tracking-widest mb-2">
                KL UNIVERSITY{" "}
                <span className="text-slate-600 font-normal">— FEMFLARE</span>
              </div>
              <p className="text-slate-800 text-xs leading-relaxed font-medium md:ml-auto">
                A vibrant women-led community.
                <br className="hidden md:block" />
                celebrates confidence, creativity, and self-expression.
                <br className="hidden md:block" />
                Together, we inspire growth, leadership, and change
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;
