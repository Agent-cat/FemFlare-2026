"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const categories = ["All", "Leadership", "Community", "Arts", "Fashion", "Tech"];

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="w-full min-h-screen">

      {/* Category Filter */}


      {/* Masonry Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mx-auto px-4 pb-24"
      >
        <AnimatePresence mode='popLayout'>
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              key={`${img.src}-${index}`}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-200"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative w-full">
                 <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAACAABnAAIAAREBAhb/x" // Simple gray blur
                 />
                 {/* Clean image, no overlays */}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 transform hover:rotate-90 duration-300"
                onClick={() => setSelectedImage(null)}
            >
                <X size={40} strokeWidth={1} />
            </button>

            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-[80vh] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        className="object-contain"
                        quality={100}
                    />
                </div>
                {/* No title or description in lightbox as requested */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
