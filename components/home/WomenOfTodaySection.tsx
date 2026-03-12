"use client";

import Image from 'next/image';

const WomenOfTodaySection = () => {
  return (
    <section className="relative w-full bg-[#fdf2f8] py-16 md:py-32 overflow-hidden text-black font-sans">

      {/* Decorative animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating gradient circles */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#ec4899]/10 to-[#f97316]/10 blur-2xl"
          style={{ animation: 'anim-glow 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#f97316]/10 to-[#ec4899]/10 blur-2xl"
          style={{ animation: 'anim-glow2 10s ease-in-out 2s infinite' }}
        />

        {/* Small floating dots */}
        {[
          { left: '3%', top: '20%', delay: 0, dur: 6, color: '#ec4899' },
          { left: '92%', top: '30%', delay: 1.5, dur: 7, color: '#f97316' },
          { left: '5%', top: '70%', delay: 3, dur: 5, color: '#f43f5e' },
          { left: '88%', top: '80%', delay: 0.5, dur: 8, color: '#ec4899' },
          { left: '95%', top: '10%', delay: 2, dur: 6, color: '#f97316' },
          { left: '91%', top: '50%', delay: 4, dur: 7, color: '#f43f5e' },
        ].map((dot, i) => (
          <div
            key={`wdot-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ left: dot.left, top: dot.top, backgroundColor: dot.color, animation: `anim-twinkle ${dot.dur}s ease-in-out ${dot.delay}s infinite` }}
          />
        ))}

        {/* Floating diamond shapes */}
        {[
          { left: '4%', top: '40%', delay: 1 },
          { left: '92%', top: '15%', delay: 3 },
          { left: '93%', top: '85%', delay: 0 },
        ].map((d, i) => (
          <div
            key={`wdia-${i}`}
            className="absolute w-4 h-4 border border-[#ec4899]/20"
            style={{ left: d.left, top: d.top, animation: `anim-diamond 8s ease-in-out ${d.delay}s infinite` }}
          />
        ))}

        {/* Animated rings removed - too prominent on content */}

        {/* Classic 5-point stars */}
        {[
          { left: '2%', top: '15%', size: 20, delay: 0, color: '#ec4899' },
          { left: '93%', top: '30%', size: 16, delay: 1.5, color: '#f97316' },
          { left: '3%', top: '65%', size: 22, delay: 2.5, color: '#f43f5e' },
          { left: '90%', top: '80%', size: 14, delay: 0.8, color: '#ec4899' },
          { left: '94%', top: '3%', size: 18, delay: 3, color: '#f97316' },
          { left: '89%', top: '10%', size: 12, delay: 1, color: '#f43f5e' },
          { left: '6%', top: '90%', size: 16, delay: 2, color: '#ec4899' },
        ].map((star, i) => (
          <svg
            key={`w5star-${i}`}
            className="absolute"
            style={{ left: star.left, top: star.top, animation: `anim-star 4s ease-in-out ${star.delay}s infinite` }}
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            fill={star.color}
          >
            <path d="M12 2L14.9 8.6L22 9.5L16.9 14.3L18.2 21.3L12 17.8L5.8 21.3L7.1 14.3L2 9.5L9.1 8.6L12 2Z" />
          </svg>
        ))}

        {/* Twinkling 4-point stars */}
        {[
          { left: '2%', top: '10%', size: 18, delay: 0, color: '#ec4899' },
          { left: '92%', top: '25%', size: 14, delay: 1.2, color: '#f97316' },
          { left: '90%', top: '70%', size: 20, delay: 2, color: '#ec4899' },
          { left: '4%', top: '55%', size: 12, delay: 0.5, color: '#f43f5e' },
          { left: '95%', top: '45%', size: 16, delay: 3, color: '#f97316' },
          { left: '5%', top: '85%', size: 14, delay: 1.8, color: '#ec4899' },
          { left: '96%', top: '5%', size: 10, delay: 2.5, color: '#f43f5e' },
          { left: '88%', top: '90%', size: 16, delay: 0.8, color: '#f97316' },
        ].map((star, i) => (
          <svg
            key={`wstar-${i}`}
            className="absolute"
            style={{ left: star.left, top: star.top, animation: `anim-star4 3.5s ease-in-out ${star.delay}s infinite` }}
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            fill={star.color}
          >
            <path d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z" />
          </svg>
        ))}

        {/* Sparkle bursts */}
        {[
          { left: '89%', top: '12%', size: 16, delay: 1 },
          { left: '3%', top: '35%', size: 12, delay: 2.5 },
          { left: '92%', top: '55%', size: 14, delay: 0.3 },
          { left: '5%', top: '92%', size: 18, delay: 3.5 },
          { left: '91%', top: '92%', size: 10, delay: 1.5 },
        ].map((sparkle, i) => (
          <svg
            key={`wsparkle-${i}`}
            className="absolute"
            style={{ left: sparkle.left, top: sparkle.top, animation: `anim-sparkle 2.5s ease-in-out ${sparkle.delay}s infinite` }}
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="#ec4899"
          >
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
          </svg>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center relative z-10">

        {/* Left Text Content */}
        <div className="w-full md:w-1/2 flex flex-col relative z-10 mb-12 md:mb-0">

          {/* Main Title */}
          <h2 className="flex flex-col mb-8">
            <span className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0f172a] uppercase">
              WOMEN
            </span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#0f172a] uppercase">
              OF TODAY
            </span>
          </h2>

          <p className="max-w-md text-gray-700 text-sm text-justify md:text-base leading-relaxed mb-12 font-semibold">
            Women of today are leaders, innovators, and changemakers shaping every corner of the world.
            They balance strength with compassion, turning challenges into opportunities for growth.
            From classrooms to boardrooms, their voices inspire progress and equality.
            They break barriers, redefine traditions, and create space for future generations.
            Empowered women don’t just follow change—they lead it forward.
          </p>

          <div className="flex flex-col items-start relative group">
            <div className="flex flex-col items-start w-fit">
              <div className="bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent font-black tracking-tighter uppercase flex flex-col">

                <span className="text-3xl sm:text-4xl md:text-6xl">Femflare</span>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-[#ec4899] to-[#f97316] mt-1 mb-4 rounded-full"></div>
            </div>
            <h3 className="uppercase font-bold text-sm tracking-widest text-[#0f172a]">
              2026
            </h3>

            {/* Graphic Number Element Removed */}
          </div>
        </div>

        {/* Right Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative md:-mt-20">
          <div className="relative w-full max-w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
            <Image
              src="/images/FemFlare-3.png"
              alt="Women of Today - FemFlare Illustration"
              width={800}
              height={800}
              className="w-full h-auto object-contain scale-130 sm:scale-140 md:scale-150 lg:scale-180 origin-center"
            />
          </div>
        </div>
      </div>



    </section>
  );
};

export default WomenOfTodaySection;
