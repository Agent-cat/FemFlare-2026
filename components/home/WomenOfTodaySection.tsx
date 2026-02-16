"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


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
    "Empowered women don’t just follow change—they lead it."
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
          anticipatePin: 1
        }
      });

      // Animation Sequence
      tl
      // 1. Title animates to make space
      .to(titleRef.current, {
        scale: 0.7,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      })
      // 2. Quote marks appear
      .to(".quote-mark", {
        opacity: 0.4,
        scale: 1,
        duration: 0.5
      }, "-=0.5")
      // 3. Text lines reveal one by one
      .to(".text-line", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.8, // Slow stagger for readability
        duration: 1.5,
        color: "#1a1a1a",
        ease: "power2.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-20 bg-[#e0dac8] overflow-hidden text-black font-sans flex items-center justify-center">

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

      <div ref={containerRef} className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center h-full relative z-10">

        {/* Main Title */}
        <div ref={titleRef} className="mb-8 relative origin-center">


          <h2 className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center font-oswald text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
            <span className="text-[#1a1a1a]">WOMEN</span>
            <span className="text-transparent stroke-text text-[#1a1a1a]">OF TODAY</span>
          </h2>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#FF5722] rounded-full"></div>
        </div>

        {/* Description Text */}
        <div ref={textContainerRef} className="max-w-4xl mx-auto mb-12 relative py-4">
          <span className="quote-mark absolute -top-4 -left-4 md:-left-12 text-6xl md:text-8xl text-[#FF5722] font-serif transition-transform will-change-transform">"</span>

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

          <span className="quote-mark absolute -bottom-4 -right-4 md:-right-12 text-6xl md:text-8xl text-[#FF5722] font-serif transition-transform will-change-transform">"</span>
        </div>

      </div>
    </section>
  );
};

export default WomenOfTodaySection;
