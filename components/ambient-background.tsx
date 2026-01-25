"use client"

import { useEffect, useState } from "react"

interface DriftingShape {
  id: number
  type: 'feather' | 'bird' | 'dust'
  x: number
  y: number
  delay: number
  duration: number
}

export default function AmbientBackground() {
  const [shapes, setShapes] = useState<DriftingShape[]>([])

  useEffect(() => {
    // Generate a few shapes at random intervals
    const generateShape = () => {
      const types: ('feather' | 'bird' | 'dust')[] = ['feather', 'bird', 'dust']
      const newShape: DriftingShape = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        x: -10, // Start off-screen left
        y: Math.random() * 80 + 10, // Random vertical position
        delay: 0,
        duration: Math.random() * 20 + 40, // 40-60s for slower but visible drift
      }

      setShapes(prev => [...prev.filter(s => Date.now() - s.id < s.duration * 1000), newShape])
    }

    // Generate first few shapes immediately
    generateShape()
    setTimeout(generateShape, 3000)
    setTimeout(generateShape, 6000)

    // Generate new shapes every 10-15 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.2) { // 80% chance to spawn
        generateShape()
      }
    }, Math.random() * 5000 + 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />

      {/* Drifting shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animation: `drift ${shape.duration}s linear forwards`,
            opacity: 0,
          }}
        >
          {shape.type === 'feather' && (
            <svg
              width="60"
              height="100"
              viewBox="0 0 40 80"
              fill="none"
              className="opacity-[0.12]"
            >
              <path
                d="M20 5 Q25 20, 20 35 Q15 50, 20 65 Q22 70, 20 75"
                stroke="rgba(245, 245, 245, 0.6)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M20 10 Q30 15, 25 25 M20 20 Q30 22, 27 30 M20 30 Q32 33, 28 40 M20 40 Q30 42, 26 50"
                stroke="rgba(245, 245, 245, 0.5)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M20 10 Q10 15, 15 25 M20 20 Q10 22, 13 30 M20 30 Q8 33, 12 40 M20 40 Q10 42, 14 50"
                stroke="rgba(245, 245, 245, 0.5)"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
          )}

          {shape.type === 'bird' && (
            <svg
              width="80"
              height="40"
              viewBox="0 0 60 30"
              fill="none"
              className="opacity-[0.08]"
            >
              {/* Simple bird silhouette - two curves for wings */}
              <path
                d="M10 20 Q20 10, 30 15"
                stroke="rgba(245, 245, 245, 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M30 15 Q40 10, 50 20"
                stroke="rgba(245, 245, 245, 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}

          {shape.type === 'dust' && (
            <div className="flex gap-12">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5F5F5] opacity-[0.15]" />
              <div className="w-1 h-1 rounded-full bg-[#F5F5F5] opacity-[0.12]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5F5F5] opacity-[0.15]" />
              <div className="w-1 h-1 rounded-full bg-[#F5F5F5] opacity-[0.10]" />
            </div>
          )}
        </div>
      ))}

      {/* Soft flowing wave effect - very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(245, 245, 245, 0.2) 50%, transparent 100%)',
          animation: 'wave 60s ease-in-out infinite',
        }}
      />
    </div>
  )
}
