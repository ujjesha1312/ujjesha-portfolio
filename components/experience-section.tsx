"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, FileBadge, Images } from "lucide-react"
import { missions, type Mission } from "@/lib/missions-data"
import { useMediaQuery } from "@/lib/use-media-query"
import MissionCraft from "@/components/mission-craft"

interface BackgroundStar {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  fadeSpeed: number
  targetOpacity: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  opacity: number
  active: boolean
}

interface ConstellationLine {
  star1Idx: number
  star2Idx: number
  opacity: number
  fadeSpeed: number
  active: boolean
}

interface Asteroid {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  vr: number
  opacity: number
  points: { angle: number; radius: number }[]
  active: boolean
}

export default function ExperienceSection() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [transmittingId, setTransmittingId] = useState<number | null>(null)
  const [transmitPhase, setTransmitPhase] = useState<"receiving" | "established">("receiving")
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null)
  const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const backgroundStarsRef = useRef<BackgroundStar[]>([])
  const shootingStarRef = useRef<ShootingStar | null>(null)
  const asteroidRef = useRef<Asteroid | null>(null)
  const constellationLinesRef = useRef<ConstellationLine[]>([])
  const hoveredPositionRef = useRef<{ x: number; y: number } | null>(null)
  const lastShootingStarTime = useRef<number>(0)
  const lastConstellationTime = useRef<number>(0)
  const lastAsteroidTime = useRef<number>(0)

  // Track cursor position (used for the subtle "lean toward cursor" hover tilt)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    const handleMouseLeave = () => setCursorPosition(null)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Cache container size (avoids reading the ref during render for tilt math)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Keep the canvas loop aware of which mission is hovered, for the "nearby stars brighten" effect
  useEffect(() => {
    if (hoveredId === null || !containerRef.current) {
      hoveredPositionRef.current = null
      return
    }
    const mission = missions.find((m) => m.id === hoveredId)
    if (!mission) return
    const rect = containerRef.current.getBoundingClientRect()
    hoveredPositionRef.current = { x: (mission.x / 100) * rect.width, y: (mission.y / 100) * rect.height }
  }, [hoveredId])

  // Initialize background stars
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    backgroundStarsRef.current = Array.from({ length: 90 }, () => {
      const opacity = Math.random() * 0.3 + 0.2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity,
        targetOpacity: opacity,
        fadeSpeed: Math.random() * 0.001 + 0.0005,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03,
      }
    })

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animate background: stars, constellations, shooting stars, and a rare drifting asteroid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const shouldAnimate = !selectedMission && !reduceMotion

      backgroundStarsRef.current.forEach((star) => {
        if (shouldAnimate) {
          star.x += star.vx
          star.y += star.vy
          if (star.x < 0) star.x = canvas.width
          if (star.x > canvas.width) star.x = 0
          if (star.y < 0) star.y = canvas.height
          if (star.y > canvas.height) star.y = 0
          if (Math.abs(star.opacity - star.targetOpacity) < 0.01) {
            star.targetOpacity = Math.random() * 0.3 + 0.2
          }
          star.opacity += (star.targetOpacity - star.opacity) * star.fadeSpeed
        }

        let drawOpacity = star.opacity
        const hp = hoveredPositionRef.current
        if (hp) {
          const dx = star.x - hp.x
          const dy = star.y - hp.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) drawOpacity = Math.min(1, star.opacity + (1 - dist / 130) * 0.5)
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${drawOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (shouldAnimate && time - lastConstellationTime.current > 5000 + Math.random() * 5000) {
        const i1 = Math.floor(Math.random() * backgroundStarsRef.current.length)
        const i2 = Math.floor(Math.random() * backgroundStarsRef.current.length)
        if (i1 !== i2) {
          const s1 = backgroundStarsRef.current[i1]
          const s2 = backgroundStarsRef.current[i2]
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y)
          if (dist < 150) {
            constellationLinesRef.current.push({ star1Idx: i1, star2Idx: i2, opacity: 0.2, fadeSpeed: 0.002, active: true })
          }
        }
        lastConstellationTime.current = time
      }

      constellationLinesRef.current = constellationLinesRef.current.filter((line) => {
        if (!line.active || line.opacity <= 0) return false
        const s1 = backgroundStarsRef.current[line.star1Idx]
        const s2 = backgroundStarsRef.current[line.star2Idx]
        line.opacity -= line.fadeSpeed
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, line.opacity)})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(s1.x, s1.y)
        ctx.lineTo(s2.x, s2.y)
        ctx.stroke()
        return line.opacity > 0
      })

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < backgroundStarsRef.current.length; i++) {
        for (let j = i + 1; j < backgroundStarsRef.current.length; j++) {
          const s1 = backgroundStarsRef.current[i]
          const s2 = backgroundStarsRef.current[j]
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y)
          if (dist < 80) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 80) * 0.08})`
            ctx.beginPath()
            ctx.moveTo(s1.x, s1.y)
            ctx.lineTo(s2.x, s2.y)
            ctx.stroke()
          }
        }
      }

      // Shooting star
      if (!shootingStarRef.current || !shootingStarRef.current.active) {
        if (shouldAnimate && time - lastShootingStarTime.current > 3000 + Math.random() * 5000) {
          shootingStarRef.current = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.3,
            vx: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
            vy: Math.random() * 1.5 + 0.5,
            length: Math.random() * 40 + 30,
            opacity: 0.3,
            active: true,
          }
          lastShootingStarTime.current = time
        }
      } else {
        const s = shootingStarRef.current
        s.x += s.vx
        s.y += s.vy
        s.opacity -= 0.003
        if (s.opacity > 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x - s.vx * 15, s.y - s.vy * 15)
          ctx.stroke()
          ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 0.3})`
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x - s.vx * 15, s.y - s.vy * 15)
          ctx.stroke()
        } else {
          s.active = false
        }
      }

      // Rare, slow, dim drifting asteroid
      if (!asteroidRef.current || !asteroidRef.current.active) {
        if (shouldAnimate && time - lastAsteroidTime.current > 18000 + Math.random() * 14000) {
          const fromLeft = Math.random() > 0.5
          const points = Array.from({ length: 6 }, (_, i) => ({
            angle: (i / 6) * Math.PI * 2,
            radius: 2 + Math.random() * 2,
          }))
          asteroidRef.current = {
            x: fromLeft ? -20 : canvas.width + 20,
            y: Math.random() * canvas.height * 0.6 + canvas.height * 0.1,
            vx: (fromLeft ? 1 : -1) * (0.25 + Math.random() * 0.2),
            vy: (Math.random() - 0.5) * 0.1,
            rotation: 0,
            vr: (Math.random() - 0.5) * 0.01,
            opacity: 0.45,
            points,
            active: true,
          }
          lastAsteroidTime.current = time
        }
      } else {
        const a = asteroidRef.current
        a.x += a.vx
        a.y += a.vy
        a.rotation += a.vr
        if (a.x < -30 || a.x > canvas.width + 30) {
          a.active = false
        } else {
          ctx.save()
          ctx.translate(a.x, a.y)
          ctx.rotate(a.rotation)
          ctx.fillStyle = `rgba(150, 165, 195, ${a.opacity})`
          ctx.beginPath()
          a.points.forEach((p, i) => {
            const px = Math.cos(p.angle) * p.radius
            const py = Math.sin(p.angle) * p.radius
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          })
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [selectedMission, reduceMotion])

  const handleMissionClick = (mission: Mission) => {
    if (transmittingId !== null || selectedMission) return
    setTransmittingId(mission.id)
    setTransmitPhase("receiving")
    setTimeout(() => setTransmitPhase("established"), 1000)
    setTimeout(() => {
      setSelectedMission(mission)
      setTransmittingId(null)
    }, 1500)
  }

  const handleClose = () => {
    setSelectedMission(null)
    setHoveredId(null)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const getTilt = (mission: Mission) => {
    if (!cursorPosition || !containerSize || hoveredId !== mission.id) return { x: 0, y: 0 }
    const cx = (mission.x / 100) * containerSize.width
    const cy = (mission.y / 100) * containerSize.height
    const dx = (cursorPosition.x - cx) / 120
    const dy = (cursorPosition.y - cy) / 120
    return { x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) }
  }

  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-base font-semibold text-white tracking-widest uppercase mb-4">
              Experience and Leadership
            </h2>
            <p className="text-sm text-[#71717A] max-w-2xl mx-auto">
              Explore the missions that shaped my journey as an AI engineer, researcher and community leader.
            </p>
          </div>

          {/* Desktop / tablet: mission visualization */}
          <div
            ref={containerRef}
            className="hidden sm:block relative w-full bg-[#05070d] border border-[#6fa8ff]/10 rounded-3xl overflow-hidden"
            style={{ height: "500px" }}
            onClick={handleBackdropClick}
          >
            {/* Nebula dust */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute w-[420px] h-[420px] rounded-full bg-[#3d5fd8]/[0.07] blur-3xl"
                style={{ top: "-10%", left: "5%", animation: reduceMotion ? "none" : "nebula-drift-1 70s ease-in-out infinite" }}
              />
              <div
                className="absolute w-[360px] h-[360px] rounded-full bg-[#6b4fd8]/[0.06] blur-3xl"
                style={{ bottom: "-15%", right: "10%", animation: reduceMotion ? "none" : "nebula-drift-2 85s ease-in-out infinite" }}
              />
            </div>

            {/* Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />

            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            {!selectedMission && transmittingId === null && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-sm text-[#71717A] tracking-wide">Click a mission to receive its transmission</p>
              </div>
            )}

            {/* Mission crafts */}
            {missions.map((mission) => {
              const isHovered = hoveredId === mission.id
              const isSelected = selectedMission?.id === mission.id
              const isDimmed = Boolean(selectedMission) && !isSelected

              return (
                <div key={mission.id}>
                  <div
                    className="absolute"
                    style={{ left: `${mission.x}%`, top: `${mission.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <MissionCraft
                      vehicle={mission.vehicle}
                      isHovered={isHovered}
                      isDimmed={isDimmed}
                      reduceMotion={reduceMotion}
                      tilt={getTilt(mission)}
                      onClick={() => handleMissionClick(mission)}
                      onHoverStart={() => setHoveredId(mission.id)}
                      onHoverEnd={() => setHoveredId(null)}
                    />

                    {/* Hover label */}
                    <AnimatePresence>
                      {isHovered && !selectedMission && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
                        >
                          <p className="text-[10px] text-[#6fa8ff] tracking-widest uppercase mb-0.5">{mission.code}</p>
                          <p className="text-sm font-semibold text-white">{mission.name}</p>
                          <p className="text-xs text-white/50">{mission.role}</p>
                          <p className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400/80">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" /> Status: {mission.status}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}

            {/* Transmission sequence */}
            <AnimatePresence>
              {transmittingId !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                >
                  <div className="text-center font-mono">
                    <p className="text-sm tracking-widest text-[#6fa8ff] mb-4">
                      {transmitPhase === "receiving" ? "RECEIVING TRANSMISSION..." : "CONNECTION ESTABLISHED"}
                    </p>
                    <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden mx-auto">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6fa8ff] to-[#a78bff]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mission Log panel */}
            <MissionPanel mission={selectedMission} onClose={handleClose} />
          </div>

          {/* Mobile: vertical mission console */}
          <div className="sm:hidden space-y-3">
            {missions.map((mission) => (
              <button
                key={mission.id}
                onClick={() => handleMissionClick(mission)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#05070d] border border-[#6fa8ff]/10 text-left"
              >
                <div className="shrink-0 scale-[0.7] -mx-3">
                  <MissionCraft
                    vehicle={mission.vehicle}
                    isHovered={false}
                    isDimmed={false}
                    reduceMotion={reduceMotion}
                    tilt={{ x: 0, y: 0 }}
                    onClick={() => handleMissionClick(mission)}
                    onHoverStart={() => {}}
                    onHoverEnd={() => {}}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-[#6fa8ff] tracking-widest uppercase mb-0.5">{mission.code}</p>
                  <p className="text-sm font-semibold text-white truncate">{mission.name}</p>
                  <p className="text-xs text-white/50 truncate">{mission.role}</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400/80 shrink-0">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" /> {mission.status}
                </span>
              </button>
            ))}

            {/* Transmission + panel reused on mobile via fixed overlay */}
            <AnimatePresence>
              {transmittingId !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                  <div className="text-center font-mono px-6">
                    <p className="text-sm tracking-widest text-[#6fa8ff] mb-4">
                      {transmitPhase === "receiving" ? "RECEIVING TRANSMISSION..." : "CONNECTION ESTABLISHED"}
                    </p>
                    <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden mx-auto">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6fa8ff] to-[#a78bff]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {selectedMission && (
              <div className="fixed inset-0 z-30">
                <MissionPanel mission={selectedMission} onClose={handleClose} fullScreen />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes nebula-drift-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes nebula-drift-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, -15px); }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  )
}

function MissionPanel({
  mission,
  onClose,
  fullScreen,
}: {
  mission: Mission | null
  onClose: () => void
  fullScreen?: boolean
}) {
  if (!mission) return null

  const hasLinks = mission.githubUrl || mission.certificateUrl || (mission.gallery && mission.gallery.length > 0)

  return (
    <div
      className={`bg-[#0a0e1a] border-l border-[#6fa8ff]/20 p-8 overflow-y-auto animate-slide-in z-20 ${
        fullScreen ? "absolute inset-0" : "absolute right-0 top-0 bottom-0 w-full md:w-[460px]"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-black/40 border border-[#6fa8ff]/20 hover:border-[#6fa8ff]/40 transition-colors"
      >
        <X className="h-4 w-4 text-white" />
      </button>

      <div className="space-y-6">
        <div className="flex items-center justify-between pr-10">
          <span className="text-xs font-semibold text-[#6fa8ff] tracking-widest uppercase">{mission.code}</span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {mission.status}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{mission.name}</h3>
          <p className="text-white/50 text-sm">{mission.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] text-sm">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Location</p>
            <p className="text-white">{mission.location}</p>
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Duration</p>
            <p className="text-white">{mission.duration}</p>
          </div>
          <div className="col-span-2">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Mission Type</p>
            <p className="text-white">{mission.missionType}</p>
          </div>
          {mission.project && (
            <div className="col-span-2">
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Mission</p>
              <p className="text-white">{mission.project}</p>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#6fa8ff] uppercase tracking-wider mb-3">Responsibilities</h4>
          <ul className="space-y-2.5">
            {mission.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                <span className="text-[#6fa8ff] mt-0.5">▹</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#6fa8ff] uppercase tracking-wider mb-3">Achievements</h4>
          <ul className="space-y-2.5">
            {mission.achievements.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#6fa8ff] uppercase tracking-wider mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {mission.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium bg-white/5 text-white border border-white/10 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {hasLinks && (
          <div className="flex flex-wrap gap-3 pt-2">
            {mission.githubUrl && (
              <a
                href={mission.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 text-sm text-white transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {mission.certificateUrl && (
              <a
                href={mission.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 text-sm text-white transition-colors"
              >
                <FileBadge className="w-4 h-4" /> Certificate
              </a>
            )}
            {mission.gallery && mission.gallery.length > 0 && (
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white">
                <Images className="w-4 h-4" /> Gallery
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
