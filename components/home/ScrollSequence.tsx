"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ScrollSequenceProps {
  frameCount: number;
  containerRef: React.RefObject<HTMLElement | null>;
}

const ScrollSequence: React.FC<ScrollSequenceProps> = ({
  frameCount,
  containerRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Preload images with priority for the first frame
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Prioritize first frame
    const firstImg = new Image();
    const firstFilename = `frame_${"1".padStart(4, "0")}.jpg`;
    firstImg.src = `/extracted/${firstFilename}`;
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      loadedCount++;
      if (loadedCount === frameCount) setImagesLoaded(true);
    };
    images[0] = firstImg;

    // Load remaining frames in batches/background
    for (let i = 2; i <= frameCount; i++) {
      const img = new Image();
      const filename = `frame_${i.toString().padStart(4, "0")}.jpg`;
      img.src = `/extracted/${filename}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images[i - 1] = img;
    }
    imagesRef.current = images;
  }, [frameCount]);

  // Handle scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index (0 to frameCount - 1)
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Render to canvas
  useEffect(() => {
    const render = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || imagesRef.current.length === 0)
        return;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(index))
      );

      // If the specific frame isn't loaded yet, try to show the first frame or nothing
      const img = imagesRef.current[frameIndex]?.complete ? imagesRef.current[frameIndex] : imagesRef.current[0];

      if (!img || !img.complete) return;

      // Maintain aspect ratio: cover
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Subscribe to index changes
    const unsubscribe = currentIndex.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    // Initial render
    if (firstFrameLoaded) {
        render(currentIndex.get());
    }

    // Handle Window Resize
    const handleResize = () => {
         const canvas = canvasRef.current;
         if(canvas) {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             render(currentIndex.get());
         }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, firstFrameLoaded, frameCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full object-cover z-0"
    />
  );
};

export default ScrollSequence;
