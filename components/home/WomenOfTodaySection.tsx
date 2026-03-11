"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WomenOfTodaySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const lines = [
    "Women of today are leaders, innovators, and changemakers shaping every corner of the world.",
    "They balance strength with compassion, turning challenges into opportunities for growth.",
    "From classrooms to boardrooms, their voices inspire progress and equality.",
    "They break barriers, redefine traditions, and create space for future generations.",
    "Empowered women don’t just follow change—they lead it.",
  ];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let ctx = gsap.context(() => {
      // Initial states
      gsap.set(".text-line", { opacity: 0.1, y: 30, filter: "blur(4px)" });
      gsap.set(".quote-mark", { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%", // Pin for longer to allow reading
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animation Sequence
      tl
        // 1. Title animates to make space
        .to(titleRef.current, {
          scale: 0.7,
          y: -50,
          duration: 1,
          ease: "power2.inOut",
        })
        // 2. Quote marks appear
        .to(
          ".quote-mark",
          {
            opacity: 0.4,
            scale: 1,
            duration: 0.5,
          },
          "-=0.5",
        )
        // 3. Text lines reveal one by one
        .to(".text-line", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.8, // Slow stagger for readability
          duration: 1.5,
          color: "#1a1a1a",
          ease: "power2.out",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 bg-gradient-to-bl from-[#f97316] via-[#f43f5e] to-[#ec4899] overflow-hidden text-black font-sans flex items-center justify-center"
    >
      {/* Background Bubbles */}
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

      {/* Background Image Layer - Consistent with Events Page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] z-0 opacity-[0.12] mix-blend-multiply pointer-events-none">
        <Image
          src="/images/women.png"
          alt="Background Texture"
          fill
          className="object-contain grayscale"
          priority
        />
      </div>

      <div
        ref={containerRef}
        className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center h-full relative z-10"
      >
        {/* Main Title */}
        <div ref={titleRef} className="mb-8 relative origin-center">
          <h2 className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center font-oswald text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
            <span className="text-[#1a1a1a]">WOMEN</span>
            <span className="text-transparent stroke-text text-[#1a1a1a]">
              OF TODAY
            </span>
          </h2>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#FF5722] rounded-full"></div>
        </div>

        {/* Description Text */}
        <div
          ref={textContainerRef}
          className="max-w-4xl mx-auto mb-12 relative py-4"
        >
          <span className="quote-mark absolute -top-4 -left-4 md:-left-12 text-6xl md:text-8xl text-[#FF5722] font-serif transition-transform will-change-transform">
            "
          </span>

          <div className="flex flex-col gap-4">
            {lines.map((line, index) => (
              <p
                key={index}
                className="text-line text-lg md:text-2xl text-[#1a1a1a] font-medium leading-relaxed font-serif italic will-change-transform transform-gpu"
              >
                {line}
              </p>
            ))}
          </div>

          <span className="quote-mark absolute -bottom-4 -right-4 md:-right-12 text-6xl md:text-8xl text-[#FF5722] font-serif transition-transform will-change-transform">
            "
          </span>
        </div>
      </div>
    </section>
  );
};

export default WomenOfTodaySection;
