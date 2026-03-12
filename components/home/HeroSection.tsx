"use client";

import React from 'react';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { toast } from "sonner";

const HeroSection = () => {
  return (
    <section className="hero-section relative w-full h-[100dvh] bg-gradient-to-br from-[#ec4899] via-[#f43f5e] to-[#f97316] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Soft ambient glows */}
        <div
          className="absolute -top-20 right-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-white/10 blur-[100px]"
          style={{ animation: 'anim-glow 10s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[10%] -left-20 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-[#fbbf24]/15 blur-[80px]"
          style={{ animation: 'anim-glow2 12s ease-in-out 3s infinite' }}
        />
        <div
          className="hidden md:block absolute top-[40%] left-[50%] w-[250px] h-[250px] rounded-full bg-pink-200/10 blur-[60px]"
          style={{ animation: 'anim-drift 15s ease-in-out 1s infinite' }}
        />

        {/* Floating glass orbs */}
        {[
          { size: 'w-14 h-14 md:w-24 md:h-24', left: '8%', top: '18%', delay: 0, dur: 12, hideOnMobile: false },
          { size: 'w-10 h-10 md:w-16 md:h-16', left: '82%', top: '12%', delay: 2, dur: 14, hideOnMobile: false },
          { size: 'w-12 h-12', left: '68%', top: '55%', delay: 4, dur: 10, hideOnMobile: true },
          { size: 'w-12 h-12 md:w-20 md:h-20', left: '22%', top: '68%', delay: 1, dur: 16, hideOnMobile: false },
          { size: 'w-8 h-8 md:w-10 md:h-10', left: '92%', top: '42%', delay: 3, dur: 11, hideOnMobile: false },
          { size: 'w-14 h-14', left: '48%', top: '25%', delay: 5, dur: 13, hideOnMobile: true },
        ].map((orb, i) => (
          <div
            key={`orb-${i}`}
            className={`absolute ${orb.size} rounded-full border border-white/20 bg-white/8 backdrop-blur-sm ${orb.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: orb.left, top: orb.top, animation: `anim-float-x ${orb.dur}s ease-in-out ${orb.delay}s infinite` }}
          />
        ))}

        {/* Animated pulsing rings - hidden on mobile */}
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

        {/* Floating sparkle dots - only edge ones on mobile */}
        {[
          { left: '8%', top: '12%', delay: 0, dur: 6, hideOnMobile: false },
          { left: '92%', top: '15%', delay: 1, dur: 7, hideOnMobile: false },
          { left: '5%', top: '38%', delay: 2, dur: 5, hideOnMobile: false },
          { left: '93%', top: '35%', delay: 0.5, dur: 8, hideOnMobile: false },
          { left: '12%', top: '62%', delay: 3, dur: 6, hideOnMobile: true },
          { left: '88%', top: '58%', delay: 1.5, dur: 7, hideOnMobile: true },
          { left: '15%', top: '82%', delay: 4, dur: 5, hideOnMobile: false },
          { left: '85%', top: '78%', delay: 2.5, dur: 6, hideOnMobile: false },
          { left: '3%', top: '55%', delay: 0.8, dur: 7, hideOnMobile: true },
          { left: '97%', top: '48%', delay: 3.5, dur: 8, hideOnMobile: true },
          { left: '10%', top: '8%', delay: 1.2, dur: 5, hideOnMobile: true },
          { left: '90%', top: '85%', delay: 4.5, dur: 6, hideOnMobile: true },
          { left: '30%', top: '55%', delay: 1, dur: 7, hideOnMobile: true },
          { left: '70%', top: '52%', delay: 2.5, dur: 6, hideOnMobile: true },
          { left: '45%', top: '70%', delay: 0.3, dur: 8, hideOnMobile: true },
          { left: '55%', top: '68%', delay: 3.2, dur: 5, hideOnMobile: true },
          { left: '25%', top: '42%', delay: 4, dur: 7, hideOnMobile: true },
          { left: '75%', top: '40%', delay: 1.8, dur: 6, hideOnMobile: true },
        ].map((dot, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full bg-white ${dot.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: dot.left, top: dot.top, animation: `anim-dot ${dot.dur}s ease-in-out ${dot.delay}s infinite` }}
          />
        ))}

        {/* Floating decorative lines - hidden on mobile */}
        {[
          { left: '8%', top: '42%', rotate: 45, delay: 0 },
          { left: '90%', top: '22%', rotate: -30, delay: 1.5 },
          { left: '85%', top: '72%', rotate: 60, delay: 3 },
          { left: '12%', top: '75%', rotate: -45, delay: 2 },
        ].map((line, i) => (
          <div
            key={`line-${i}`}
            className="absolute w-8 h-0.5 bg-white/20 rounded-full hidden md:block"
            style={{ left: line.left, top: line.top, rotate: `${line.rotate}deg`, animation: `anim-line 5s ease-in-out ${line.delay}s infinite` }}
          />
        ))}

        {/* Floating diamond shapes - hidden on mobile */}
        {[
          { left: '12%', top: '18%', delay: 1, dur: 8 },
          { left: '88%', top: '42%', delay: 3, dur: 10 },
          { left: '6%', top: '72%', delay: 0, dur: 9 },
          { left: '92%', top: '68%', delay: 2, dur: 7 },
        ].map((diamond, i) => (
          <div
            key={`diamond-${i}`}
            className="absolute w-3 h-3 border border-white/25 hidden md:block"
            style={{ left: diamond.left, top: diamond.top, animation: `anim-diamond ${diamond.dur}s ease-in-out ${diamond.delay}s infinite` }}
          />
        ))}

        {/* Floating plus signs - only edge ones on mobile */}
        {[
          { left: '15%', top: '10%', delay: 2, hideOnMobile: false },
          { left: '5%', top: '50%', delay: 0, hideOnMobile: false },
          { left: '93%', top: '55%', delay: 3, hideOnMobile: false },
          { left: '35%', top: '60%', delay: 1, hideOnMobile: true },
          { left: '65%', top: '58%', delay: 2.5, hideOnMobile: true },
          { left: '50%', top: '75%', delay: 4, hideOnMobile: true },
        ].map((plus, i) => (
          <div
            key={`plus-${i}`}
            className={`absolute text-white/20 text-xl font-light ${plus.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: plus.left, top: plus.top, animation: `anim-plus 8s ease-in-out ${plus.delay}s infinite` }}
          >
            +
          </div>
        ))}

        {/* Classic 5-point stars - only edge ones on mobile */}
        {[
          { left: '5%', top: '10%', size: 22, delay: 0, hideOnMobile: false },
          { left: '93%', top: '20%', size: 16, delay: 1.5, hideOnMobile: false },
          { left: '7%', top: '45%', size: 18, delay: 2.5, hideOnMobile: false },
          { left: '91%', top: '50%', size: 14, delay: 0.8, hideOnMobile: false },
          { left: '10%', top: '78%', size: 20, delay: 3, hideOnMobile: true },
          { left: '88%', top: '82%', size: 16, delay: 1, hideOnMobile: true },
          { left: '3%', top: '65%', size: 12, delay: 2, hideOnMobile: false },
          { left: '95%', top: '35%', size: 18, delay: 3.5, hideOnMobile: false },
          { left: '28%', top: '55%', size: 12, delay: 0.5, hideOnMobile: true },
          { left: '72%', top: '52%', size: 14, delay: 2.8, hideOnMobile: true },
          { left: '40%', top: '72%', size: 10, delay: 1.2, hideOnMobile: true },
          { left: '60%', top: '75%', size: 12, delay: 3.8, hideOnMobile: true },
        ].map((star, i) => (
          <svg
            key={`h5star-${i}`}
            className={`absolute ${star.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: star.left, top: star.top, animation: `anim-star 4s ease-in-out ${star.delay}s infinite` }}
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 2L14.9 8.6L22 9.5L16.9 14.3L18.2 21.3L12 17.8L5.8 21.3L7.1 14.3L2 9.5L9.1 8.6L12 2Z" />
          </svg>
        ))}

        {/* Twinkling 4-point stars - only edge ones on mobile */}
        {[
          { left: '4%', top: '12%', size: 20, delay: 0, hideOnMobile: false },
          { left: '10%', top: '32%', size: 14, delay: 1.5, hideOnMobile: true },
          { left: '90%', top: '18%', size: 18, delay: 0.8, hideOnMobile: false },
          { left: '95%', top: '40%', size: 12, delay: 2.5, hideOnMobile: true },
          { left: '88%', top: '75%', size: 16, delay: 1, hideOnMobile: false },
          { left: '15%', top: '82%', size: 22, delay: 3, hideOnMobile: true },
          { left: '8%', top: '68%', size: 10, delay: 4, hideOnMobile: true },
          { left: '92%', top: '62%', size: 14, delay: 2, hideOnMobile: false },
          { left: '6%', top: '52%', size: 18, delay: 0.5, hideOnMobile: true },
          { left: '94%', top: '28%', size: 12, delay: 3.5, hideOnMobile: true },
          { left: '32%', top: '48%', size: 10, delay: 1.8, hideOnMobile: true },
          { left: '68%', top: '45%', size: 12, delay: 0.3, hideOnMobile: true },
          { left: '22%', top: '62%', size: 8, delay: 2.2, hideOnMobile: true },
          { left: '78%', top: '65%', size: 10, delay: 4.2, hideOnMobile: true },
        ].map((star, i) => (
          <svg
            key={`star-${i}`}
            className={`absolute ${star.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: star.left, top: star.top, animation: `anim-star4 3s ease-in-out ${star.delay}s infinite` }}
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z" />
          </svg>
        ))}

        {/* Sparkle bursts - only edge ones on mobile */}
        {[
          { left: '7%', top: '10%', size: 16, delay: 1, hideOnMobile: false },
          { left: '93%', top: '52%', size: 20, delay: 0, hideOnMobile: false },
          { left: '12%', top: '88%', size: 14, delay: 2, hideOnMobile: true },
          { left: '5%', top: '45%', size: 18, delay: 3, hideOnMobile: false },
          { left: '88%', top: '82%', size: 12, delay: 1.5, hideOnMobile: true },
          { left: '95%', top: '12%', size: 16, delay: 4, hideOnMobile: false },
          { left: '38%', top: '58%', size: 10, delay: 0.8, hideOnMobile: true },
          { left: '62%', top: '62%', size: 12, delay: 2.8, hideOnMobile: true },
          { left: '48%', top: '78%', size: 10, delay: 3.5, hideOnMobile: true },
        ].map((sparkle, i) => (
          <svg
            key={`sparkle-${i}`}
            className={`absolute ${sparkle.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: sparkle.left, top: sparkle.top, animation: `anim-sparkle 2.5s ease-in-out ${sparkle.delay}s infinite` }}
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
          </svg>
        ))}

        {/* Glowing star clusters - reduced on mobile */}
        {[
          { left: '3%', top: '25%', delay: 0, hideOnMobile: false },
          { left: '96%', top: '15%', delay: 2, hideOnMobile: false },
          { left: '90%', top: '80%', delay: 1, hideOnMobile: true },
          { left: '8%', top: '85%', delay: 3, hideOnMobile: false },
          { left: '94%', top: '45%', delay: 1.5, hideOnMobile: true },
        ].map((cluster, i) => (
          <div
            key={`cluster-${i}`}
            className={`absolute ${cluster.hideOnMobile ? 'hidden md:block' : ''}`}
            style={{ left: cluster.left, top: cluster.top, animation: `anim-cluster 4s ease-in-out ${cluster.delay}s infinite` }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="1.5" fill="white" />
              <circle cx="8" cy="8" r="1" fill="white" opacity="0.6" />
              <circle cx="16" cy="10" r="0.8" fill="white" opacity="0.4" />
              <circle cx="10" cy="16" r="0.6" fill="white" opacity="0.5" />
            </svg>
          </div>
        ))}
        {/* Half-facing women image - requested enhancement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-1/2 -translate-x-1/2 top-[52%] -translate-y-1/2 md:left-[-23%] md:translate-x-0 md:top-auto md:translate-y-0 md:-bottom-[8%] w-[185%] md:w-[70%] h-[105%] md:h-full z-0 pointer-events-none select-none"
        >
          <div className="relative w-full h-full flex items-center justify-center md:items-end md:justify-start">
            <Image
              src="/images/womens.png"
              alt="Women Empowering"
              fill
              priority
              className="object-contain object-center md:object-left-bottom opacity-20 md:opacity-85 transition-opacity duration-300"
              style={{
                maskImage: 'var(--hero-mask)',
                WebkitMaskImage: 'var(--hero-mask)',
                filter: 'drop-shadow(8px 8px 16px rgba(0,0,0,0.25))'
              } as any}
            />
          </div>
          <style jsx>{`
            div {
              --hero-mask: radial-gradient(circle, black 35%, transparent 85%);
            }
            @media (min-width: 768px) {
              div {
                --hero-mask: linear-gradient(to right, black 25%, transparent 100%);
              }
            }
            @keyframes hero-shimmer {
              0% { transform: translateX(-100%) skewX(-15deg); }
              100% { transform: translateX(200%) skewX(-15deg); }
            }
            .hero-section .shimmer {
              position: relative;
              overflow: hidden;
            }
            .hero-section .shimmer::after {
              content: '';
              position: absolute;
              top: 0;
              left: -50%;
              width: 50%;
              height: 100%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
              animation: hero-shimmer 2.5s infinite;
            }
          `}</style>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full pt-4 pb-6 md:pt-14 md:pb-24">

        {/* Desktop: Side-by-side layout | Mobile: Stacked */}
        <div className="flex-1 flex flex-col items-center justify-center gap-y-3 md:gap-y-0 px-6 sm:px-10 md:px-16 lg:px-20 py-2 md:py-0">

          {/* Left Side - Text Content */}
            <div className="flex flex-col items-center text-center max-w-xs sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-5xl 2xl:max-w-6xl mb-6 md:mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-2"
              >
                <Image
                  src="/images/femflareloo2.png"
                  alt="FemFlare Logo"
                  width={250}
                  height={250}
                  className="w-40 md:w-64 h-auto object-contain mx-auto"
                  priority
                />
              </motion.div>
              <div className="w-fit mx-auto relative">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-extrabold tracking-tight text-black leading-[0.85] mb-1 uppercase drop-shadow-[3px_3px_6px_rgba(0,0,0,0.3)] font-quicksand"
                >
                  <span className="block text-[2.6rem] sm:text-6xl md:text-5xl lg:text-6xl xl:text-[6rem] 2xl:text-[9.5rem]">FemFlare</span>

                </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full flex items-center justify-center gap-4 mb-4"
              >
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="h-[2px] md:h-[2.5px] bg-black flex-1 rounded-full origin-right opacity-90 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
                />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="text-black font-black text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl tracking-tighter leading-none italic whitespace-nowrap drop-shadow-[3px_3px_6px_rgba(0,0,0,0.2)]"
                >
                  #GivetoGain
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="h-[2px] md:h-[2.5px] bg-black flex-1 rounded-full origin-left opacity-90 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0 md:-mt-1 mb-6 md:mb-4"
            >
              <div className="w-16 sm:w-24 md:w-32 h-[2px] bg-white rounded-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]" />
              <span
                className="text-5xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[11.5rem] font-extrabold uppercase tracking-tight leading-none drop-shadow-[4px_4px_8px_rgba(0,0,0,0.3)] font-quicksand"
                style={{
                  WebkitTextStroke: '2px white',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                2026
              </span>
              <div className="w-16 sm:w-24 md:w-32 h-[2px] bg-white rounded-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-bold drop-shadow-[3px_3px_6px_rgba(0,0,0,0.3)]"
            >
              A vibrant women-led community celebrating confidence, creativity, and self-expression.
            </motion.p>
          </div>

          {/* Square Date Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-6 md:mt-0 relative md:absolute md:right-8 lg:right-16 xl:right-24 2xl:right-32 md:top-1/2 md:-translate-y-1/2 z-20"
          >
            <div className="bg-white border-[3px] border-black p-6 sm:p-8 flex flex-col items-center justify-center aspect-square shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 min-w-[150px] sm:min-w-[180px]">
              <div className="flex items-start gap-0.5">
                <span className="text-5xl sm:text-7xl font-black text-black leading-none font-quicksand">24</span>
                <span className="text-lg sm:text-xl font-bold text-black mt-1 font-quicksand">th</span>
              </div>
              <span className="text-xl sm:text-3xl font-black tracking-[0.05em] text-black uppercase font-quicksand mt-1">
                MARCH
              </span>
              <span className="text-sm sm:text-lg font-bold text-black/60 tracking-[0.3em] font-quicksand mt-1">2026</span>
            </div>
          </motion.div>

          {/* CTA Button - Centered below mobile elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-col items-center mt-10 sm:mt-8 md:mt-3 px-6 gap-3"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdOVbNOzRITQUohHgNSw3S2tos86sIcO_hxVhsJAliTia1Z_w/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 sm:px-10 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#4338ca] to-[#6d28d9] text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:brightness-110 transition-all duration-300 inline-block text-center border border-black"
            >
              Free Registrations
            </a>

            {/* Certificate Highlight Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="mt-2 border border-black rounded-full bg-[#fbbf24] px-4 py-1.5 md:px-6 md:py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            >
              <p className="flex items-center gap-2 md:gap-3 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] text-black uppercase whitespace-nowrap">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-black"></span>
                CERTIFICATE AND GIFTS WILL BE PROVIDED
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 cursor-pointer scroll-bounce-arrow"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-white text-xs sm:text-sm font-bold uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={3} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
