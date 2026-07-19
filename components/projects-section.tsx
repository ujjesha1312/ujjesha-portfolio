"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Planet, { type PlanetVariant } from "@/components/planet"
import { useMediaQuery } from "@/lib/use-media-query"

interface Project {
  id: number
  title: string
  shortTitle: string
  tagline: string
  description: string
  tags: string[]
  category: string
  liveUrl?: string
  githubUrl: string
  icon: string
  planet: PlanetVariant
  orbitRadius: number
  orbitSpeed: number
  featured?: boolean
  badge?: string
}

const projects: Project[] = [
  {
    id: 0,
    title: "DisasterVision",
    shortTitle: "DisasterVision",
    tagline: "AI-Powered Multimodal Disaster Intelligence Platform",
    description:
      "DisasterVision is an AI-powered platform developed during my AI/ML Internship at NRSC–ISRO. It analyzes disaster imagery using modern Vision-Language AI, combining computer vision, multimodal reasoning, and retrieval techniques to generate contextual insights and support faster disaster assessment. The platform also includes an intelligent chatbot that answers questions based on the uploaded image, providing an interactive and user-friendly experience.",
    tags: ["Python", "FastAPI", "React", "Tailwind CSS", "PyTorch", "Hugging Face Transformers", "Computer Vision", "Vision-Language Models", "RAG", "ChromaDB"],
    category: "Multimodal AI / Disaster Intelligence",
    githubUrl: "https://github.com/ujjesha1312/DisasterVision",
    icon: "🛰️",
    planet: "flagship-moon",
    orbitRadius: 100,
    orbitSpeed: 38,
    featured: true,
    badge: "Featured · Built during NRSC–ISRO Internship",
  },
  {
    id: 1,
    title: "Memorg",
    shortTitle: "Memorg",
    tagline: "AI Memory & Knowledge System",
    description:
      "An enterprise-ready long-term memory system for AI agents that combines Retrieval-Augmented Generation (RAG), semantic search, and vector databases to create persistent, intelligent knowledge retrieval across documents and conversations.",
    tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "OpenAI", "Embeddings", "RAG"],
    category: "Agentic AI / Enterprise Knowledge Management",
    githubUrl: "https://github.com/Vishal-code-E/Memorg",
    icon: "🧠",
    planet: "grid-indigo",
    orbitRadius: 140,
    orbitSpeed: 58,
  },
  {
    id: 2,
    title: "Banking Data Assistant",
    shortTitle: "Banking Assistant",
    tagline: "Agentic Banking Analytics",
    description:
      "An AI-powered banking assistant that enables natural language interaction with structured financial data using LLMs, intelligent query generation, and enterprise-grade backend architecture.",
    tags: ["Python", "FastAPI", "SQL", "LLMs", "LangGraph", "Agentic AI"],
    category: "Agentic AI / Banking Analytics",
    githubUrl: "https://github.com/Vishal-code-E/banking-data-assistance",
    icon: "🏦",
    planet: "chroma-prism",
    orbitRadius: 140,
    orbitSpeed: 68,
  },
  {
    id: 3,
    title: "Nano-RAG Assistant",
    shortTitle: "Nano-RAG",
    tagline: "Lightweight Retrieval-Augmented Generation Framework",
    description:
      "A lightweight Retrieval-Augmented Generation framework demonstrating semantic search, embeddings, and vector retrieval with GPT-4 Nano for fast and efficient knowledge-based question answering.",
    tags: ["Python", "OpenAI", "Embeddings", "Vector Database", "RAG"],
    category: "RAG / Lightweight AI Systems",
    githubUrl: "https://github.com/ujjesha1312/nano-rag-assistant",
    icon: "⚡",
    planet: "neural-violet",
    orbitRadius: 190,
    orbitSpeed: 50,
  },
  {
    id: 4,
    title: "Multimodal Airline Agent",
    shortTitle: "Multimodal Agent",
    tagline: "Voice, image & chat in one assistant",
    description:
      "AI assistant for FlightAI that provides chatbot responses, retrieves ticket prices, generates destination images with DALL·E, and converts text responses to audio using OpenAI GPT-4. This multimodal system enhances user experience by combining text, image, and audio outputs for comprehensive airline assistance.",
    tags: ["Python", "OpenAI GPT-4", "DALL·E", "Gradio", "Multimodal AI", "Text-to-Speech"],
    category: "Multimodal AI",
    githubUrl: "https://github.com/ujjesha1312/Multimodal-Airline-Agent",
    icon: "🎭",
    planet: "ringed-azure",
    orbitRadius: 190,
    orbitSpeed: 55,
  },
  {
    id: 5,
    title: "MinutesAI",
    shortTitle: "MinutesAI",
    tagline: "Meeting transcripts to structured minutes",
    description:
      "A practical LLM project that processes raw meeting transcripts into structured minutes and extracts key action items. MinutesAI saves hours of manual work by automatically identifying important discussion points, decisions made, and tasks assigned during meetings. Built for teams who need efficient meeting documentation.",
    tags: ["Python", "LLM", "NLP", "Summarization", "Transcript Processing"],
    category: "NLP / AI",
    githubUrl: "https://github.com/ujjesha1312/minutes-ai-project",
    icon: "📝",
    planet: "wave-cobalt",
    orbitRadius: 240,
    orbitSpeed: 44,
  },
  {
    id: 6,
    title: "AI-Powered Marketing Brochure Generator",
    shortTitle: "Marketing Brochure AI",
    tagline: "Website-to-brochure generation with GPT-4",
    description:
      "A Python AI application that scrapes a company's website and uses OpenAI GPT-4 to automatically generate a well-structured marketing brochure. Perfect for quickly summarizing a company's key information for pitches or research. This tool combines web scraping with advanced language models to create professional marketing materials in minutes.",
    tags: ["Python", "OpenAI GPT-4", "BeautifulSoup", "Web Scraping", "Automation"],
    category: "AI / Web Scraping / Automation",
    githubUrl: "https://github.com/ujjesha1312/AI-powered-Marketing-Brochure-with-OpenAI",
    icon: "🎨",
    planet: "sandstone-amber",
    orbitRadius: 240,
    orbitSpeed: 50,
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [armedProject, setArmedProject] = useState<number | null>(null)
  const isTouchDevice = useMediaQuery("(hover: none)")
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 639px)")
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const [time, setTime] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)
  const sectionRef = useRef<HTMLElement>(null)
  const isInViewRef = useRef(true)

  // The orbit system uses fixed pixel radii tuned for desktop — scale everything
  // down together on smaller screens so nothing spills past the viewport edge.
  const orbitScale = isMobile ? 0.4 : isTablet ? 0.75 : 1
  const planetScale = isMobile ? 0.68 : isTablet ? 0.88 : 1
  const orbitContainerSize = isMobile ? 280 : isTablet ? 460 : 560

  // Skip the (otherwise constant, 60fps) re-render this drives once the section
  // scrolls out of view — the rAF loop itself keeps ticking cheaply so the orbit
  // resumes instantly and in sync the moment it's back on screen.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry.isIntersecting
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // The orbit never stops — it keeps revolving whether or not a project is selected.
      // But skip the render while scrolled off-screen; the orbit just resumes from
      // where it left off once visible again, with no visible jump.
      if (isInViewRef.current) {
        setTime((prev) => prev + deltaTime)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setHoveredProject(null)
    setArmedProject(null)
  }

  const handlePlanetInteract = (project: Project) => {
    // Touch devices don't get hover, so the first tap just arms/highlights
    // the planet and the second tap opens it — mirrors desktop hover-then-click.
    if (isTouchDevice && armedProject !== project.id) {
      setArmedProject(project.id)
      setHoveredProject(project.id)
      return
    }
    handleProjectClick(project)
  }

  const getOrbitPosition = (project: Project, currentTime: number) => {
    // Every planet — selected, hovered, or idle — always keeps revolving on its orbit.
    const angle = (currentTime / project.orbitSpeed) * Math.PI * 2
    const x = Math.cos(angle) * project.orbitRadius * orbitScale
    const y = Math.sin(angle) * project.orbitRadius * orbitScale

    return { x, y }
  }

  return (
    <section ref={sectionRef} id="projects" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6">
            <h2 className="text-base font-semibold text-white tracking-widest uppercase mb-4">
              Featured Projects
            </h2>
          </div>

          {/* Main Layout: Orbit System + Detail Panel */}
          <div className="grid lg:grid-cols-[1fr_480px] gap-8 items-center">
            {/* Left: Orbit System */}
            <div
              className="relative flex items-center justify-center mx-auto aspect-square"
              style={{ width: orbitContainerSize, maxWidth: "100%" }}
            >
              {/* Center Label */}
              <div className="absolute z-10 flex items-center justify-center pointer-events-none">
                <div className="px-4 sm:px-6 py-2 sm:py-3 bg-[#111111] border border-[#A1A1AA]/30 rounded-full shadow-lg">
                  <span className="text-[10px] sm:text-xs font-semibold text-[#F5F5F5] tracking-wider uppercase whitespace-nowrap">
                    Selected Work
                  </span>
                </div>
              </div>

              {/* Orbit Paths (visual guides) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Featured orbit (100px) */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={100 * orbitScale}
                  fill="none"
                  stroke="rgba(245,245,245,1)"
                  strokeWidth="0.8"
                  className="transition-all duration-500"
                  style={{
                    opacity:
                      selectedProject && selectedProject.id === 0 ? 0.2 :
                      hoveredProject === 0 ? 0.18 :
                      selectedProject ? 0.08 : 0.14
                  }}
                />
                {/* Inner orbit (140px) */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={140 * orbitScale}
                  fill="none"
                  stroke="rgba(245,245,245,1)"
                  strokeWidth="0.8"
                  className="transition-all duration-500"
                  style={{
                    opacity:
                      selectedProject && [1, 2].includes(selectedProject.id) ? 0.2 :
                      hoveredProject && [1, 2].includes(hoveredProject) ? 0.18 :
                      selectedProject ? 0.08 : 0.14
                  }}
                />
                {/* Middle orbit (190px) */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={190 * orbitScale}
                  fill="none"
                  stroke="rgba(245,245,245,1)"
                  strokeWidth="0.8"
                  className="transition-all duration-500"
                  style={{
                    opacity:
                      selectedProject && [3, 4].includes(selectedProject.id) ? 0.2 :
                      hoveredProject && [3, 4].includes(hoveredProject) ? 0.18 :
                      selectedProject ? 0.08 : 0.14
                  }}
                />
                {/* Outer orbit (240px) */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={240 * orbitScale}
                  fill="none"
                  stroke="rgba(245,245,245,1)"
                  strokeWidth="0.8"
                  className="transition-all duration-500"
                  style={{
                    opacity:
                      selectedProject && [5, 6].includes(selectedProject.id) ? 0.2 :
                      hoveredProject && [5, 6].includes(hoveredProject) ? 0.18 :
                      selectedProject ? 0.08 : 0.14
                  }}
                />
              </svg>

              {/* Orbiting Projects */}
              <div className="relative w-full h-full flex items-center justify-center">
                {projects.map((project) => {
                  const pos = getOrbitPosition(project, time)
                  const isSelected = selectedProject?.id === project.id
                  const isHovered = isTouchDevice
                    ? armedProject === project.id
                    : hoveredProject === project.id
                  const isDimmed = selectedProject && !isSelected
                  const baseNodeSize = isSelected ? 76 : isHovered ? 56 : isDimmed ? 50 : project.featured ? 64 : 50
                  const nodeSize = Math.round(baseNodeSize * planetScale)
                  const bobDuration = 4 + (project.id % 3)
                  const bobDelay = (project.id % 4) * 0.35

                  return (
                    <motion.div
                      key={project.id}
                      className="absolute"
                      animate={{
                        x: pos.x,
                        y: pos.y,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "linear",
                      }}
                    >
                      <motion.div
                        animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                        transition={{
                          duration: bobDuration,
                          delay: bobDelay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.button
                          className="relative flex items-center justify-center rounded-full transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          style={{
                            width: nodeSize,
                            height: nodeSize,
                            opacity: isDimmed ? 0.4 : 1,
                          }}
                          onClick={() => handlePlanetInteract(project)}
                          onMouseEnter={() => !isTouchDevice && setHoveredProject(project.id)}
                          onMouseLeave={() => !isTouchDevice && setHoveredProject(null)}
                          onFocus={() => !isTouchDevice && setHoveredProject(project.id)}
                          onBlur={() => !isTouchDevice && setHoveredProject(null)}
                          whileHover={{ scale: isSelected ? 1 : 1.06 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          aria-label={`View ${project.title}`}
                        >
                          {/* Contact shadow underneath */}
                          <div
                            className="absolute rounded-full bg-black transition-all duration-500 ease-out pointer-events-none"
                            style={{
                              width: nodeSize * 0.7,
                              height: nodeSize * 0.18,
                              bottom: -nodeSize * 0.14,
                              left: "50%",
                              transform: "translateX(-50%)",
                              filter: `blur(${nodeSize * 0.08}px)`,
                              opacity: isSelected ? 0.5 : isHovered ? 0.4 : 0.22,
                            }}
                          />

                          {/* Soft ambient bloom behind planet */}
                          {!isDimmed && (
                            <div
                              className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                                isSelected
                                  ? "bg-[#F5F5F5]/15 blur-xl opacity-100"
                                  : isHovered
                                  ? "bg-[#F5F5F5]/10 blur-lg opacity-100"
                                  : "bg-[#F5F5F5]/5 blur-lg opacity-60"
                              }`}
                              style={{ transform: "scale(1.2)" }}
                            />
                          )}

                          {/* Planet */}
                          <div className="relative z-10">
                            <Planet
                              variant={project.planet}
                              size={nodeSize}
                              isSelected={isSelected}
                              isHovered={isHovered}
                            />
                          </div>

                          {/* Arrival flash — one-shot burst when this planet becomes selected */}
                          {isSelected && (
                            <motion.div
                              key={`arrival-${project.id}`}
                              className="absolute inset-0 rounded-full border-2 border-[#F5F5F5]/70"
                              initial={{ scale: 0.5, opacity: 0.9 }}
                              animate={{ scale: 2.2, opacity: 0 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          )}

                          {/* Pulse ring for selected */}
                          {isSelected && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-[#F5F5F5]/60"
                              initial={{ scale: 1, opacity: 0.8 }}
                              animate={{ scale: 1.6, opacity: 0 }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                              }}
                            />
                          )}

                          {/* Featured badge */}
                          {project.featured && !isSelected && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F5F5F5] flex items-center justify-center shadow-[0_0_10px_rgba(245,245,245,0.6)] z-20">
                              <Star className="w-2 h-2 text-black fill-black" />
                            </div>
                          )}
                        </motion.button>
                      </motion.div>

                      {/* Tooltip on hover / first tap */}
                      <AnimatePresence>
                        {isHovered && !isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap px-4 py-2 bg-[#111111] border border-[#A1A1AA]/30 rounded-lg shadow-lg pointer-events-none z-20"
                          >
                            <span className="text-sm font-medium text-[#F5F5F5]">{project.shortTitle}</span>
                            <span className="text-xs text-[#A1A1AA] mt-0.5 max-w-[180px] text-center text-wrap whitespace-normal">
                              {project.tagline}
                            </span>
                            {project.featured && (
                              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#F5F5F5] tracking-wider uppercase mt-1.5">
                                <Star className="w-2.5 h-2.5 fill-[#F5F5F5]" />
                                Featured Project
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: Reveal Surface */}
            <div className="lg:sticky lg:top-8">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative"
                    style={{ minHeight: "500px" }}
                  >
                    {/* Subtle depth background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/20 rounded-3xl ${
                        selectedProject.featured
                          ? "ring-1 ring-[#F5F5F5]/10 shadow-[0_0_60px_rgba(245,245,245,0.06)]"
                          : ""
                      }`}
                    />

                    {/* Content container */}
                    <div className="relative p-10">
                      {/* Featured badge */}
                      {selectedProject.badge && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05, duration: 0.5 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-[#111111] border border-[#A1A1AA]/30 rounded-full"
                        >
                          <Star className="w-3 h-3 text-[#F5F5F5] fill-[#F5F5F5]" />
                          <span className="text-[10px] font-semibold text-[#F5F5F5] tracking-wider uppercase">
                            {selectedProject.badge}
                          </span>
                        </motion.div>
                      )}

                      {/* Icon & Title */}
                      <motion.div
                        className="flex items-start gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        <div className="text-5xl flex-shrink-0 filter drop-shadow-[0_0_20px_rgba(245,245,245,0.3)]">{selectedProject.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                            {selectedProject.title}
                          </h3>
                          <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                            {selectedProject.category}
                          </p>
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <h4 className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-3">
                          About This Project
                        </h4>
                        <p className="text-[#A1A1AA] leading-relaxed">{selectedProject.description}</p>
                      </motion.div>

                      {/* Tech Stack */}
                      <motion.div 
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h4 className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                              className="px-3 py-1.5 text-xs font-medium bg-[#0A0A0A]/60 text-[#F5F5F5] border border-[#A1A1AA]/20 rounded-full hover:border-white/40 hover:scale-105 hover:bg-[#0A0A0A] transition-all duration-300 cursor-default"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div 
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <Button
                          asChild
                          className="bg-[#F5F5F5] text-[#000000] hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,245,245,0.3)] group"
                        >
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                            View on GitHub
                          </a>
                        </Button>

                        {selectedProject.liveUrl && (
                          <Button
                            asChild
                            variant="outline"
                            className="border-[#A1A1AA]/30 text-[#F5F5F5] hover:bg-[#1a1a1a]/60 hover:border-white/40 transition-all duration-300 hover:scale-105 group"
                          >
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex items-center justify-center"
                    style={{ minHeight: "500px" }}
                  >
                    {/* Subtle animated background */}
                    <motion.div
                      className="absolute inset-0 opacity-5"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 30%, rgba(245,245,245,0.15) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 70%, rgba(245,245,245,0.15) 0%, transparent 50%)",
                          "radial-gradient(circle at 40% 60%, rgba(245,245,245,0.15) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Hologram frame — empty state before a project is selected */}
                    <div className="relative z-10 w-80 h-64">
                      {/* Corner Brackets */}
                      {/* Top-left */}
                      <motion.div
                        className="absolute top-0 left-0 w-12 h-12"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#F5F5F5] to-transparent" />
                      </motion.div>

                      {/* Top-right */}
                      <motion.div
                        className="absolute top-0 right-0 w-12 h-12"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      >
                        <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#F5F5F5] to-transparent" />
                        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#F5F5F5] to-transparent" />
                      </motion.div>

                      {/* Bottom-left */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-12 h-12"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
                        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#F5F5F5] to-transparent" />
                      </motion.div>

                      {/* Bottom-right */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-12 h-12"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      >
                        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#F5F5F5] to-transparent" />
                        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-[#F5F5F5] to-transparent" />
                      </motion.div>

                      {/* Center Text with flicker */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          opacity: [1, 0.95, 1, 0.98, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          times: [0, 0.1, 0.2, 0.3, 1],
                        }}
                      >
                        <p className="text-sm font-light text-[#F5F5F5] tracking-wide">
                          Select a project to explore
                        </p>
                      </motion.div>

                      {/* Subtle scan line */}
                      <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/30 to-transparent"
                        animate={{
                          top: ["0%", "100%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
