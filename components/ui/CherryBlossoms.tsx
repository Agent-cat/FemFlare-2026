"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CherryBlossoms = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of petals to avoid constant re-renders
    const petalCount = 30;
    const newPetals = Array.from({ length: petalCount }, (_, i) => i);
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((i) => (
        <Petal key={i} />
      ))}
    </div>
  );
};

const Petal = () => {
  // Random start position
  const randomX = Math.random() * 100; // vw
  const randomDelay = Math.random() * 10; // s
  const randomDuration = 10 + Math.random() * 10; // s
  const randomSize = 10 + Math.random() * 15; // px

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: -20,
        left: `${randomX}vw`,
        width: randomSize,
        height: randomSize,
        background: 'radial-gradient(circle at 30% 30%, #ffd7e6, #ffb7c5)', // Soft pink gradient
        borderRadius: '100% 0 100% 0', // Petal shape approximation
        opacity: 0.8,
        boxShadow: '0 0 5px rgba(255,183,197,0.5)',
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0], // Gentle sway
        rotate: [0, 360],
        scale: [1, 0.8, 1],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};

export default CherryBlossoms;
