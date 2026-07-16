"use client"

import { motion } from "framer-motion"
import type { Skill, ShelfAccent } from "@/lib/skills-data"

interface BookProps {
  skill: Skill
  accent: ShelfAccent
  isHovered: boolean
  pushX: number
  leanDeg: number
  reduceMotion: boolean
  onOpen: (rect: DOMRect) => void
  onHoverStart: () => void
}

function seedFor(name: string) {
  return name.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
}

export default function Book({
  skill,
  accent,
  isHovered,
  pushX,
  leanDeg,
  reduceMotion,
  onOpen,
  onHoverStart,
}: BookProps) {
  const seed = seedFor(skill.name)
  const height = 148 + (seed % 5) * 8 // 148 - 180
  const width = 38 + (seed % 3) * 4 // 38 - 46
  const baseTilt = ((seed % 7) - 3) * 0.5 // -1.5 .. 1.5 deg, permanent imperfection

  const rest = { x: pushX, y: 0, rotateZ: baseTilt + leanDeg, rotateY: 0, scale: 1 }
  const active = { x: pushX, y: -12, rotateZ: baseTilt - 3, rotateY: -18, scale: 1.06 }

  return (
    <motion.button
      onClick={(e) => onOpen(e.currentTarget.getBoundingClientRect())}
      onMouseEnter={onHoverStart}
      onFocus={onHoverStart}
      className="group relative shrink-0 text-left outline-none"
      style={{ width, height, perspective: 700 }}
      animate={reduceMotion ? undefined : isHovered ? active : rest}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Open ${skill.name}`}
    >
      {/* Contact shadow on the shelf */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black pointer-events-none"
        animate={{
          opacity: isHovered ? 0.42 : 0.24,
          width: isHovered ? width * 0.5 : width * 0.78,
        }}
        style={{ height: 5, bottom: -7, filter: "blur(4px)" }}
      />

      <div
        className="absolute inset-0 rounded-[2px] overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "bottom center",
          background: `linear-gradient(112deg, ${accent.spineFrom} 0%, ${accent.spineTo} 100%)`,
          boxShadow: "inset 2px 0 0 rgba(255,255,255,0.06), inset -3px 0 0 rgba(0,0,0,0.55)",
        }}
      >
        {/* leather grain */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(118deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)",
          }}
        />
        {/* worn-edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* raised spine bands */}
        <div
          className="absolute inset-x-0 top-[14%] h-[3px]"
          style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.12), 0 2px 3px rgba(0,0,0,0.45)" }}
        />
        <div
          className="absolute inset-x-0 bottom-[14%] h-[3px]"
          style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.12), 0 2px 3px rgba(0,0,0,0.45)" }}
        />

        {/* embossed title, vertical */}
        <div className="absolute inset-0 flex items-center justify-center px-1" style={{ writingMode: "vertical-rl" }}>
          <span
            className="rotate-180 text-[10px] font-semibold tracking-wide leading-tight text-center"
            style={{
              color: accent.foil,
              textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {skill.name}
          </span>
        </div>

        {/* rim glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{ boxShadow: `0 10px 24px rgba(0,0,0,0.55), 0 0 20px ${accent.rim}` }}
        />

        {/* spine sheen */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/[0.09]" />
      </div>
    </motion.button>
  )
}
