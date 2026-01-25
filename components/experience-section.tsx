"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

interface Signal {
  id: number
  year: string
  title: string
  organization: string
  description: string[]
  x: number
  y: number
  intensity: number
  pulseSpeed: number
  pulseRadius: number
}

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

const signals: Signal[] = [
  {
    id: 0,
    year: "2023–2026",
    title: "Innovation Ambassador",
    organization: "Institution's Innovation Council (IIC), REC",
    description: [
      "Promoted innovation and entrepreneurship across campus",
      "Acted as a bridge between IIC initiatives and student communities",
      "Encouraged participation in innovation challenges and programs",
      "Supported idea-stage students through guidance and exposure",
    ],
    x: 25,
    y: 60,
    intensity: 0.85,
    pulseSpeed: 2.8,
    pulseRadius: 50,
  },
  {
    id: 1,
    year: "2024",
    title: "Events & Operations Head",
    organization: "E-Cell, Raghu Engineering College",
    description: [
      "Organized and managed multiple on-campus and external events",
      "Handled logistics, scheduling, and operational coordination",
      "Worked closely with core teams to streamline execution workflows",
      "Gained hands-on experience in large-scale event management",
    ],
    x: 45,
    y: 35,
    intensity: 0.9,
    pulseSpeed: 2.5,
    pulseRadius: 45,
  },
  {
    id: 2,
    year: "2025",
    title: "Alumni & Community Relations Head",
    organization: "E-Cell, Raghu Engineering College",
    description: [
      "Strengthened alumni engagement through structured communication initiatives",
      "Built and maintained relationships with external mentors and professionals",
      "Enabled knowledge sharing between alumni and current students",
      "Supported community-driven programs and collaborations",
    ],
    x: 65,
    y: 55,
    intensity: 0.95,
    pulseSpeed: 2.2,
    pulseRadius: 40,
  },
  {
    id: 3,
    year: "2026",
    title: "Events & PR Head",
    organization: "E-Cell, Raghu Engineering College",
    description: [
      "Led end-to-end planning and execution of flagship entrepreneurial events",
      "Managed external communications, promotions, and collaborations",
      "Coordinated cross-team workflows to ensure smooth event delivery",
      "Represented E-Cell in outreach and public-facing initiatives",
    ],
    x: 75,
    y: 30,
    intensity: 1.0,
    pulseSpeed: 2.0,
    pulseRadius: 35,
  },
]

