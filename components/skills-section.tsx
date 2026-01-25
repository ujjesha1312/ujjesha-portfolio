"use client"

import { useState, useEffect, useRef } from "react"

interface Star {
  name: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  cluster: string
}

interface Cluster {
  name: string
  skills: string[]
  centerX: number
  centerY: number
  radius: number
}

const clusters: Cluster[] = [
  {
    name: "Core Programming",
    skills: [
      "C", 
      "Python", 
      "Java", 
      "DSA", 
      "SQL", 
      "HTML", 
      "CSS", 
      "JavaScript", 
      "TypeScript", 
      "React", 
      "Next.js", 
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Flask",
      "Django",
      "React Native",
      "Flutter"
    ],
    centerX: 18,
    centerY: 30,
    radius: 90,
  },
  {
    name: "AI / ML & LLM Systems",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-Learn",
      "PyTorch",
      "Hugging Face",
      "Sentence-Transformers",
      "LangChain",
      "LlamaIndex",
      "FAISS",
      "ChromaDB",
      "SpaCy",
      "NLTK",
      "PyPDF",
      "BeautifulSoup",
      "Regex",
    ],
    centerX: 50,
    centerY: 50,
    radius: 125,
  },
  {
    name: "App & API Development",
    skills: ["FastAPI", "Streamlit", "Gradio"],
    centerX: 82,
    centerY: 30,
    radius: 55,
  },
  {
    name: "Tools & Platforms",
    skills: [
      "VS Code",
      "GitHub",
      "GitHub Copilot",
      "Jupyter Notebook",
      "Google Colab",
      "Power BI",
      "Microsoft Office",
      "Google Workspace",
      "Notion",
      "Figma",
      "Canva",
      "ChatGPT",
      "Gemini",
      "Claude",
      "Perplexity",
      "Grammarly GO",
    ],
    centerX: 25,
    centerY: 70,
    radius: 110,
  },
  {
    name: "Languages & Communication",
    skills: [
      "English",
      "Hindi",
      "Telugu",
      "Spanish",
      "Communication",
      "Hosting",
      "People Management",
    ],
    centerX: 75,
    centerY: 70,
    radius: 75,
  },
]

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredStar, setHoveredStar] = useState<string | null>(null)
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const starsRef = useRef<Star[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const isPausedRef = useRef(false)
  const hideTooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize stars
    const initializeStars = () => {
      starsRef.current = []

      clusters.forEach((cluster) => {
        cluster.skills.forEach((skillName) => {
          // Position stars in a circle around cluster center
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * cluster.radius * 0.6 + cluster.radius * 0.2

          const x = (cluster.centerX / 100) * canvas.width + Math.cos(angle) * distance
          const y = (cluster.centerY / 100) * canvas.height + Math.sin(angle) * distance

          // Small random velocity for gentle floating
          const velocityAngle = Math.random() * Math.PI * 2
          const speed = 0.1 + Math.random() * 0.15

          starsRef.current.push({
            name: skillName,
            x,
            y,
            vx: Math.cos(velocityAngle) * speed,
            vy: Math.sin(velocityAngle) * speed,
            size: 1 + Math.random() * 1.2,
            cluster: cluster.name,
          })
        })
      })
    }

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        initializeStars()
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections within clusters
      clusters.forEach((cluster) => {
        const clusterStars = starsRef.current.filter((s) => s.cluster === cluster.name)

        // Draw lines between nearby stars in the same cluster
        for (let i = 0; i < clusterStars.length; i++) {
          for (let j = i + 1; j < clusterStars.length; j++) {
            const s1 = clusterStars[i]
            const s2 = clusterStars[j]
            const dx = s1.x - s2.x
            const dy = s1.y - s2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Only connect close stars
            if (distance < 90) {
              const opacity = Math.max(0, 1 - distance / 90) * 0.15
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(s1.x, s1.y)
              ctx.lineTo(s2.x, s2.y)
              ctx.stroke()
            }
          }
        }
      })

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update position only if NOT paused
        if (!isPausedRef.current) {
          star.x += star.vx
          star.y += star.vy

          // Find cluster bounds
          const cluster = clusters.find((c) => c.name === star.cluster)
          if (cluster) {
            const centerX = (cluster.centerX / 100) * canvas.width
            const centerY = (cluster.centerY / 100) * canvas.height

            // Keep stars within cluster radius
            const dx = star.x - centerX
            const dy = star.y - centerY
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance > cluster.radius) {
              // Bounce back towards center
              star.vx *= -0.8
              star.vy *= -0.8
            }
          }

          // Bounce off canvas edges
          if (star.x < 20 || star.x > canvas.width - 20) star.vx *= -1
          if (star.y < 20 || star.y > canvas.height - 20) star.vy *= -1
        }

        // Draw star
        const isHovered = hoveredStar === star.name
        const isInSelectedCluster = selectedCluster === star.cluster
        const isInNonSelectedCluster = selectedCluster && selectedCluster !== star.cluster
        
        const size = isHovered ? 5 : 3
        const opacity = isInNonSelectedCluster ? 0.2 : (isHovered ? 1 : 0.7)

        // Glow effect on hover
        if (isHovered) {
          ctx.shadowBlur = 15
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current)
      }
    }
  }, [hoveredStar, selectedCluster])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicking on a star
    for (const star of starsRef.current) {
      const dx = x - star.x
      const dy = y - star.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 10) {
        // Toggle cluster selection
        if (selectedCluster === star.cluster) {
          setSelectedCluster(null)
          isPausedRef.current = false
        } else {
          setSelectedCluster(star.cluster)
          isPausedRef.current = true
        }
        return
      }
    }

    // Clicked outside any star - deselect
    setSelectedCluster(null)
    isPausedRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if hovering over any star
    let found = false
    for (const star of starsRef.current) {
      const dx = x - star.x
      const dy = y - star.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 10) {
        // Clear any pending hide timeout
        if (hideTooltipTimeoutRef.current) {
          clearTimeout(hideTooltipTimeoutRef.current)
          hideTooltipTimeoutRef.current = null
        }
        
        setHoveredStar(star.name)
        setHoveredPosition({ x: e.clientX, y: e.clientY })
        setShowTooltip(true)
        found = true
        break
      }
    }

    if (!found) {
      // Delay hiding the tooltip
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current)
      }
      hideTooltipTimeoutRef.current = setTimeout(() => {
        setHoveredStar(null)
        setHoveredPosition(null)
        setShowTooltip(false)
      }, 800) // Stay visible for 800ms after mouse leaves
    }
  }

  const handleMouseLeave = () => {
    // Delay hiding the tooltip when mouse leaves canvas
    if (hideTooltipTimeoutRef.current) {
      clearTimeout(hideTooltipTimeoutRef.current)
    }
    hideTooltipTimeoutRef.current = setTimeout(() => {
      setHoveredStar(null)
      setHoveredPosition(null)
      setShowTooltip(false)
    }, 800)
  }

  return (
    <section id="skills" className="py-12 sm:py-16 relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-4">
            <h2 className="text-base font-semibold text-white tracking-widest uppercase mb-4">
              Skills & Expertise
            </h2>
          </div>

          {/* Constellation Canvas */}
          <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px]">
            {/* Cluster Labels */}
            {clusters.map((cluster) => (
              <div
                key={cluster.name}
                className="absolute text-[#71717A] text-xs font-semibold tracking-wider uppercase pointer-events-none transition-opacity duration-300"
                style={{
                  left: `${cluster.centerX}%`,
                  top: `${cluster.centerY}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: selectedCluster && selectedCluster !== cluster.name ? 0.3 : 1,
                }}
              >
                {cluster.name}
              </div>
            ))}

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleCanvasClick}
            />

            {/* Hover Tooltip */}
            {hoveredStar && hoveredPosition && showTooltip && (
              <div
                className="fixed z-50 px-5 py-3 bg-[#F5F5F5] text-[#000000] text-sm font-semibold rounded-lg shadow-2xl pointer-events-none transition-all duration-300 ease-out"
                style={{
                  left: `${hoveredPosition.x + 20}px`,
                  top: `${hoveredPosition.y - 15}px`,
                  transform: 'scale(1)',
                  opacity: 1,
                  animation: 'popIn 0.2s ease-out',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-pulse" />
                  {hoveredStar}
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {clusters.map((cluster) => (
              <div
                key={cluster.name}
                className="p-3 bg-[#111111] border border-[#A1A1AA]/10 rounded-lg transition-all duration-300 cursor-pointer hover:border-[#A1A1AA]/30"
                style={{
                  opacity: selectedCluster && selectedCluster !== cluster.name ? 0.4 : 1,
                  transform: selectedCluster === cluster.name ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => {
                  if (selectedCluster === cluster.name) {
                    setSelectedCluster(null)
                    isPausedRef.current = false
                  } else {
                    setSelectedCluster(cluster.name)
                    isPausedRef.current = true
                  }
                }}
              >
                <h4 className="text-[#F5F5F5] text-xs font-semibold mb-1">{cluster.name}</h4>
                <p className="text-[#71717A] text-[10px]">{cluster.skills.length} skills</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
