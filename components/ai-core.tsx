"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Skill } from "@/lib/skills-data"
import { useMediaQuery } from "@/lib/use-media-query"

interface AiCoreProps {
  skills: Skill[]
  activeCategory: string
}

const CORE_SIZE_DESKTOP = 320
const CORE_SIZE_MOBILE = 224

const STARS = [
  { x: 10, y: 16, size: 1.3, delay: 0 },
  { x: 88, y: 12, size: 1, delay: 0.6 },
  { x: 92, y: 44, size: 1.5, delay: 1.4 },
  { x: 80, y: 82, size: 1.1, delay: 0.3 },
  { x: 16, y: 86, size: 1.3, delay: 1.9 },
  { x: 6, y: 52, size: 1, delay: 2.6 },
  { x: 48, y: 4, size: 1.2, delay: 1.1 },
]

interface RingConfig {
  radius: number
  duration: number
}

function OrbitRing({
  skills,
  ring,
  badgeSize,
  iconSize,
  reduceMotion,
}: {
  skills: Skill[]
  ring: RingConfig
  badgeSize: number
  iconSize: number
  reduceMotion: boolean
}) {
  if (skills.length === 0) return null

  return (
    // Ring: continuously rotates. Everything inside sweeps around with it.
    <div
      className="absolute inset-0"
      style={{ animation: reduceMotion ? "none" : `orbit-ring-spin ${ring.duration}s linear infinite` }}
    >
      <AnimatePresence>
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * 360
          const SkillIcon = skill.icon
          return (
            // Angle slot: static rotation, points this icon's "arm" in its assigned direction.
            <div key={skill.name} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
              {/* Radius offset: static, pushes the icon out along the arm. */}
              <div
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) translateY(-${ring.radius}px)` }}
              >
                {/* Counter-rotation: cancels the ring's spin so the icon itself stays upright. */}
                <div
                  style={{ animation: reduceMotion ? "none" : `orbit-ring-spin-reverse ${ring.duration}s linear infinite` }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="rounded-full bg-black/70 border border-[#6fa8ff]/40 backdrop-blur-sm flex items-center justify-center"
                    style={{ width: badgeSize, height: badgeSize, boxShadow: "0 0 12px rgba(111,168,255,0.35)" }}
                  >
                    <SkillIcon style={{ width: iconSize, height: iconSize }} className="text-[#a8c0ff]" />
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default function AiCore({ skills, activeCategory }: AiCoreProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 639px)")

  const coreSize = isMobile ? CORE_SIZE_MOBILE : CORE_SIZE_DESKTOP
  const coreScale = coreSize / CORE_SIZE_DESKTOP
  const rings: [RingConfig, RingConfig] = [
    { radius: 78 * coreScale, duration: 22 },
    { radius: 122 * coreScale, duration: 34 },
  ]
  const badgeSize = Math.max(28, Math.round(36 * coreScale))
  const iconSize = Math.max(13, Math.round(16 * coreScale))

  const ring1 = skills.filter((_, i) => i % 2 === 0)
  const ring2 = skills.filter((_, i) => i % 2 === 1)

  return (
    <div className="relative select-none" style={{ width: coreSize, height: coreSize }}>
      {/* Ambient outer halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(110,130,255,0.16) 0%, rgba(120,90,240,0.08) 45%, transparent 70%)",
          filter: "blur(20px)",
          animation: reduceMotion ? "none" : "core-breathe 7s ease-in-out infinite",
        }}
      />

      {/* Nebula dust */}
      <div
        className="absolute w-[50%] h-[50%] rounded-full bg-[#5b6fe0]/10 blur-3xl"
        style={{ top: "6%", left: "2%", animation: reduceMotion ? "none" : "nebula-a 26s ease-in-out infinite" }}
      />
      <div
        className="absolute w-[40%] h-[40%] rounded-full bg-[#8b5fd8]/10 blur-3xl"
        style={{ bottom: "6%", right: "2%", animation: reduceMotion ? "none" : "nebula-b 32s ease-in-out infinite" }}
      />

      {/* Tiny sparkling stars */}
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: 0.5,
            animation: reduceMotion ? "none" : `star-twinkle 3.4s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* Orbit rings of skill icons */}
      <OrbitRing skills={ring1} ring={rings[0]} badgeSize={badgeSize} iconSize={iconSize} reduceMotion={reduceMotion} />
      <OrbitRing skills={ring2} ring={rings[1]} badgeSize={badgeSize} iconSize={iconSize} reduceMotion={reduceMotion} />

      {/* Reaction pulse — one-shot burst whenever the category changes */}
      {!reduceMotion && (
        <motion.div
          key={activeCategory}
          className="absolute inset-[30%] rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(140,175,255,0.7)" }}
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}

      {/* Glowing energy core */}
      <div
        className="absolute inset-[32%] rounded-full overflow-hidden"
        style={{ animation: reduceMotion ? "none" : "core-breathe 7s ease-in-out infinite 0.3s" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #d8e2ff 0%, #8fa8f5 30%, #5b6fd8 55%, #2a2f6e 80%, #14163a 100%)",
          }}
        />
        <div
          className="absolute inset-[-40%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.35) 15%, transparent 30%, rgba(160,140,255,0.3) 55%, transparent 72%, rgba(255,255,255,0.2) 90%, transparent 100%)",
            animation: reduceMotion ? "none" : "core-inner-spin 14s linear infinite",
          }}
        />
        {!reduceMotion && (
          <motion.div
            key={`flash-${activeCategory}`}
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </div>
      <div
        className="absolute inset-[32%] rounded-full pointer-events-none"
        style={{ boxShadow: "0 0 30px rgba(150,170,255,0.55), 0 0 60px rgba(140,110,255,0.3)" }}
      />

      <style jsx>{`
        @keyframes core-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes core-inner-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes nebula-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(16px, 10px); }
        }
        @keyframes nebula-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-12px, -8px); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @keyframes orbit-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ring-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
