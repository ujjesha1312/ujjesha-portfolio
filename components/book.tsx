"use client"

import { motion } from "framer-motion"
import type { Skill, ShelfAccent } from "@/lib/skills-data"
import { useMediaQuery } from "@/lib/use-media-query"

interface BookProps {
  skill: Skill
  accent: ShelfAccent
  onOpen: (rect: DOMRect) => void
}

function seedFor(name: string) {
  return name.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
}

export default function Book({ skill, accent, onOpen }: BookProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const seed = seedFor(skill.name)
  const height = 186 + (seed % 5) * 8 // 186 - 218
  const width = 42 + (seed % 3) * 4 // 42 - 50

  return (
    <motion.button
      onClick={(e) => onOpen(e.currentTarget.getBoundingClientRect())}
      className="group relative shrink-0 text-left hover:z-30 focus-visible:z-30 outline-none"
      style={{ width, height, perspective: 700 }}
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      whileFocus={reduceMotion ? undefined : "hover"}
      whileTap={{ scale: 0.97 }}
      aria-label={`Open ${skill.name}`}
    >
      {/* Contact shadow on the shelf */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black pointer-events-none"
        variants={{
          rest: { opacity: 0.25, width: width * 0.75 },
          hover: { opacity: 0.4, width: width * 0.5 },
        }}
        style={{ height: 5, bottom: -8, filter: "blur(4px)" }}
      />

      <motion.div
        className="absolute inset-0 rounded-[3px] overflow-hidden"
        variants={{
          rest: { y: 0, rotateZ: 0, rotateY: 0, scale: 1 },
          hover: { y: -12, rotateZ: -2, rotateY: -20, scale: 1.05 },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "bottom center",
          background: `linear-gradient(105deg, ${accent.spineFrom} 0%, ${accent.spineTo} 100%)`,
          boxShadow: "inset 2px 0 0 rgba(255,255,255,0.07), inset -3px 0 0 rgba(0,0,0,0.55)",
        }}
      >
        {/* subtle worn-linen texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 5px)",
          }}
        />

        {/* spine ridges */}
        <div className="absolute inset-x-0 top-3 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-3 h-px bg-white/10" />

        {/* spine title, vertical */}
        <div
          className="absolute inset-0 flex items-center justify-center px-1"
          style={{ writingMode: "vertical-rl" }}
        >
          <span
            className="rotate-180 text-[10.5px] font-semibold tracking-wide text-[#EFECE3]/90 leading-tight text-center"
            style={{ textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.12)" }}
          >
            {skill.name}
          </span>
        </div>

        {/* rim glow, only on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          style={{ boxShadow: `0 10px 26px rgba(0,0,0,0.55), 0 0 22px ${accent.rim}` }}
        />

        {/* faint spec highlight for a "premium" sheen */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/[0.08]" />
      </motion.div>
    </motion.button>
  )
}
