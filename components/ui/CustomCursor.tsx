"use client";

import { motion, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);

  // straightforward motion values (no springs)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Default opacity 0 until moved/visible
  const opacity = useMotionValue(0);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsVisible(true);
    // Explicitly set opacity to 1 on mount if visible
    opacity.set(1);

    const moveCursor = (e: MouseEvent) => {
      // Direct 1:1 movement
      // Center the 20px (w-5) cursor => subtract 10px
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    window.addEventListener("mousemove", moveCursor);

    // Handle leaving window
    const handleMouseLeave = () => {
        opacity.set(0);
    };

    const handleMouseEnter = () => {
        opacity.set(1);
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive =
            target.tagName.toLowerCase() === "a" ||
            target.tagName.toLowerCase() === "button" ||
            target.closest("a") ||
            target.closest("button") ||
            window.getComputedStyle(target).cursor === "pointer";

        // Optional: We could add scale effect here if desired,
        // but "SimpleMouseFollow" snippet didn't have scaling logic on hover, just opacity on enter/leave.
        // I will keep it simple as requested, but maintaining visibility management.
    };

    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [x, y, opacity]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
      }}
      className="hidden md:block fixed top-0 left-0 w-5 h-5 bg-[#FF5722] rounded-full pointer-events-none z-[9999]"
    />
  );
};

export default CustomCursor;
