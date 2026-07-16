"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"
import { shelves, type Skill } from "@/lib/skills-data"
import { useMediaQuery } from "@/lib/use-media-query"
import Book from "@/components/book"

interface OpenBook {
  skill: Skill
  shelfTitle: string
  foil: string
  originX: number
  originY: number
}

const BOX_HEIGHT = 420

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(shelves[0].id)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [cursorX, setCursorX] = useState<number | null>(null)
  const [openBook, setOpenBook] = useState<OpenBook | null>(null)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const activeShelf = shelves.find((s) => s.id === activeCategory) ?? shelves[0]
  const count = activeShelf.skills.length

  const handleShelfMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorX((e.clientX - rect.left) / Math.max(1, rect.width))
  }

  const handleShelfMouseLeave = () => {
    setCursorX(null)
    setHoveredIndex(null)
  }

  const getPushX = (index: number) => {
    if (hoveredIndex === null || index === hoveredIndex) return 0
    if (Math.abs(index - hoveredIndex) !== 1) return 0
    return index < hoveredIndex ? -8 : 8
  }

  const getLeanDeg = (index: number) => {
    if (hoveredIndex !== null || cursorX === null || reduceMotion) return 0
    const normPos = count > 1 ? index / (count - 1) : 0.5
    const distance = Math.abs(normPos - cursorX)
    const falloff = Math.max(0, 1 - distance / 0.15)
    if (falloff === 0) return 0
    const sign = normPos < cursorX ? -1 : 1
    return sign * falloff * 2
  }

  const handleOpen = (skill: Skill, shelfTitle: string, foil: string, rect: DOMRect) => {
    setOpenBook({
      skill,
      shelfTitle,
      foil,
      originX: rect.left + rect.width / 2,
      originY: rect.top + rect.height / 2,
    })
  }

  const handleClose = () => {
    setOpenBook(null)
    setHoveredIndex(null)
  }

  const originOffset = openBook
    ? { x: openBook.originX - window.innerWidth / 2, y: openBook.originY - window.innerHeight / 2 }
    : { x: 0, y: 0 }

  return (
    <section id="skills" className="py-10 sm:py-14 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-base font-semibold text-white tracking-widest uppercase">
            Skills & Expertise
          </h2>
          <p className="text-white/50 text-sm mt-1.5">
            My engineering bookshelf — click any book to open it.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative" style={{ minHeight: BOX_HEIGHT }}>
            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1 mb-6 -mx-1 px-1">
              {shelves.map((shelf) => {
                const isActive = shelf.id === activeCategory
                return (
                  <button
                    key={shelf.id}
                    onClick={() => {
                      setActiveCategory(shelf.id)
                      setHoveredIndex(null)
                      setCursorX(null)
                    }}
                    className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 ${
                      isActive ? "text-black" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="skills-tab-pill"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{shelf.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Shelf */}
            <div className="relative">
              <div
                className="flex items-end gap-[3px] overflow-x-auto scrollbar-thin pt-6 pb-6 px-1 -mx-1 snap-x snap-proximity"
                onMouseMove={handleShelfMouseMove}
                onMouseLeave={handleShelfMouseLeave}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {activeShelf.skills.map((skill, index) => (
                    <motion.div
                      key={`${activeShelf.id}-${skill.name}`}
                      layout
                      initial={{ opacity: 0, x: 24, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -24, scale: 0.94 }}
                      transition={{ duration: 0.32, delay: index * 0.018, ease: [0.16, 1, 0.3, 1] }}
                      className="snap-start shrink-0"
                    >
                      <Book
                        skill={skill}
                        accent={activeShelf.accent}
                        isHovered={hoveredIndex === index}
                        pushX={getPushX(index)}
                        leanDeg={getLeanDeg(index)}
                        reduceMotion={reduceMotion}
                        onOpen={(rect) => handleOpen(skill, activeShelf.title, activeShelf.accent.foil, rect)}
                        onHoverStart={() => setHoveredIndex(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating glass shelf */}
              <div className="absolute left-1/4 right-1/4 bottom-3 h-4 bg-[#4d7fe0]/25 blur-2xl rounded-full pointer-events-none" />
              <div className="absolute left-1 right-1 bottom-[27px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <div
                className="absolute left-1 right-1 bottom-6 h-px bg-gradient-to-r from-transparent via-[#6fa8ff]/80 to-transparent pointer-events-none"
                style={{ boxShadow: "0 0 8px rgba(90,150,255,0.55)" }}
              />
              <div className="absolute left-1 right-1 bottom-[18px] h-2 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Open book overlay — expands in place within this same box */}
            <AnimatePresence>
              {openBook && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 backdrop-blur-md rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleClose}
                >
                  <motion.div
                    className="relative w-full max-w-2xl max-h-full overflow-y-auto bg-[#111111] border border-[#A1A1AA]/20 rounded-2xl shadow-2xl mx-4"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.2, rotateY: -35, x: originOffset.x, y: originOffset.y }
                    }
                    animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0, y: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.2, rotateY: 25, x: originOffset.x, y: originOffset.y }
                    }
                    transition={{ type: "spring", stiffness: 210, damping: 26 }}
                    style={{ transformPerspective: 1200 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 p-2 rounded-full bg-[#0A0A0A] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40 transition-colors z-10"
                      aria-label="Close book"
                    >
                      <X className="w-4 h-4 text-[#F5F5F5]" />
                    </button>

                    {/* Spine crease */}
                    <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

                    <div className="grid md:grid-cols-2">
                      {/* LEFT PAGE */}
                      <div className="p-6 sm:p-8 md:border-r md:border-[#A1A1AA]/10">
                        <p className="text-[10px] uppercase tracking-widest text-[#71717A] mb-2">
                          {openBook.shelfTitle}
                        </p>
                        <h3
                          className="text-xl sm:text-2xl font-bold mb-5 pr-8"
                          style={{ color: openBook.foil }}
                        >
                          {openBook.skill.name}
                        </h3>

                        <div className="space-y-4 text-sm text-[#A1A1AA] leading-relaxed">
                          <div>
                            <h4 className="text-[11px] uppercase tracking-wider text-[#71717A] mb-1.5">
                              Description
                            </h4>
                            <p>{openBook.skill.description}</p>
                          </div>
                          <div>
                            <h4 className="text-[11px] uppercase tracking-wider text-[#71717A] mb-1.5">
                              Why I Use It
                            </h4>
                            <p>{openBook.skill.why}</p>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PAGE */}
                      <div className="p-6 sm:p-8 border-t md:border-t-0 border-[#A1A1AA]/10 bg-[#0A0A0A]/40">
                        <h4 className="text-[11px] uppercase tracking-wider text-[#71717A] mb-3">
                          Projects Using This Skill
                        </h4>
                        {openBook.skill.usedEverywhere ? (
                          <p className="text-sm text-[#A1A1AA] leading-relaxed">
                            Used across every project in this portfolio.
                          </p>
                        ) : openBook.skill.projects.length > 0 ? (
                          <ul className="space-y-2.5">
                            {openBook.skill.projects.map((project, index) => (
                              <motion.li
                                key={project}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.12 + index * 0.04, duration: 0.3 }}
                                className="flex items-center gap-2.5 text-sm text-[#F5F5F5]"
                              >
                                <Check className="w-4 h-4 text-[#F5F5F5]/70 shrink-0" />
                                {project}
                              </motion.li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-[#A1A1AA] italic leading-relaxed">
                            Foundational knowledge — applied throughout coursework and
                            problem-solving rather than tied to a single project.
                          </p>
                        )}

                        <h4 className="text-[11px] uppercase tracking-wider text-[#71717A] mt-6 mb-3">
                          Related Technologies
                        </h4>
                        {openBook.skill.related.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {openBook.skill.related.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-medium bg-[#111111] text-[#F5F5F5] border border-[#A1A1AA]/20 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-[#A1A1AA] italic leading-relaxed">
                            Stands on its own.
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
