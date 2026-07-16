"use client"

import { useSyncExternalStore } from "react"

export type PlanetVariant =
  | "flagship-moon"
  | "neural-violet"
  | "ringed-azure"
  | "wave-cobalt"
  | "sandstone-amber"
  | "sky-cyan"
  | "grid-indigo"
  | "chroma-prism"

interface PlanetProps {
  variant: PlanetVariant
  size: number
  isSelected: boolean
  isHovered: boolean
}

interface VariantConfig {
  sphere: string
  atmosphere: string
  rimLight: string
  spin: number
}

const CONFIG: Record<PlanetVariant, VariantConfig> = {
  "flagship-moon": {
    sphere:
      "radial-gradient(circle at 32% 28%, #ffffff 0%, #e6e6e6 22%, #b9b9bd 48%, #77787d 75%, #3a3b3f 100%)",
    atmosphere: "rgba(245, 245, 245, 0.55)",
    rimLight: "rgba(255,255,255,0.9)",
    spin: 46,
  },
  "neural-violet": {
    sphere:
      "radial-gradient(circle at 30% 26%, #4c3a72 0%, #33234f 35%, #1c1230 68%, #0a0714 100%)",
    atmosphere: "rgba(168, 111, 255, 0.4)",
    rimLight: "rgba(196, 148, 255, 0.85)",
    spin: 30,
  },
  "ringed-azure": {
    sphere:
      "radial-gradient(circle at 30% 26%, #bfe0ff 0%, #6fa8dc 32%, #3d6fa5 62%, #1c3a5c 100%)",
    atmosphere: "rgba(111, 168, 220, 0.45)",
    rimLight: "rgba(216, 238, 255, 0.9)",
    spin: 52,
  },
  "wave-cobalt": {
    sphere:
      "radial-gradient(circle at 30% 26%, #6f8fd4 0%, #3f5ba3 34%, #223a72 66%, #0e1c3d 100%)",
    atmosphere: "rgba(90, 130, 220, 0.45)",
    rimLight: "rgba(180, 205, 255, 0.85)",
    spin: 34,
  },
  "sandstone-amber": {
    sphere:
      "radial-gradient(circle at 32% 28%, #ffdca3 0%, #e0a95e 35%, #a86f34 68%, #5c3a1a 100%)",
    atmosphere: "rgba(224, 169, 94, 0.4)",
    rimLight: "rgba(255, 224, 170, 0.85)",
    spin: 58,
  },
  "sky-cyan": {
    sphere:
      "radial-gradient(circle at 32% 28%, #dff5ff 0%, #a9d9ec 32%, #5f9bb3 66%, #2c4b57 100%)",
    atmosphere: "rgba(140, 210, 230, 0.35)",
    rimLight: "rgba(220, 245, 255, 0.85)",
    spin: 64,
  },
  "grid-indigo": {
    sphere:
      "radial-gradient(circle at 30% 26%, #5566a8 0%, #313f74 35%, #1c2650 68%, #0a0e24 100%)",
    atmosphere: "rgba(100, 120, 210, 0.4)",
    rimLight: "rgba(170, 185, 255, 0.85)",
    spin: 40,
  },
  "chroma-prism": {
    sphere:
      "radial-gradient(circle at 30% 26%, #6a2f57 0%, #451f3f 35%, #29122b 68%, #0f0713 100%)",
    atmosphere: "rgba(200, 90, 160, 0.4)",
    rimLight: "rgba(255, 170, 220, 0.85)",
    spin: 42,
  },
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}

