"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [shimmerComplete, setShimmerComplete] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState(0)
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState<number | null>(null)
  const [letterWaveStates, setLetterWaveStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const waveTimersRef = useRef<NodeJS.Timeout[]>([])
  const nameContainerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Initial shimmer completes after letter animations
    const shimmerTimer = setTimeout(() => {
      setShimmerComplete(true)
    }, 3000)
    
    // Breathing animation after reveal
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + 0.01)
    }, 50)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(shimmerTimer)
      clearInterval(breathingInterval)
      waveTimersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [])

  const handleLetterHover = (index: number) => {
    setHoveredLetterIndex(index)
    
    // Clear existing timers
    waveTimersRef.current.forEach(timer => clearTimeout(timer))
    waveTimersRef.current = []
    
    // Calculate wave propagation
    const newWaveStates = [0, 0, 0, 0, 0, 0, 0]
    
    nameLetters.forEach((_, i) => {
      const distance = Math.abs(i - index)
      const delay = distance * 50 // 50ms per letter distance - slightly slower wave
      const intensity = Math.max(0, 1 - distance * 0.3) // Fade with distance, more reach
      
      if (intensity > 0) {
        const timer = setTimeout(() => {
          setLetterWaveStates(prev => {
            const updated = [...prev]
            updated[i] = intensity
            return updated
          })
          
          // Settle back after peak
          const settleTimer = setTimeout(() => {
            setLetterWaveStates(prev => {
              const updated = [...prev]
              updated[i] = 0
              return updated
            })
          }, 300)
          
          waveTimersRef.current.push(settleTimer)
        }, delay)
        
        waveTimersRef.current.push(timer)
      }
    })
  }

  const handleNameMouseLeave = () => {
    setHoveredLetterIndex(null)
    
    // Clear all timers
    waveTimersRef.current.forEach(timer => clearTimeout(timer))
    waveTimersRef.current = []
    
    // Reset all letters smoothly
    setLetterWaveStates([0, 0, 0, 0, 0, 0, 0])
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const nameLetters = ["U", "J", "J", "E", "S", "H", "A"]
  
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "gallery", label: "Gallery", isExternal: true },
  ]

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Cinematic Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10 h-full">
        {/* Top Navigation - Centered at Top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <nav
            className={
              "transition-all duration-1200 delay-300 " +
              (isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4")
            }
          >
            <div className="flex flex-row flex-nowrap items-center justify-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => item.isExternal ? window.location.href = '/gallery' : scrollToSection(item.id)}
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/20 font-medium tracking-wide px-6 py-3 rounded-full transition-all whitespace-nowrap"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 xl:gap-24 items-center h-full py-20">
          
          {/* LEFT SIDE - Text & Identity */}
          <div className="space-y-10 lg:space-y-12">
            
            {/* Enhanced Greeting - Much More Visible */}
            <div
              className={
                "space-y-3 transition-all duration-1200 " +
                (isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12")
              }
            >
              <p className="text-xl sm:text-2xl text-zinc-200 font-light tracking-wide">
                Hello there,
              </p>
            </div>

            {/* Name Section - Cinematic Fantasy Reveal */}
            <div
              className={
                "relative transition-all duration-1200 delay-200 " +
                (isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12")
              }
            >
              <div className="mb-4">
                <span className="text-2xl sm:text-3xl text-zinc-300 font-light tracking-wide">
                  I'm
                </span>
              </div>
              
              {/* Light Sweep Effect */}
              {!shimmerComplete && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    animation: 'lightSweep 2s ease-in-out 0.8s forwards',
                    opacity: 0,
                  }}
                />
              )}
              
              <h1 
                ref={nameContainerRef}
                onMouseLeave={handleNameMouseLeave}
                className="flex items-center select-none relative" 
                style={{ 
                  fontFamily: "'Orbitron', 'Rajdhani', 'Space Grotesk', 'SF Pro Display', system-ui, sans-serif",
                }}
              >
                {nameLetters.map((letter, index) => {
                  const isRevealed = isVisible;
                  const staggerDelay = index * 0.1;
                  const breathingScale = shimmerComplete ? 1 + Math.sin(breathingPhase + index * 0.3) * 0.008 : 1;
                  const breathingY = shimmerComplete ? Math.sin(breathingPhase * 0.7 + index * 0.2) * 1.5 : 0;
                  
                  const waveIntensity = letterWaveStates[index];
                  const waveY = -waveIntensity * 15; // 15px max movement - more visible
                  const waveScale = 1 + (waveIntensity * 0.08); // More noticeable scale
                  
                  return (
                    <span
                      key={index}
                      onMouseEnter={() => handleLetterHover(index)}
                      className="inline-block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none cursor-pointer"
                      style={{
                        color: "#FFFFFF",
                        textShadow: "0 0 60px rgba(255, 255, 255, 0.15), 0 0 100px rgba(255, 255, 255, 0.1)",
                        transform: `
                          translateY(${waveY + breathingY}px)
                          scale(${waveScale * breathingScale})
                        `,
                        transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        display: "inline-block",
                        filter: "brightness(1)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        opacity: isRevealed ? 1 : 0,
                        animation: isRevealed 
                          ? `letterReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}s both` 
                          : 'none',
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </h1>
            </div>

            <style jsx>{`
              @keyframes letterReveal {
                0% {
                  opacity: 0;
                  filter: blur(8px) brightness(0.6);
                  transform: translateY(20px) scale(0.95);
                }
                60% {
                  filter: blur(2px) brightness(1.1);
                }
                100% {
                  opacity: 1;
                  filter: blur(0px) brightness(1);
                  transform: translateY(0px) scale(1);
                }
              }
              
              @keyframes lightSweep {
                0% {
                  opacity: 0;
                  transform: translateX(-100%);
                }
                50% {
                  opacity: 1;
                }
                100% {
                  opacity: 0;
                  transform: translateX(100%);
                }
              }
            `}</style>

            {/* CTA Buttons & Social */}
            <div
              className={
                "space-y-6 transition-all duration-1200 delay-400 " +
                (isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12")
              }
            >
              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => scrollToSection("about")}
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/20 font-medium tracking-wide px-8 py-4 rounded-full transition-all"
                >
                  Get to know me
                </Button>
                
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="group relative bg-white text-black hover:bg-zinc-100 font-medium tracking-wide px-8 py-6 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Work
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/ujjesha1312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-zinc-500 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-600 rounded-lg"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ujjesha-nitya-routhu-5a4938312/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-zinc-500 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-600 rounded-lg"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:hello@ujjesha.com"
                  className="p-2.5 text-zinc-500 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-600 rounded-lg"
                >
                  <Mail className="h-5 w-5" />
                </a>
                
                {/* Status */}
                <div className="flex items-center gap-2 ml-2 pl-4 border-l border-zinc-800">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-zinc-500">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Video Container (Cinematic) */}
          <div
            className={
              "relative transition-all duration-1400 delay-600 " +
              (isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12")
            }
          >
            {/* 4:5 Aspect Ratio Wrapper */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto">
              {/* Video Container with Cinematic Border */}
              <div className="relative h-full rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl shadow-black/50 bg-black">
                {/* Video Element */}
                <video
                  className="w-full h-full object-cover relative z-10"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                >
                  <source src="/hero-montage.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-zinc-700/20 via-transparent to-zinc-700/20 -z-10 blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Cinematic */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-xs text-zinc-500 tracking-[0.3em] uppercase font-light">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-600 via-zinc-700 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
