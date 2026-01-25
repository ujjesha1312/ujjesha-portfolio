'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function GalleryCTASection() {
  const router = useRouter();

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Cinematic Preview Card */}
          <motion.div
            whileHover={{ scale: 1.02, filter: 'brightness(1.15)' }}
            transition={{ duration: 0.5 }}
            className="relative h-[200px] sm:h-[240px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => router.push('/gallery')}
          >
            {/* Blurred Collage Background */}
            <div className="absolute inset-0">
              {/* Background Images - Blurred */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
                <div className="relative overflow-hidden">
                  <img
                    src="/gallery/img1.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-md"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-110 blur-md"
                  >
                    <source src="/gallery/vid1.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="/gallery/img5.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-md"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="/gallery/img3.jpg"
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-md"
                  />
                </div>
              </div>

              {/* Subtle parallax motion on hover */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-light text-[#F5F5F5] mb-2 tracking-tight"
              >
                Peek Into My <span className="italic font-normal">Gallery</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs sm:text-sm text-[#F5F5F5]/70 mb-4 max-w-md"
              >
                Moments from events, places, and people.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#F5F5F5] text-black rounded-full text-xs sm:text-sm font-medium tracking-wide hover:bg-white transition-colors duration-300 shadow-xl"
              >
                Explore Gallery
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>

            {/* Subtle vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
