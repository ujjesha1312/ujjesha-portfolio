"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { shelves } from "@/lib/skills-data"
import { useMediaQuery } from "@/lib/use-media-query"
import AiCore from "@/components/ai-core"

const CATEGORY_ORDER = ["programming", "ai-ml", "frameworks", "core-cs", "tools"]
const orderedShelves = CATEGORY_ORDER.map((id) => shelves.find((s) => s.id === id)!).filter(Boolean)

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(orderedShelves[0].id)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const activeShelf = orderedShelves.find((s) => s.id === activeCategory) ?? orderedShelves[0]

  const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  }

  const chipVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { y: -220 },
        visible: { y: 0, transition: { type: "spring", stiffness: 300, damping: 15, mass: 0.8 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
      }

  return (
    <section id="skills" className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-base font-semibold text-white tracking-widest uppercase">
            Skills &amp; Expertise
          </h2>
          <p className="text-white/50 text-sm mt-2">Click a category to explore skills.</p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[45fr_55fr] gap-10 lg:gap-8 items-center">
          {/* LEFT — AI Core */}
          <div className="flex items-center justify-center">
            <AiCore skills={activeShelf.skills} activeCategory={activeCategory} />
          </div>

          {/* RIGHT — category nav + skill chips */}
          <div className="min-h-[320px] flex flex-col justify-center">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {orderedShelves.map((shelf) => {
                const isActive = shelf.id === activeCategory
                return (
                  <button
                    key={shelf.id}
                    onClick={() => setActiveCategory(shelf.id)}
                    className={`relative whitespace-nowrap pb-2 text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {shelf.title}
                    {isActive && (
                      <motion.span
                        layoutId="skills-nav-underline"
                        className="absolute left-0 right-0 bottom-0 h-px bg-[#6fa8ff]"
                        style={{ boxShadow: "0 0 8px rgba(111,168,255,0.8)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeShelf.id}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-wrap gap-3"
              >
                {activeShelf.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={chipVariants}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-[#6fa8ff]/50 hover:bg-white/[0.08] cursor-default"
                  >
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: "0 0 16px rgba(111,168,255,0.3)" }}
                    />
                    <skill.icon className="relative w-4 h-4 text-[#8fb4f5] shrink-0" />
                    <span className="relative text-sm font-medium text-white whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
