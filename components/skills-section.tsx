"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkle,
  Sparkles,
  TrendingUp,
  Quote,
  MousePointer2,
  MousePointerClick,
  MoveHorizontal,
} from "lucide-react"
import { shelves, projectMeta, type Skill, type ShelfAccent } from "@/lib/skills-data"
import { useMediaQuery } from "@/lib/use-media-query"
import Book from "@/components/book"

interface FlatSkill {
  skill: Skill
  shelfId: string
  shelfTitle: string
  accent: ShelfAccent
}

const flatSkills: FlatSkill[] = shelves.flatMap((shelf) =>
  shelf.skills.map((skill) => ({ skill, shelfId: shelf.id, shelfTitle: shelf.title, accent: shelf.accent }))
)

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(shelves[0].id)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const scrollRef = useRef<HTMLDivElement>(null)
  const anchorsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const visibleShelvesRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-shelf-id")
          if (!id) return
          if (entry.isIntersecting) {
            visibleShelvesRef.current.add(id)
          } else {
            visibleShelvesRef.current.delete(id)
          }
        })
        const active = shelves.find((s) => visibleShelvesRef.current.has(s.id))
        if (active) setActiveCategory(active.id)
      },
      { root, rootMargin: "0px -70% 0px 0px", threshold: 0 }
    )

    anchorsRef.current.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const handleTabClick = (shelfId: string) => {
    setActiveCategory(shelfId)
    anchorsRef.current.get(shelfId)?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  const scrollByAmount = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" })
  }

  const getPushX = (index: number) => {
    if (hoveredIndex === null || index === hoveredIndex) return 0
    if (Math.abs(index - hoveredIndex) !== 1) return 0
    return index < hoveredIndex ? -8 : 8
  }

  const openEntry = openIndex !== null ? flatSkills[openIndex] : null

  const handleClose = () => {
    setOpenIndex(null)
    setHoveredIndex(null)
  }

  return (
    <section id="skills" className="py-10 sm:py-14 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="flex items-center justify-center gap-3 text-lg sm:text-xl font-semibold text-white tracking-[0.2em] uppercase">
            <Sparkle className="w-4 h-4 text-[#6fa8ff]" />
            Knowledge Library
            <Sparkle className="w-4 h-4 text-[#6fa8ff]" />
          </h2>
          <div className="mx-auto mt-2 mb-3 h-px w-40 bg-gradient-to-r from-transparent via-[#6fa8ff]/70 to-transparent" />
          <p className="text-white/50 text-sm">
            A collection of skills, tools and technologies I use to build intelligent systems.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category tabs */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1 -mx-1 px-1 flex-1">
              {shelves.map((shelf) => {
                const isActive = shelf.id === activeCategory
                return (
                  <button
                    key={shelf.id}
                    onClick={() => handleTabClick(shelf.id)}
                    className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-colors duration-300 ${
                      isActive
                        ? "text-white border-[#6fa8ff]/70 bg-[#0d1730] shadow-[0_0_16px_rgba(90,150,255,0.35)]"
                        : "text-white/50 border-white/10 hover:text-white/80 hover:border-white/20"
                    }`}
                  >
                    {shelf.title}
                  </button>
                )
              })}
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-white/30 text-xs shrink-0">
              <Sparkle className="w-3 h-3" />
              Scroll to explore
              <MoveHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Shelf */}
          <div className="relative">
            <button
              onClick={() => scrollByAmount(-1)}
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-[#0a0e1a] border border-[#6fa8ff]/30 text-white/70 hover:text-white hover:border-[#6fa8ff]/60 transition-colors"
              aria-label="Scroll shelf left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-[#0a0e1a] border border-[#6fa8ff]/30 text-white/70 hover:text-white hover:border-[#6fa8ff]/60 transition-colors"
              aria-label="Scroll shelf right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div
              ref={scrollRef}
              className="flex items-end gap-[3px] overflow-x-auto scrollbar-thin pt-6 pb-6 px-1 -mx-1 snap-x snap-proximity"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {flatSkills.map((entry, index) => (
                <div
                  key={`${entry.shelfId}-${entry.skill.name}`}
                  data-shelf-id={entry.shelfId}
                  ref={(node) => {
                    if (node && !anchorsRef.current.has(entry.shelfId)) {
                      anchorsRef.current.set(entry.shelfId, node)
                    }
                  }}
                  className="snap-start shrink-0"
                >
                  <Book
                    skill={entry.skill}
                    accent={entry.accent}
                    isHovered={hoveredIndex === index}
                    pushX={getPushX(index)}
                    reduceMotion={reduceMotion}
                    onOpen={() => setOpenIndex(index)}
                    onHoverStart={() => setHoveredIndex(index)}
                  />
                </div>
              ))}
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

          {/* Open book — expands in flow below the shelf */}
          <AnimatePresence>
            {openEntry && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-8 grid lg:grid-cols-[1fr_300px] gap-5">
                  {/* The open book */}
                  <div className="relative bg-[#0c1120] border border-[#6fa8ff]/20 rounded-2xl shadow-[0_0_60px_rgba(60,100,200,0.15)] overflow-hidden">
                    {/* Bookmark ribbon */}
                    <div
                      className="absolute -top-1 left-6 w-6 h-14 bg-[#3f6fd8] z-10"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)" }}
                    />

                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/40 border border-white/10 hover:border-white/30 transition-colors z-10"
                      aria-label="Close book"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>

                    <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-black/60 to-transparent pointer-events-none" />

                    <div className="grid md:grid-cols-2">
                      {/* LEFT PAGE */}
                      <div className="p-6 sm:p-8 md:border-r md:border-white/5">
                        <div className="flex items-center gap-3 mb-1.5">
                          <openEntry.skill.icon className="w-7 h-7 text-[#8fb4f5]" />
                          <h3 className="text-xl sm:text-2xl font-bold text-white">{openEntry.skill.name}</h3>
                        </div>
                        <p className="text-sm text-white/45 mb-6">{openEntry.skill.tagline}</p>

                        <div className="space-y-5 text-sm text-white/65 leading-relaxed">
                          <div>
                            <h4 className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8fb4f5] mb-1.5">
                              <Sparkle className="w-3 h-3" /> About
                            </h4>
                            <p>{openEntry.skill.description}</p>
                          </div>
                          <div>
                            <h4 className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8fb4f5] mb-2">
                              <Sparkle className="w-3 h-3" /> Why I Use It
                            </h4>
                            <ul className="space-y-1.5">
                              {openEntry.skill.whyPoints.map((point) => (
                                <li key={point} className="flex items-start gap-2">
                                  <span className="text-[#6fa8ff] mt-1">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PAGE */}
                      <div className="relative p-6 sm:p-8 bg-black/20">
                        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/10 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/10 pointer-events-none" />

                        <h4 className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8fb4f5] mb-4">
                          <Sparkle className="w-3 h-3" /> Used In Projects
                        </h4>

                        {openEntry.skill.usedEverywhere ? (
                          <p className="text-sm text-white/55 leading-relaxed">
                            Used across every project in this portfolio.
                          </p>
                        ) : openEntry.skill.projects.length > 0 ? (
                          <ul className="space-y-2.5">
                            {openEntry.skill.projects.map((project, i) => {
                              const meta = projectMeta[project]
                              const ProjectIcon = meta?.icon
                              return (
                                <motion.li
                                  key={project}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                                  className="flex items-center gap-3 p-2.5 rounded-lg border border-white/10 bg-white/[0.02]"
                                >
                                  <div className="w-8 h-8 shrink-0 rounded-md bg-[#132038] border border-[#6fa8ff]/20 flex items-center justify-center">
                                    {ProjectIcon && <ProjectIcon className="w-4 h-4 text-[#8fb4f5]" />}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-white truncate">{project}</p>
                                    {meta && <p className="text-xs text-white/45 truncate">{meta.blurb}</p>}
                                  </div>
                                  <Check className="w-4 h-4 text-[#6fa8ff]/70 shrink-0" />
                                </motion.li>
                              )
                            })}
                          </ul>
                        ) : (
                          <p className="text-sm text-white/50 italic leading-relaxed">
                            Foundational knowledge — applied throughout coursework and problem-solving
                            rather than tied to a single project.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-2xl border border-white/10 bg-[#0c1120]">
                      <h4 className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8fb4f5] mb-3">
                        <Sparkles className="w-3.5 h-3.5" /> Related Technologies
                      </h4>
                      {openEntry.skill.related.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {openEntry.skill.related.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-medium bg-white/5 text-white border border-white/10 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-white/40 italic">Stands on its own.</p>
                      )}
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#0c1120]">
                      <h4 className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8fb4f5] mb-3">
                        <TrendingUp className="w-3.5 h-3.5" /> Proficiency
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #7c6fe0, #6fa8ff)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${openEntry.skill.proficiency}%` }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-white shrink-0">
                          {openEntry.skill.proficiency}%
                        </span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#0c1120]">
                      <Quote className="w-4 h-4 text-[#6fa8ff]/60 mb-2" />
                      <p className="text-sm italic text-white/70 leading-relaxed">{openEntry.skill.quote}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer hint */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/35">
            <span className="flex items-center gap-1.5">
              <MousePointer2 className="w-3.5 h-3.5" /> Hover over books
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5" /> Click to open
            </span>
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-3.5 h-3.5" /> Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
