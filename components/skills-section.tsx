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
  originX: number
  originY: number
}

export default function SkillsSection() {
  const [openBook, setOpenBook] = useState<OpenBook | null>(null)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const handleOpen = (skill: Skill, shelfTitle: string, rect: DOMRect) => {
    setOpenBook({
      skill,
      shelfTitle,
      originX: rect.left + rect.width / 2,
      originY: rect.top + rect.height / 2,
    })
  }

  const handleClose = () => setOpenBook(null)

  const originOffset = openBook
    ? {
        x: openBook.originX - window.innerWidth / 2,
        y: openBook.originY - window.innerHeight / 2,
      }
    : { x: 0, y: 0 }

  return (
    <section id="skills" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-base font-semibold text-white tracking-widest uppercase">
            Skills & Expertise
          </h2>
          <p className="text-white/50 text-sm mt-2">
            A running library of what I&apos;ve learned — click any book to open it.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14">
          {shelves.map((shelf) => (
            <div key={shelf.id}>
              <h3 className="text-xs font-semibold text-[#A1A1AA] tracking-widest uppercase mb-5">
                {shelf.title}
              </h3>

              <div className="relative">
                <div className="flex items-end gap-3 sm:gap-4 overflow-x-auto scrollbar-thin pt-6 pb-6 px-1 -mx-1 snap-x snap-proximity">
                  {shelf.skills.map((skill) => (
                    <div key={skill.name} className="snap-start">
                      <Book
                        skill={skill}
                        accent={shelf.accent}
                        onOpen={(rect) => handleOpen(skill, shelf.title, rect)}
                      />
                    </div>
                  ))}
                </div>

                {/* Shelf ledge */}
                <div className="absolute left-1 right-1 bottom-6 h-px bg-gradient-to-r from-transparent via-[#A1A1AA]/25 to-transparent pointer-events-none" />
                <div className="absolute left-1 right-1 bottom-[22px] h-2 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open book overlay */}
      <AnimatePresence>
        {openBook && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#111111] border border-[#A1A1AA]/20 rounded-2xl shadow-2xl"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.15, x: originOffset.x, y: originOffset.y }
              }
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.15, x: originOffset.x, y: originOffset.y }
              }
              transition={{ type: "spring", stiffness: 210, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#0A0A0A] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40 transition-colors z-10"
                aria-label="Close book"
              >
                <X className="w-4 h-4 text-[#F5F5F5]" />
              </button>

              {/* Spine crease */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

              <div className="grid md:grid-cols-2">
                {/* LEFT PAGE */}
                <div className="p-8 sm:p-10 md:border-r md:border-[#A1A1AA]/10">
                  <p className="text-[10px] uppercase tracking-widest text-[#71717A] mb-2">
                    {openBook.shelfTitle}
                  </p>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6 pr-8">
                    {openBook.skill.name}
                  </h3>

                  <div className="space-y-5 text-sm text-[#A1A1AA] leading-relaxed">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#71717A] mb-1.5">
                        Description
                      </h4>
                      <p>{openBook.skill.description}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#71717A] mb-1.5">
                        Why I Use It
                      </h4>
                      <p>{openBook.skill.why}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#71717A] mb-1.5">
                        What I Build With It
                      </h4>
                      <p>{openBook.skill.buildWith}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT PAGE */}
                <div className="p-8 sm:p-10 border-t md:border-t-0 border-[#A1A1AA]/10 bg-[#0A0A0A]/40">
                  <h4 className="text-xs uppercase tracking-wider text-[#71717A] mb-4">
                    Used In Projects
                  </h4>

                  {openBook.skill.usedEverywhere ? (
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      Used across every project in this portfolio.
                    </p>
                  ) : openBook.skill.projects.length > 0 ? (
                    <ul className="space-y-3">
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
                      Foundational knowledge — applied throughout coursework and problem-solving
                      rather than tied to a single project.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
