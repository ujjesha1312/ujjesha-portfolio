"use client"

import { useMediaQuery } from "@/lib/use-media-query"

const STARS = [
  { x: 12, y: 18, size: 1.4, delay: 0 },
  { x: 82, y: 14, size: 1.1, delay: 0.6 },
  { x: 90, y: 42, size: 1.6, delay: 1.4 },
  { x: 78, y: 78, size: 1.2, delay: 0.3 },
  { x: 20, y: 84, size: 1.4, delay: 1.9 },
  { x: 8, y: 55, size: 1, delay: 2.6 },
  { x: 50, y: 6, size: 1.3, delay: 1.1 },
  { x: 60, y: 92, size: 1, delay: 2.2 },
  { x: 30, y: 10, size: 1.1, delay: 0.9 },
  { x: 92, y: 88, size: 1.3, delay: 1.6 },
]

const PARTICLES = [
  { radius: 46, size: 3, duration: 14, delay: 0, reverse: false },
  { radius: 60, size: 2, duration: 20, delay: 2, reverse: true },
  { radius: 72, size: 2.5, duration: 26, delay: 4, reverse: false },
  { radius: 84, size: 2, duration: 32, delay: 1, reverse: true },
]

export default function AiCore() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <div className="relative w-full max-w-[380px] aspect-square mx-auto select-none pointer-events-none">
      {/* Ambient outer halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)",
          filter: "blur(24px)",
          animation: reduceMotion ? "none" : "core-breathe 7s ease-in-out infinite",
        }}
      />

      {/* Nebula dust */}
      <div
        className="absolute w-[55%] h-[55%] rounded-full bg-[#5b6fe0]/10 blur-3xl"
        style={{ top: "5%", left: "0%", animation: reduceMotion ? "none" : "nebula-a 26s ease-in-out infinite" }}
      />
      <div
        className="absolute w-[45%] h-[45%] rounded-full bg-[#8b5fd8]/10 blur-3xl"
        style={{ bottom: "5%", right: "0%", animation: reduceMotion ? "none" : "nebula-b 32s ease-in-out infinite" }}
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

      {/* Occasional tiny asteroid passing through */}
      {!reduceMotion && (
        <div
          className="absolute w-[3px] h-[3px] rounded-full bg-[#a8b4d8]"
          style={{ top: "30%", left: "-4%", animation: "asteroid-pass 24s linear infinite" }}
        />
      )}

      {/* Gravitational distortion rings */}
      <div
        className="absolute inset-[8%] rounded-full border border-[#6f8fe0]/15"
        style={{ animation: reduceMotion ? "none" : "ring-pulse 6s ease-in-out infinite" }}
      />
      <div
        className="absolute inset-[16%] rounded-full border border-[#8b6fe0]/15"
        style={{ animation: reduceMotion ? "none" : "ring-pulse 6s ease-in-out infinite 2s" }}
      />

      {/* Orbiting glowing particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            animation: reduceMotion
              ? "none"
              : `${p.reverse ? "orbit-spin-reverse" : "orbit-spin"} ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translateY(-${p.radius}%)`,
              background: "#a8c0ff",
              boxShadow: "0 0 6px rgba(168,192,255,0.9)",
            }}
          />
        </div>
      ))}

      {/* Accretion ring */}
      <div
        className="absolute inset-[22%] rounded-full"
        style={{
          animation: reduceMotion ? "none" : "ring-rotate 24s linear infinite",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(99,140,255,0.55) 20%, transparent 35%, rgba(160,110,255,0.55) 60%, transparent 78%, rgba(99,140,255,0.4) 95%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />
      <div
        className="absolute inset-[22%] rounded-full"
        style={{
          boxShadow: "0 0 40px rgba(110,140,255,0.35), 0 0 80px rgba(140,100,255,0.2)",
        }}
      />

      {/* Event horizon — hollow black center */}
      <div
        className="absolute inset-[30%] rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 35%, #0a0a0f 0%, #000000 65%, #000000 100%)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.6)",
        }}
      />

      <style jsx>{`
        @keyframes core-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        @keyframes nebula-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(18px, 12px); }
        }
        @keyframes nebula-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-14px, -10px); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.04); opacity: 0.15; }
        }
        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes asteroid-pass {
          0%, 82% { opacity: 0; transform: translate(0, 0); }
          85% { opacity: 0.8; }
          94% { opacity: 0.8; transform: translate(340px, 60px); }
          96%, 100% { opacity: 0; transform: translate(360px, 64px); }
        }
      `}</style>
    </div>
  )
}
