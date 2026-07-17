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

  const gridVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  }

  const tileVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { y: -260 },
        visible: { y: 0, transition: { type: "spring", stiffness: 300, damping: 15, mass: 0.8 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
      }

  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-white tracking-widest uppercase">
            Skills and Expertise
          </h2>
          <p className="text-white/50 text-sm mt-2">
            Systems I&apos;ve learned to build, understand and scale.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
          {/* LEFT — AI Core */}
          <div className="lg:sticky lg:top-24 lg:self-start flex items-center justify-center">
            <AiCore />
          </div>

          {/* RIGHT — category nav + skill grid */}
          <div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
              {orderedShelves.map((shelf) => {
                const isActive = shelf.id === activeCategory
                return (
                  <button
                    key={shelf.id}
                    onClick={() => setActiveCategory(shelf.id)}
                    className={`relative pb-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
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
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
              >
                {activeShelf.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={tileVariants}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-colors duration-300 hover:border-[#6fa8ff]/50 hover:bg-white/[0.06] cursor-default"
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: "0 0 20px rgba(111,168,255,0.3)" }}
                    />
                    <skill.icon className="relative w-5 h-5 text-[#8fb4f5]" />
                    <span className="relative text-xs sm:text-sm font-medium text-white text-center leading-snug">
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
