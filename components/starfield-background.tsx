"use client"

import { useEffect, useRef } from "react"

interface DriftingStar {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  fadeDirection: number
  size: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
}

interface Stardust {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
  life: number
  maxLife: number
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const driftingStars: DriftingStar[] = []
    const shootingStars: ShootingStar[] = [] // Multiple shooting stars
    const stardustParticles: Stardust[] = []
    let nextShootingStarTime = Date.now() + getRandomInterval()
    const starCount = 150 // Increased density for better visibility
    const maxShootingStars = 3 // Allow up to 3 shooting stars at once
    const stardustCount = 80 // More stardust particles

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Random interval between 3-7 seconds for shooting stars (more frequent)
    function getRandomInterval(): number {
      return 3000 + Math.random() * 4000
    }

    // Check if position is in peripheral area (corners and edges)
    const isPeripheral = (x: number, y: number, width: number, height: number): boolean => {
      const centerX = width / 2
      const centerY = height / 2
      const distanceFromCenterX = Math.abs(x - centerX) / centerX
      const distanceFromCenterY = Math.abs(y - centerY) / centerY
      
      // Stars concentrated at edges (>40% distance from center)
      return distanceFromCenterX > 0.4 || distanceFromCenterY > 0.4
    }

    // Create a drifting star in peripheral area
    const createDriftingStar = (): DriftingStar => {
      let x: number, y: number
      const width = canvas.width
      const height = canvas.height
      
      // Keep trying until we get a peripheral position
      do {
        x = Math.random() * width
        y = Math.random() * height
      } while (!isPeripheral(x, y, width, height))

      // Slow diagonal drift (random direction)
      const angle = Math.random() * Math.PI * 2
      const speed = 0.08 + Math.random() * 0.12 // Very slow: 0.08-0.2 px/frame

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 0.3 + Math.random() * 0.5, // Brighter: 0.3-0.8
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        size: 1.5 + Math.random() * 1.5, // Larger stars: 1.5-3px
      }
    }

    // Initialize all drifting stars
    for (let i = 0; i < starCount; i++) {
      driftingStars.push(createDriftingStar())
    }

    // Create a stardust particle anywhere on screen
    const createStardust = (): Stardust => {
      const width = canvas.width
      const height = canvas.height
      
      // Random position anywhere
      const x = Math.random() * width
      const y = Math.random() * height
      
      // Random direction with varied speed
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 0.8 // Faster than drifting stars: 0.3-1.1 px/frame
      
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 0.3 + Math.random() * 0.4, // More visible: 0.3-0.7
        size: 0.8 + Math.random() * 1.2, // Larger: 0.8-2px
        life: 0,
        maxLife: 200 + Math.random() * 200, // Lives 200-400 frames
      }
    }

    // Initialize stardust particles
    for (let i = 0; i < stardustCount; i++) {
      stardustParticles.push(createStardust())
    }

    // Create a shooting star from a random corner
    function createShootingStar(): ShootingStar {
      if (!canvas) return { x: 0, y: 0, length: 0, speed: 0, angle: 0, opacity: 0, active: false }
      
      const width = canvas.width
      const height = canvas.height
      
      // Only spawn from corners
      const corners = [
        // Top-left corner
        { x: 0, y: 0, angle: Math.PI * 0.25 + (Math.random() - 0.5) * 0.3 },
        // Top-right corner
        { x: width, y: 0, angle: Math.PI * 0.65 + (Math.random() - 0.5) * 0.3 },
        // Bottom-right corner
        { x: width, y: height, angle: Math.PI * 1.15 + (Math.random() - 0.5) * 0.3 },
        // Bottom-left corner
        { x: 0, y: height, angle: Math.PI * 1.65 + (Math.random() - 0.5) * 0.3 },
      ]

      const corner = corners[Math.floor(Math.random() * corners.length)]

      return {
        x: corner.x,
        y: corner.y,
        length: 50 + Math.random() * 40, // 50-90px trail
        speed: 5 + Math.random() * 4, // 5-9 pixels per frame
        angle: corner.angle,
        opacity: 1,
        active: true,
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ===== LAYER 1: Drifting Stars =====
      driftingStars.forEach((star) => {
        // Update position (slow drift)
        star.x += star.vx
        star.y += star.vy

        // Update opacity (gentle fade in/out)
        star.opacity += star.fadeDirection * 0.004
        if (star.opacity <= 0.3 || star.opacity >= 0.8) {
          star.fadeDirection *= -1
        }
        star.opacity = Math.max(0.3, Math.min(0.8, star.opacity))

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Draw drifting star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // ===== LAYER 2: Stardust Particles =====
      for (let i = stardustParticles.length - 1; i >= 0; i--) {
        const dust = stardustParticles[i]
        
        // Update position
        dust.x += dust.vx
        dust.y += dust.vy
        dust.life++
        
        // Fade out near end of life
        const lifeFactor = 1 - (dust.life / dust.maxLife)
        const currentOpacity = dust.opacity * lifeFactor
        
        // Wrap around edges
        if (dust.x < 0) dust.x = canvas.width
        if (dust.x > canvas.width) dust.x = 0
        if (dust.y < 0) dust.y = canvas.height
        if (dust.y > canvas.height) dust.y = 0
        
        // Remove and respawn if life expired
        if (dust.life >= dust.maxLife) {
          stardustParticles[i] = createStardust()
        } else {
          // Draw stardust particle
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
          ctx.beginPath()
          ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ===== LAYER 3: Shooting Stars =====
      const currentTime = Date.now()

      // Check if it's time to spawn a new shooting star (more frequent, multiple allowed)
      if (shootingStars.length < maxShootingStars && currentTime >= nextShootingStarTime) {
        shootingStars.push(createShootingStar())
        nextShootingStarTime = currentTime + getRandomInterval()
      }

      // Update and draw all shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        
        // Update position
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Fade out quickly
        star.opacity -= 0.018

        // Check if star is off screen or fully faded
        if (
          star.opacity <= 0 ||
          star.x < -150 ||
          star.x > canvas.width + 150 ||
          star.y < -150 ||
          star.y > canvas.height + 150
        ) {
          // Remove inactive shooting star
          shootingStars.splice(i, 1)
        } else {
          // Draw the shooting star as a thin line with gradient
          const endX = star.x - Math.cos(star.angle) * star.length
          const endY = star.y - Math.sin(star.angle) * star.length

          // Create gradient for the trail
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            endX,
            endY
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.9})`)
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.4})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.lineCap = "round"
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(endX, endY)
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
