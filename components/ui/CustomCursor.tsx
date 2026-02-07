"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Initial setup
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    // Center the cursor elements initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    // Outer circle follows with slight delay for smooth feeling
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    // Dot moves instantly for precision
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.body.style.cursor = 'none';

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isHovering) {
        gsap.to(cursor, {
            scale: 2.5,
            borderColor: "#FF5722",
            backgroundColor: "rgba(255, 87, 34, 0.05)",
            borderWidth: "1px",
            duration: 0.3,
            ease: "back.out(1.7)" // Slight bounce for playful feel
        });
    } else {
        gsap.to(cursor, {
            scale: 1,
            borderColor: "black",
            backgroundColor: "transparent",
            borderWidth: "1px",
            duration: 0.3,
            ease: "power2.out"
        });
    }
  }, [isHovering]);

  useEffect(() => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;
      if (!cursor || !dot) return;

      if (isClicking) {
        gsap.to([cursor, dot], {
            scale: 0.8,
            duration: 0.1,
            ease: "power2.in"
        });
      } else {
        gsap.to(cursor, {
            scale: isHovering ? 2.5 : 1, // Restore to appropriate scale
            duration: 0.2,
            ease: "power2.out"
        });
        gsap.to(dot, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
      }

  }, [isClicking, isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black pointer-events-none z-9999"
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-9999 transition-colors duration-300 ${isHovering ? 'bg-[#FF5722]' : 'bg-black'}`}
      />
    </>
  );
};

export default CustomCursor;