export default function ExperienceSection() {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundStarsRef = useRef<BackgroundStar[]>([])
  const shootingStarRef = useRef<ShootingStar | null>(null)
  const constellationLinesRef = useRef<ConstellationLine[]>([])
  const lastShootingStarTime = useRef<number>(0)
  const lastConstellationTime = useRef<number>(0)

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseLeave = () => {
      setCursorPosition(null)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Slow rotation animation (pauses on interaction)
  useEffect(() => {
    if (selectedSignal || hoveredId !== null) return

    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360)
    }, 100)

    return () => clearInterval(rotationInterval)
  }, [selectedSignal, hoveredId])

  // Initialize background stars
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Create static background stars with fade behavior
    backgroundStarsRef.current = Array.from({ length: 80 }, () => {
      const opacity = Math.random() * 0.3 + 0.2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity,
        targetOpacity: opacity,
        fadeSpeed: Math.random() * 0.001 + 0.0005,
        vx: (Math.random() - 0.5) * 0.03, // Slower diagonal drift
        vy: (Math.random() - 0.5) * 0.03,
      }
    })

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animate background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Pause background motion when signal is selected
      const shouldAnimate = !selectedSignal

      // Draw and update background stars with slow drift and fade
      backgroundStarsRef.current.forEach((star) => {
        if (shouldAnimate) {
          // Slow diagonal drift
          star.x += star.vx
          star.y += star.vy

          // Wrap around edges
          if (star.x < 0) star.x = canvas.width
          if (star.x > canvas.width) star.x = 0
          if (star.y < 0) star.y = canvas.height
          if (star.y > canvas.height) star.y = 0

          // Fade in and out softly
          if (Math.abs(star.opacity - star.targetOpacity) < 0.01) {
            star.targetOpacity = Math.random() * 0.3 + 0.2
          }
          star.opacity += (star.targetOpacity - star.opacity) * star.fadeSpeed
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Spawn fading constellation lines occasionally
      if (shouldAnimate && time - lastConstellationTime.current > 5000 + Math.random() * 5000) {
        const star1Idx = Math.floor(Math.random() * backgroundStarsRef.current.length)
        const star2Idx = Math.floor(Math.random() * backgroundStarsRef.current.length)
        
        if (star1Idx !== star2Idx) {
          const star1 = backgroundStarsRef.current[star1Idx]
          const star2 = backgroundStarsRef.current[star2Idx]
          const dx = star1.x - star2.x
          const dy = star1.y - star2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            constellationLinesRef.current.push({
              star1Idx,
              star2Idx,
              opacity: 0.2,
              fadeSpeed: 0.002,
              active: true,
            })
          }
        }
        lastConstellationTime.current = time
      }

      // Draw and fade constellation lines
      constellationLinesRef.current = constellationLinesRef.current.filter((line) => {
        if (!line.active || line.opacity <= 0) return false

        const star1 = backgroundStarsRef.current[line.star1Idx]
        const star2 = backgroundStarsRef.current[line.star2Idx]

        line.opacity -= line.fadeSpeed
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, line.opacity)})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(star1.x, star1.y)
        ctx.lineTo(star2.x, star2.y)
        ctx.stroke()

        return line.opacity > 0
      })

      // Draw static constellation lines (always visible, very faint)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < backgroundStarsRef.current.length; i++) {
        for (let j = i + 1; j < backgroundStarsRef.current.length; j++) {
          const star1 = backgroundStarsRef.current[i]
          const star2 = backgroundStarsRef.current[j]
          const dx = star1.x - star2.x
          const dy = star1.y - star2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            const opacity = (1 - distance / 80) * 0.08
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(star1.x, star1.y)
            ctx.lineTo(star2.x, star2.y)
            ctx.stroke()
          }
        }
      }

      // Shooting star logic
      if (!shootingStarRef.current || !shootingStarRef.current.active) {
        // Spawn new shooting star more frequently (3-8 seconds)
        if (time - lastShootingStarTime.current > (3000 + Math.random() * 5000)) {
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
        const shooting = shootingStarRef.current
        
        // Update position
        shooting.x += shooting.vx
        shooting.y += shooting.vy
        shooting.opacity -= 0.003

        // Draw shooting star
        if (shooting.opacity > 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shooting.opacity})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(shooting.x, shooting.y)
          ctx.lineTo(shooting.x - shooting.vx * 15, shooting.y - shooting.vy * 15)
          ctx.stroke()

          // Glow effect
          ctx.strokeStyle = `rgba(255, 255, 255, ${shooting.opacity * 0.3})`
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(shooting.x, shooting.y)
          ctx.lineTo(shooting.x - shooting.vx * 15, shooting.y - shooting.vy * 15)
          ctx.stroke()
        } else {
          shooting.active = false
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [selectedSignal])

  const handleSignalClick = (signal: Signal) => {
    setSelectedSignal(signal)
    setIsPaused(true)
  }

  const handleClose = () => {
    setSelectedSignal(null)
    setIsPaused(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // Calculate cursor proximity effect for each signal
  const getSignalOffset = (signal: Signal) => {
    if (!cursorPosition || !containerRef.current || selectedSignal) return { x: 0, y: 0 }

    const rect = containerRef.current.getBoundingClientRect()
    const signalX = (signal.x / 100) * rect.width
    const signalY = (signal.y / 100) * rect.height

    const dx = cursorPosition.x - signalX
    const dy = cursorPosition.y - signalY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Magnetic pull within 100px
    if (distance < 100 && distance > 0) {
      const pullStrength = (1 - distance / 100) * 3
      return {
        x: (dx / distance) * pullStrength,
        y: (dy / distance) * pullStrength,
      }
    }

    return { x: 0, y: 0 }
  }

  // Check if cursor is near a signal
  const getCursorProximity = (signal: Signal) => {
    if (!cursorPosition || !containerRef.current) return 0

    const rect = containerRef.current.getBoundingClientRect()
    const signalX = (signal.x / 100) * rect.width
    const signalY = (signal.y / 100) * rect.height

    const dx = cursorPosition.x - signalX
    const dy = cursorPosition.y - signalY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Return proximity factor (0-1) within 150px
    if (distance < 150) {
      return 1 - distance / 150
    }

    return 0
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
              Each signal represents a phase of leadership, growth, and responsibility.
            </p>
          </div>

          {/* Signals Visualization */}
          <div 
            ref={containerRef}
            className="relative w-full bg-[#0A0A0A] border border-[#A1A1AA]/10 rounded-3xl overflow-hidden"
            style={{ height: "500px" }}
            onClick={handleBackdropClick}
          >
            {/* Background Canvas - Stars & Constellations */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0.6 }}
            />

            {/* Ambient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            {/* Hint Text at Top */}
            {!selectedSignal && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-sm text-[#71717A]">Click any signal to explore</p>
              </div>
            )}

            {/* Signal Nodes with subtle rotation */}
            <svg 
              className="absolute inset-0 w-full h-full transition-transform duration-[3000ms] ease-in-out"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center',
              }}
            >
              {signals.map((signal) => {
                const offset = getSignalOffset(signal)
                const proximity = getCursorProximity(signal)
                const cx = `calc(${signal.x}% + ${offset.x}px)`
                const cy = `calc(${signal.y}% + ${offset.y}px)`
                const isHovered = hoveredId === signal.id
                const isSelected = selectedSignal?.id === signal.id
                const isDimmed = selectedSignal && !isSelected
                const nodeOpacity = isDimmed ? 0.4 : 1

                // Tighter pulse when cursor is near
                const pulseRadiusMultiplier = proximity > 0 ? 0.7 : 1

                return (
                  <g key={signal.id} opacity={nodeOpacity} className="transition-opacity duration-700 ease-in-out">
                    {/* Pulse Rings - animate based on signal properties */}
                    {!isPaused && !isDimmed && (
                      <>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={signal.pulseRadius * pulseRadiusMultiplier}
                          fill="none"
                          stroke="rgba(245, 245, 245, 0.3)"
                          strokeWidth="1"
                          opacity={signal.intensity * 0.6}
                          className="animate-pulse-ring"
                          style={{
                            animation: `pulse-ring ${signal.pulseSpeed}s ease-out infinite`,
                          }}
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={signal.pulseRadius * pulseRadiusMultiplier}
                          fill="none"
                          stroke="rgba(245, 245, 245, 0.2)"
                          strokeWidth="1"
                          opacity={signal.intensity * 0.4}
                          className="animate-pulse-ring"
                          style={{
                            animation: `pulse-ring ${signal.pulseSpeed}s ease-out infinite ${signal.pulseSpeed / 2}s`,
                          }}
                        />
                      </>
                    )}

                    {/* Core Node */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? "18" : isHovered ? "16" : proximity > 0.5 ? "14" : "12"}
                      fill={isSelected ? "#F5F5F5" : "rgba(245, 245, 245, 0.9)"}
                      className="cursor-pointer transition-all duration-500 ease-out"
                      onClick={() => handleSignalClick(signal)}
                      onMouseEnter={() => setHoveredId(signal.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        filter: isSelected
                          ? "drop-shadow(0 0 20px rgba(245, 245, 245, 0.8))"
                          : isHovered
                          ? `drop-shadow(0 0 ${12 + proximity * 6}px rgba(245, 245, 245, 0.6))`
                          : `drop-shadow(0 0 8px rgba(245, 245, 245, ${signal.intensity * 0.5}))`,
                      }}
                    />

                    {/* Hover Label - Short title */}
                    {isHovered && !selectedSignal && (
                      <text
                        x={cx}
                        y={cy}
                        dy="-25"
                        textAnchor="middle"
                        fill="#F5F5F5"
                        fontSize="11"
                        fontWeight="600"
                        className="pointer-events-none select-none animate-fade-in"
                      >
                        {signal.title.split(' ').slice(0, 2).join(' ')}
                      </text>
                    )}

                    {/* Year Label */}
                    <text
                      x={cx}
                      y={cy}
                      dy="40"
                      textAnchor="middle"
                      fill="#A1A1AA"
                      fontSize="12"
                      fontWeight="600"
                      className="pointer-events-none select-none transition-opacity duration-300"
                      style={{
                        opacity: isSelected || isHovered ? 1 : 0.6,
                      }}
                    >
                      {signal.year}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Detail Panel */}
            {selectedSignal && (
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#111111] border-l border-[#A1A1AA]/20 p-8 overflow-y-auto animate-slide-in">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40 transition-colors"
                >
                  <X className="h-4 w-4 text-[#F5F5F5]" />
                </button>

                <div className="space-y-6">
                  {/* Year Badge */}
                  <div className="inline-block px-4 py-2 bg-[#0A0A0A] border border-[#A1A1AA]/20 rounded-full">
                    <span className="text-xs font-semibold text-[#F5F5F5] tracking-wider">
                      {selectedSignal.year}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#F5F5F5] mb-3">
                      {selectedSignal.title}
                    </h3>
                    <p className="text-[#A1A1AA]">{selectedSignal.organization}</p>
                  </div>

                  {/* Impact Level */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#71717A]">Impact Level</span>
                    <div className="flex-1 h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F5F5F5] rounded-full transition-all duration-500"
                        style={{ width: `${selectedSignal.intensity * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#F5F5F5]">
                      {Math.round(selectedSignal.intensity * 100)}%
                    </span>
                  </div>

                  {/* Description */}
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-[#A1A1AA] uppercase tracking-wider mb-4">
                      Key Contributions
                    </h4>
                    <ul className="space-y-3">
                      {selectedSignal.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#A1A1AA]">
                          <span className="text-[#F5F5F5] mt-1 text-lg">▹</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F5F5F5] opacity-40" />
              <span className="text-[#71717A]">Foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F5F5F5] opacity-70" />
              <span className="text-[#71717A]">Growing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F5F5F5]" />
              <span className="text-[#71717A]">Leadership</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            r: 15;
            opacity: 0.6;
          }
          100% {
            r: 60;
            opacity: 0;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
