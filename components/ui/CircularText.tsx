"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  radius?: number; // New prop for radius
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  radius = 100 // Default radius (width/2)
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  return (
    <motion.div
      className={`mx-auto rounded-full relative font-black text-center cursor-pointer flex items-center justify-center ${className}`}
      style={{
        width: radius * 2,
        height: radius * 2
      }}
      animate={{ rotate: 360 }}
      transition={{
        ease: "linear",
        duration: spinDuration,
        repeat: Infinity,
      }}
      whileHover={{
         scale: onHover === 'goBonkers' ? 0.8 : 1.1,
         rotate: 360,
         transition: {
             rotate: {
                ease: "linear",
                duration: onHover === 'speedUp' ? spinDuration / 4 : (onHover === 'slowDown' ? spinDuration * 2 : spinDuration),
                repeat: Infinity
             }
         }
      }}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        return (
          <span
            key={i}
            className="absolute uppercase"
            style={{
              height: `${radius}px`, // Dynamic radius
              fontSize: `${radius * 0.2}px`, // Dynamic font size based on radius
              transformOrigin: 'bottom center',
              transform: `rotate(${rotationDeg}deg) translateY(-100%)`,
              left: '50%',
              top: '50%',
              marginLeft: '-0.5em',
              marginTop: '-0.5em'
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
