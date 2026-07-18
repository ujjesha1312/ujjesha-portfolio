"use client"

import { motion } from "framer-motion"
import type { MissionVehicle } from "@/lib/missions-data"

interface MissionCraftProps {
  vehicle: MissionVehicle
  isHovered: boolean
  isDimmed: boolean
  reduceMotion: boolean
  tilt: { x: number; y: number }
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

const PANEL_GRADIENT =
  "repeating-linear-gradient(90deg, rgba(150,190,255,0.35) 0px, rgba(150,190,255,0.35) 1px, transparent 1px, transparent 4px), linear-gradient(120deg, #2c548f, #0d1f38)"
const METAL_GRADIENT = "linear-gradient(135deg, #eef3fb 0%, #a6b7d0 45%, #4b5b74 100%)"

function Satellite({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="relative"
      style={{ width: 56, height: 56 }}
      animate={reduceMotion ? undefined : { rotate: [-7, 7, -7] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Left solar panel */}
      <div
        className="absolute left-1/2 top-1/2 w-6 h-3 rounded-[1px] border border-[#8cb4ff]/30"
        style={{ background: PANEL_GRADIENT, transform: "translate(-30px, -50%) rotate(-6deg)" }}
      />
      {/* Right solar panel */}
      <div
        className="absolute left-1/2 top-1/2 w-6 h-3 rounded-[1px] border border-[#8cb4ff]/30"
        style={{ background: PANEL_GRADIENT, transform: "translate(6px, -50%) rotate(6deg)" }}
      />
      {/* Body */}
      <div
        className="absolute left-1/2 top-1/2 w-4 h-5 rounded-[2px]"
        style={{
          background: METAL_GRADIENT,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(150,180,230,0.55)",
        }}
      />
      {/* Antenna */}
      <div
        className="absolute left-1/2 top-1/2 w-px h-4 bg-white/40"
        style={{ transform: "translate(-50%, -50%) rotate(20deg) translateY(-14px)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-white/70"
        style={{ transform: "translate(2px, -22px)" }}
      />
      {/* Blinking comm light */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{ width: 3, height: 3, background: "#5fa8ff", transform: "translate(-50%, -50%)", boxShadow: "0 0 6px #5fa8ff" }}
        animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

function Beacon({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
      {!reduceMotion &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#6fa8ff]/50"
            style={{ width: 14, height: 14 }}
            animate={{ width: [14, 58], height: [14, 58], opacity: [0.55, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
          />
        ))}
      <div
        className="relative w-2 h-7 rounded-full"
        style={{
          background: "linear-gradient(180deg, #eaf1ff 0%, #4b6fae 60%, #16223d 100%)",
          boxShadow: "0 0 10px rgba(111,168,255,0.55)",
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 5, height: 5, top: 13, background: "#bcd7ff", boxShadow: "0 0 8px #6fa8ff" }}
        animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function Station({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="absolute"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(140,180,255,0.55)" strokeWidth="1.5" strokeDasharray="6 5" />
      </motion.svg>
      <div
        className="relative w-4 h-4 rounded-[3px]"
        style={{ background: METAL_GRADIENT, boxShadow: "0 0 10px rgba(150,180,230,0.55)" }}
      />
      {[0, 120, 240].map((deg) => (
        <div
          key={deg}
          className="absolute w-2.5 h-1.5 rounded-[1px]"
          style={{
            background: "linear-gradient(135deg, #cddcf5, #5a6b85)",
            transform: `rotate(${deg}deg) translate(15px) rotate(-${deg}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default function MissionCraft({
  vehicle,
  isHovered,
  isDimmed,
  reduceMotion,
  tilt,
  onClick,
  onHoverStart,
  onHoverEnd,
}: MissionCraftProps) {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className="relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#6fa8ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{ width: 64, height: 64, perspective: 400 }}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isHovered ? 1.12 : 1,
        rotateZ: isHovered && !reduceMotion ? tilt.x * 8 : 0,
        rotateX: isHovered && !reduceMotion ? -tilt.y * 8 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      aria-label={`Open ${vehicle} mission log`}
    >
      {/* Hover communication wave burst */}
      {isHovered && !reduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-full border border-[#6fa8ff]/50 pointer-events-none"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Ambient glow, stronger on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: isHovered ? 0.9 : 0.35 }}
        transition={{ duration: 0.4 }}
        style={{ boxShadow: "0 0 30px rgba(111,168,255,0.55)", filter: "blur(6px)" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {vehicle === "satellite" && <Satellite reduceMotion={reduceMotion} />}
        {vehicle === "beacon" && <Beacon reduceMotion={reduceMotion} />}
        {vehicle === "station" && <Station reduceMotion={reduceMotion} />}
      </div>
    </motion.button>
  )
}
