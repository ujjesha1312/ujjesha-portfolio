"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/lib/use-media-query"

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavigate = (id: string) => {
    setIsOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 250)
  }

  const handleGallery = () => {
    setIsOpen(false)
    window.location.href = "/gallery"
  }

  return (
    <div className="lg:hidden">
      {/* Fixed trigger — always reachable regardless of scroll position */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-4 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white active:scale-95 transition-transform"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[78%] max-w-[320px] bg-[#050608]/95 backdrop-blur-xl border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <span className="text-lg font-bold text-white tracking-tight">UJJESHA</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center gap-1 px-6">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    onClick={() => handleNavigate(item.id)}
                    className="text-left py-4 text-2xl font-medium text-white/80 hover:text-white active:text-white transition-colors border-b border-white/5"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + navItems.length * 0.04, duration: 0.3 }}
                  onClick={handleGallery}
                  className="text-left py-4 text-2xl font-medium text-white/80 hover:text-white active:text-white transition-colors"
                >
                  Gallery
                </motion.button>
              </nav>

              <div className="px-6 pb-8 pt-4 border-t border-white/10">
                <p className="text-xs text-white/40 tracking-wide">Let&apos;s build something together.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
