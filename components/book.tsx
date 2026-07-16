"use client"

import { motion } from "framer-motion"
import { Sparkle } from "lucide-react"
import type { Skill, ShelfAccent } from "@/lib/skills-data"

interface BookProps {
  skill: Skill
  accent: ShelfAccent
  isHovered: boolean
  pushX: number
  reduceMotion: boolean
  onOpen: () => void
  onHoverStart: () => void
}

const SILVER = "#eef2fa"

function seedFor(name: string) {
  return name.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
}

export default function Book({
  skill,
  accent,
  isHovered,
  pushX,
  reduceMotion,
  onOpen,
  onHoverStart,
}: BookProps) {
  const seed = seedFor(skill.name)
  const height = 148 + (seed % 5) * 8 // 148 - 180
  const width = 38 + (seed % 3) * 4 // 38 - 46
  const baseTilt = ((seed % 7) - 3) * 0.5 // -1.5 .. 1.5 deg, permanent imperfection
  const isBlue = accent.tone === "blue"

  const rest = { x: pushX, y: 0, rotateZ: baseTilt, rotateY: 0, scale: 1 }
  const active = { x: pushX, y: -12, rotateZ: baseTilt - 3, rotateY: -18, scale: 1.06 }

  const glitterDots = isBlue
    ? Array.from({ length: 5 }, (_, i) => ({
        x: 12 + ((seed * (i + 3)) % 76),
        y: 10 + ((seed * (i + 5)) % 80),
        delay: (i * 0.6) % 2.4,
      }))
    : []

  const SkillIcon = skill.icon

  return (
    <motion.button
      onClick={onOpen}
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
          boxShadow: isBlue
            ? "inset 2px 0 0 rgba(255,255,255,0.1), inset -3px 0 0 rgba(0,0,0,0.6)"
            : "inset 2px 0 0 rgba(255,255,255,0.6), inset -3px 0 0 rgba(120,135,160,0.45)",
        }}
      >
        {isBlue ? (
          <>
            {/* galaxy depth wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(140% 90% at 30% 10%, rgba(140,175,255,0.22) 0%, transparent 55%)",
              }}
            />
            {/* tiny star glitter */}
            {glitterDots.map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 1.4,
                  height: 1.4,
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  background: SILVER,
                  opacity: 0.7,
                  animation: reduceMotion ? "none" : `book-twinkle 3.2s ease-in-out ${dot.delay}s infinite`,
                }}
              />
            ))}
          </>
        ) : (
          <>
            {/* pearlescent iridescent wash */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(190,210,255,0.35) 30%, rgba(255,255,255,0.15) 55%, rgba(200,190,255,0.3) 80%, rgba(255,255,255,0.5) 100%)",
                backgroundSize: "220% 220%",
                animation: reduceMotion ? "none" : "pearl-shimmer 9s ease-in-out infinite",
              }}
            />
            {/* soft blue-tinted vignette to keep whites from looking flat */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(60,90,150,0.18) 100%)",
              }}
            />
          </>
        )}

        {/* raised spine bands */}
        <div
          className="absolute inset-x-0 top-[14%] h-[3px]"
          style={{
            boxShadow: isBlue
              ? "0 1px 0 rgba(255,255,255,0.18), 0 2px 4px rgba(0,0,0,0.5)"
              : "0 1px 0 rgba(255,255,255,0.8), 0 2px 3px rgba(90,110,150,0.35)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-[14%] h-[3px]"
          style={{
            boxShadow: isBlue
              ? "0 1px 0 rgba(255,255,255,0.18), 0 2px 4px rgba(0,0,0,0.5)"
              : "0 1px 0 rgba(255,255,255,0.8), 0 2px 3px rgba(90,110,150,0.35)",
          }}
        />

        {/* spine icon */}
        <div className="absolute inset-x-0 top-[6%] flex justify-center pointer-events-none">
          <SkillIcon
            className="w-3 h-3"
            style={{
              color: accent.foil,
              opacity: 0.9,
              filter: isBlue ? "drop-shadow(0 0 3px rgba(140,175,255,0.6))" : "none",
            }}
          />
        </div>

        {/* embossed title, vertical */}
        <motion.div
          className="absolute inset-x-0 top-[18%] bottom-[18%] flex items-center justify-center px-1"
          style={{ writingMode: "vertical-rl" }}
          animate={{ filter: isHovered ? "brightness(1.2)" : "brightness(1)" }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="rotate-180 text-[10px] font-semibold tracking-wide leading-tight text-center"
            style={{
              color: accent.foil,
              textShadow: isBlue
                ? "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.25)"
                : "0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(30,45,80,0.35)",
            }}
          >
            {skill.name}
          </span>
        </motion.div>

        {/* spine star */}
        <div className="absolute inset-x-0 bottom-[6%] flex justify-center pointer-events-none">
          <Sparkle
            className="w-2.5 h-2.5"
            style={{ color: accent.foil, opacity: 0.75 }}
          />
        </div>

        {/* hover sheen sweep — light traveling across the cover */}
        <motion.div
          className="absolute inset-y-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.5) 45%, rgba(160,195,255,0.35) 55%, transparent 100%)",
            filter: "blur(2px)",
          }}
          animate={{ x: isHovered ? "260%" : "-140%" }}
          transition={{ duration: isHovered ? 0.9 : 0, ease: "easeInOut" }}
        />

        {/* brief sparkle burst on hover */}
        {!reduceMotion &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2,
                height: 2,
                left: `${25 + i * 25}%`,
                top: `${20 + ((i * 37) % 60)}%`,
                background: SILVER,
                boxShadow: `0 0 4px ${SILVER}`,
              }}
              animate={isHovered ? { opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] } : { opacity: 0 }}
              transition={{ duration: 0.9, delay: i * 0.12, repeat: isHovered ? Infinity : 0, repeatDelay: 1.1 }}
            />
          ))}

        {/* ambient + hover rim glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0.45 }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: isHovered
              ? `0 12px 30px rgba(0,0,0,0.55), 0 0 28px ${accent.rim}`
              : `0 6px 16px rgba(0,0,0,0.4), 0 0 10px ${accent.rim}`,
          }}
        />

        {/* spine sheen */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: isBlue ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.75)" }}
        />
      </div>

      <style jsx>{`
        @keyframes pearl-shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes book-twinkle {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.85;
          }
        }
      `}</style>
    </motion.button>
  )
}