export default function Planet({ variant, size, isSelected, isHovered }: PlanetProps) {
  const reduceMotion = usePrefersReducedMotion()
  const config = CONFIG[variant]
  const intensity = isSelected ? 1.3 : isHovered ? 1.15 : 1

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Ring (behind sphere) — ringed-azure only */}
      {variant === "ringed-azure" && (
        <div
          className="absolute rounded-[50%] border"
          style={{
            width: size * 1.85,
            height: size * 0.5,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) rotate(-10deg)",
            borderColor: "rgba(210, 232, 250, 0.35)",
            borderWidth: Math.max(1, size * 0.02),
            boxShadow: `0 0 ${size * 0.18}px rgba(180, 215, 240, 0.25)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Atmosphere glow */}
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          background: `radial-gradient(circle, ${config.atmosphere} 0%, transparent 68%)`,
          filter: `blur(${size * 0.06}px)`,
          opacity: intensity - 0.35,
          zIndex: 1,
        }}
      />

      {/* Sphere */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          background: config.sphere,
          boxShadow: `
            inset -${size * 0.09}px -${size * 0.09}px ${size * 0.18}px rgba(0,0,0,0.55),
            inset ${size * 0.05}px ${size * 0.05}px ${size * 0.12}px ${config.rimLight},
            0 0 ${size * 0.22 * intensity}px ${config.atmosphere}
          `,
          zIndex: 2,
        }}
      >
        {/* Rotating texture layer */}
        <div
          className="absolute inset-0"
          style={{
            animation: reduceMotion ? "none" : `planet-spin ${config.spin}s linear infinite`,
          }}
        >
          <PlanetTexture variant={variant} size={size} reduceMotion={reduceMotion} />
        </div>

        {/* Static specular highlight */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 0.28,
            height: size * 0.2,
            left: size * 0.18,
            top: size * 0.14,
            background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            filter: `blur(${size * 0.02}px)`,
          }}
        />
      </div>

      {/* Tiny orbiting satellite — flagship only */}
      {variant === "flagship-moon" && (
        <div
          className="absolute inset-0"
          style={{
            animation: reduceMotion ? "none" : `satellite-orbit ${size < 70 ? 5 : 7}s linear infinite`,
            zIndex: 3,
          }}
        >
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: Math.max(2.5, size * 0.055),
              height: Math.max(2.5, size * 0.055),
              left: "50%",
              top: -size * 0.12,
              boxShadow: "0 0 4px rgba(255,255,255,0.9)",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes planet-spin {
          from { transform: translateX(0); }
          to { transform: translateX(-33%); }
        }
        @keyframes satellite-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes chroma-hue {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(360deg); }
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.9; }
        }
        @keyframes wave-drift {
          from { background-position: 0 0; }
          to { background-position: -200% 0; }
        }
        @keyframes cloud-drift {
          from { transform: translateX(-10%); }
          to { transform: translateX(10%); }
        }
        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.95; }
        }
        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function PlanetTexture({
  variant,
  size,
  reduceMotion,
}: {
  variant: PlanetVariant
  size: number
  reduceMotion: boolean
}) {
  switch (variant) {
    case "flagship-moon": {
      const craters = [
        { x: 28, y: 24, r: 0.16 },
        { x: 58, y: 52, r: 0.11 },
        { x: 20, y: 62, r: 0.09 },
        { x: 68, y: 28, r: 0.07 },
        { x: 44, y: 74, r: 0.12 },
        { x: 76, y: 60, r: 0.06 },
      ]
      return (
        <>
          {craters.map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size * c.r,
                height: size * c.r,
                left: `${c.x}%`,
                top: `${c.y}%`,
                background:
                  "radial-gradient(circle at 35% 30%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 55%, transparent 75%)",
                boxShadow: `inset -${size * 0.01}px -${size * 0.01}px ${size * 0.02}px rgba(255,255,255,0.15)`,
              }}
            />
          ))}
          <div
            className="absolute rounded-full"
            style={{
              width: size * 0.06,
              height: size * 0.06,
              left: "38%",
              top: "18%",
              background: "rgba(255,255,255,0.8)",
              filter: `blur(${size * 0.015}px)`,
              animation: reduceMotion ? "none" : "sparkle-pulse 3.5s ease-in-out infinite",
            }}
          />
        </>
      )
    }

    case "neural-violet": {
      const particles = [
        { x: 15, y: 30 }, { x: 78, y: 20 }, { x: 25, y: 78 }, { x: 82, y: 68 },
      ]
      return (
        <>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <path
              d="M 15 60 Q 35 30, 55 45 T 90 25"
              fill="none"
              stroke="rgba(196,148,255,0.7)"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 3px rgba(196,148,255,0.8))",
                animation: reduceMotion ? "none" : "circuit-pulse 3s ease-in-out infinite",
              }}
            />
            <path
              d="M 10 25 Q 40 45, 50 75 T 85 80"
              fill="none"
              stroke="rgba(147,197,253,0.55)"
              strokeWidth="1"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 3px rgba(147,197,253,0.7))",
                animation: reduceMotion ? "none" : "circuit-pulse 3.5s ease-in-out infinite 0.6s",
              }}
            />
          </svg>
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-violet-200"
              style={{
                width: 2,
                height: 2,
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: 0.7,
                animation: reduceMotion ? "none" : `sparkle-pulse ${3 + i}s ease-in-out infinite`,
              }}
            />
          ))}
        </>
      )
    }

    case "ringed-azure":
      return (
        <>
          <div
            className="absolute rounded-full"
            style={{
              width: "55%", height: "22%", left: "10%", top: "20%",
              background: "rgba(255,255,255,0.35)",
              filter: `blur(${size * 0.03}px)`,
              animation: reduceMotion ? "none" : "cloud-drift 14s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "40%", height: "16%", left: "35%", top: "55%",
              background: "rgba(255,255,255,0.25)",
              filter: `blur(${size * 0.025}px)`,
              animation: reduceMotion ? "none" : "cloud-drift 18s ease-in-out infinite alternate-reverse",
            }}
          />
        </>
      )

    case "wave-cobalt":
      return (
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 2px, transparent 2px, transparent 14px)",
            backgroundSize: "200% 100%",
            animation: reduceMotion ? "none" : "wave-drift 6s linear infinite",
          }}
        />
      )

    case "sandstone-amber":
      return (
        <>
          <div
            className="absolute rounded-full"
            style={{
              width: "60%", height: "30%", left: "5%", top: "15%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "50%", height: "24%", left: "40%", top: "50%",
              background: "radial-gradient(ellipse, rgba(92,58,26,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "35%", height: "18%", left: "10%", top: "68%",
              background: "radial-gradient(ellipse, rgba(92,58,26,0.28) 0%, transparent 70%)",
            }}
          />
        </>
      )

    case "sky-cyan":
      return (
        <div
          className="absolute rounded-full"
          style={{
            width: "70%", height: "16%", left: "8%", top: "42%",
            background: "rgba(255,255,255,0.3)",
            filter: `blur(${size * 0.02}px)`,
            animation: reduceMotion ? "none" : "cloud-drift 20s ease-in-out infinite alternate",
          }}
        />
      )

    case "grid-indigo": {
      const nodes = [
        { x: 30, y: 35 }, { x: 65, y: 25 }, { x: 45, y: 65 }, { x: 75, y: 60 },
      ]
      return (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(170,185,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(170,185,255,0.18) 1px, transparent 1px)",
              backgroundSize: `${size * 0.22}px ${size * 0.22}px`,
            }}
          />
          {nodes.map((n, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-indigo-200"
              style={{
                width: 3,
                height: 3,
                left: `${n.x}%`,
                top: `${n.y}%`,
                boxShadow: "0 0 4px rgba(170,185,255,0.9)",
                animation: reduceMotion ? "none" : `grid-pulse ${2.5 + i * 0.4}s ease-in-out infinite`,
              }}
            />
          ))}
        </>
      )
    }

    case "chroma-prism":
      return (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,120,190,0.35), rgba(150,110,255,0.3), rgba(120,200,255,0.3), rgba(255,180,110,0.3), rgba(255,120,190,0.35))",
            mixBlendMode: "screen",
            animation: reduceMotion ? "none" : "chroma-hue 12s linear infinite",
          }}
        />
      )

    default:
      return null
  }
}
