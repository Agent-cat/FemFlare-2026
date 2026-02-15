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
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    // Helper to load a single image
    const loadFrame = (index: number) => {
        return new Promise<void>((resolve) => {
            const img = new Image();
            const filename = `frame_${(index + 1).toString().padStart(4, "0")}.jpg`;
            img.src = `/extracted/${filename}`;
            img.onload = () => {
                if(isMounted) {
                    images[index] = img;
                    if (index === 0) setFirstFrameLoaded(true);
                    if (images.filter(x => x).length === frameCount) setImagesLoaded(true);
                }
                resolve();
            };
            img.onerror = () => resolve(); // Resolve even on error to continue
            // If already cached/loaded instantly
            if (img.complete) {
                if (isMounted) images[index] = img;
                if (index === 0) setFirstFrameLoaded(true);
                resolve();
            }
        });
    };

    const loadImages = async () => {
        // 1. Load first frame ASAP (Priority)
        await loadFrame(0);
        if (!isMounted) return;

        // 2. Load next 29 frames (High Priority for initial scroll)
        const initialBatch = Array.from({ length: 29 }, (_, i) => i + 1);
        await Promise.all(initialBatch.map(i => loadFrame(i)));
        if (!isMounted) return;

        // 3. Load the rest in chunks to avoid network congestion
        const remainingStart = 30;
        const chunkSize = 20;

        for (let i = remainingStart; i < frameCount; i += chunkSize) {
            if (!isMounted) return;
            const chunk = Array.from({ length: Math.min(chunkSize, frameCount - i) }, (_, j) => i + j);
            await Promise.all(chunk.map(idx => loadFrame(idx)));
            // Small delay to yield to main thread/other resources
            await new Promise(r => setTimeout(r, 50));
        }
    };

    loadImages();

    return () => {
        isMounted = false;
    };
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
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
  );
};

export default ScrollSequence;
