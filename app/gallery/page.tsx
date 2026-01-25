"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface MediaItem {
  id: number
  type: 'image' | 'video'
  src: string
  aspectRatio: number
}

// Sample media items - replace with your actual media
const mediaItems: MediaItem[] = [
  { id: 1, type: 'image', src: '/gallery/img1.jpg', aspectRatio: 1.0 },
  { id: 2, type: 'video', src: '/gallery/vid1.mp4', aspectRatio: 1.0 },
  { id: 3, type: 'image', src: '/gallery/img2.jpg', aspectRatio: 1.0 },
  { id: 4, type: 'image', src: '/gallery/img3.jpg', aspectRatio: 1.0 },
  { id: 5, type: 'video', src: '/gallery/vid2.mp4', aspectRatio: 1.0 },
  { id: 6, type: 'image', src: '/gallery/img4.jpg', aspectRatio: 1.0 },
  { id: 7, type: 'image', src: '/gallery/img5.jpg', aspectRatio: 1.0 },
  { id: 8, type: 'video', src: '/gallery/vid3.mp4', aspectRatio: 1.0 },
  { id: 9, type: 'image', src: '/gallery/img6.jpg', aspectRatio: 1.0 },
  { id: 10, type: 'image', src: '/gallery/img7.jpg', aspectRatio: 1.0 },
  { id: 11, type: 'video', src: '/gallery/vid4.mp4', aspectRatio: 1.0 },
  { id: 12, type: 'image', src: '/gallery/img8.jpg', aspectRatio: 1.0 },
  { id: 13, type: 'image', src: '/gallery/img9.jpg', aspectRatio: 1.0 },
  { id: 14, type: 'video', src: '/gallery/vid5.mp4', aspectRatio: 1.0 },
  { id: 15, type: 'image', src: '/gallery/img10.jpg', aspectRatio: 1.0 },
  { id: 16, type: 'image', src: '/gallery/img11.jpg', aspectRatio: 1.0 },
  { id: 17, type: 'video', src: '/gallery/vid6.mp4', aspectRatio: 1.0 },
  { id: 18, type: 'image', src: '/gallery/img12.jpg', aspectRatio: 1.0 },
  { id: 19, type: 'video', src: '/gallery/vid7.mp4', aspectRatio: 1.0 },
  { id: 20, type: 'image', src: '/gallery/img13.jpg', aspectRatio: 1.0 },
]

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative group overflow-hidden rounded-lg aspect-square"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt=""
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          style={{
            filter: isHovered ? 'saturate(1.1) brightness(1.05)' : 'saturate(0.8) brightness(0.9)',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
      ) : (
        <video
          autoPlay
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          muted
          loop
          playsInline
          style={{
            filter: isHovered ? 'saturate(1.1) brightness(1.05)' : 'saturate(0.8) brightness(0.9)',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          <source src={item.src} type="video/mp4" />
        </video>
      )}
    </motion.div>
  )
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F5F5] mb-4 tracking-tight">
            Gallery
          </h1>
          <p className="text-sm text-[#71717A] tracking-wider uppercase">
            Moments & Memories
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mx-auto max-w-7xl"
        >
          {mediaItems.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Reflective Text Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-light">
            These are the moments that shaped me—captured between code, conversations, and quiet reflection.
            <br />
            Each frame tells a story of exploration, creativity, and the journey of becoming.
          </p>
        </div>
      </motion.div>

      {/* Footer Spacing */}
      <div className="h-20" />
    </div>
  )
}
