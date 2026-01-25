"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  shortTitle: string
  description: string
  tags: string[]
  category: string
  liveUrl?: string
  githubUrl: string
  icon: string
  orbitRadius: number
  orbitSpeed: number
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Marketing Brochure Generator",
    shortTitle: "Marketing Brochure AI",
    description:
      "A Python AI application that scrapes a company's website and uses OpenAI GPT-4 to automatically generate a well-structured marketing brochure. Perfect for quickly summarizing a company's key information for pitches or research. This tool combines web scraping with advanced language models to create professional marketing materials in minutes.",
    tags: ["Python", "OpenAI GPT-4", "BeautifulSoup", "Web Scraping", "Automation"],
    category: "AI / Web Scraping / Automation",
    githubUrl: "https://github.com/ujjesha1312",
    icon: "🎨",
    orbitRadius: 140,
    orbitSpeed: 60,
  },
  {
    id: 2,
    title: "Airline AI Assistant (FlightAI)",
    shortTitle: "FlightAI Assistant",
    description:
      "An AI chatbot that answers customer queries for an airline project called FlightAI, including fetching ticket prices using GPT-4 with a Gradio interface. This conversational AI assistant provides instant responses to customer inquiries, making airline information accessible and user-friendly through natural language interactions.",
    tags: ["Python", "OpenAI GPT-4", "Gradio", "Chatbot", "Customer Service"],
    category: "Conversational AI / Chatbot",
    githubUrl: "https://github.com/ujjesha1312",
    icon: "✈️",
    orbitRadius: 140,
    orbitSpeed: 70,
  },
  {
    id: 3,
    title: "MinutesAI",
    shortTitle: "MinutesAI",
    description:
      "A practical LLM project that processes raw meeting transcripts into structured minutes and extracts key action items. MinutesAI saves hours of manual work by automatically identifying important discussion points, decisions made, and tasks assigned during meetings. Built for teams who need efficient meeting documentation.",
    tags: ["Python", "LLM", "NLP", "Summarization", "Transcript Processing"],
    category: "NLP / AI",
    githubUrl: "https://github.com/ujjesha1312",
    icon: "📝",
    orbitRadius: 190,
    orbitSpeed: 50,
  },
  {
    id: 4,
    title: "Multimodal Airline Agent",
    shortTitle: "Multimodal Agent",
    description:
      "AI assistant for FlightAI that provides chatbot responses, retrieves ticket prices, generates destination images with DALL·E, and converts text responses to audio using OpenAI GPT-4. This multimodal system enhances user experience by combining text, image, and audio outputs for comprehensive airline assistance.",
    tags: ["Python", "OpenAI GPT-4", "DALL·E", "Gradio", "Multimodal AI", "Text-to-Speech"],
    category: "Multimodal AI",
    githubUrl: "https://github.com/ujjesha1312",
    icon: "🎭",
    orbitRadius: 190,
    orbitSpeed: 55,
  },
  {
    id: 5,
    title: "MemOrg AI (Enterprise RAG Platform)",
    shortTitle: "MemOrg AI",
    description:
      "Enterprise-grade RAG platform designed to unify organizational knowledge from Slack, Confluence, PDFs, and other sources, serving accurate AI answers with source citations. MemOrg AI helps teams instantly access company knowledge, reducing information silos and improving decision-making speed across the organization.",
    tags: ["GPT-4 Turbo", "ChromaDB", "Python", "Next.js", "RAG", "Embeddings", "Enterprise"],
    category: "RAG System / Enterprise Intelligence",
    githubUrl: "https://github.com/ujjesha1312",
    icon: "🧠",
    orbitRadius: 240,
    orbitSpeed: 45,
  },
  {
    id: 6,
    title: "NanoRAG Assistant",
    shortTitle: "NanoRAG",
    description:
      "Lightweight modular RAG framework using GPT-4 Nano, combining document retrieval and large language models for grounded answers. NanoRAG provides a flexible foundation for building retrieval-augmented generation systems with minimal overhead, perfect for rapid prototyping and resource-constrained environments.",
    tags: ["Python", "FAISS", "GPT-4 Nano", "Vector Retrieval", "Gradio", "RAG"],
    category: "RAG / AI Systems",
    githubUrl: "https://github.com/ujjesha1312",
    icon: "⚡",
    orbitRadius: 240,
    orbitSpeed: 40,
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [time, setTime] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    let lastTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Only update time if no project is selected (orbit continues)
      if (!selectedProject) {
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
  }, [selectedProject])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setHoveredProject(null)
  }

  const getOrbitPosition = (project: Project, currentTime: number) => {
    // If this project is selected, lock it at top center
    if (selectedProject?.id === project.id) {
      return { x: 0, y: -180 }
    }

    // If any project is hovered, pause its orbit at current position
    if (hoveredProject === project.id) {
      // Calculate paused position
      const pausedTime = currentTime
      const angle = (pausedTime / project.orbitSpeed) * Math.PI * 2
      return {
        x: Math.cos(angle) * project.orbitRadius,
        y: Math.sin(angle) * project.orbitRadius,
      }
    }

    // Calculate orbital position based on time
    const angle = (currentTime / project.orbitSpeed) * Math.PI * 2
    const x = Math.cos(angle) * project.orbitRadius
    const y = Math.sin(angle) * project.orbitRadius

    return { x, y }
  }

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden">
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
            <div className="relative flex items-center justify-center" style={{ minHeight: "550px" }}>
              {/* Center Label */}
              <div className="absolute z-10 flex items-center justify-center pointer-events-none">
                <div className="px-6 py-3 bg-[#111111] border border-[#A1A1AA]/30 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-[#F5F5F5] tracking-wider uppercase">
                    Selected Work
                  </span>
                </div>
              </div>

              {/* Orbit Paths (visual guides) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ maxWidth: "550px", maxHeight: "550px", margin: "auto" }}
              >
                {/* Inner orbit (140px) */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="140"
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
                  r="190"
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
                  r="240"
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
                  const isHovered = hoveredProject === project.id
                  const isDimmed = selectedProject && !isSelected

                  return (
                    <motion.div
                      key={project.id}
                      className="absolute"
                      animate={{
                        x: pos.x,
                        y: pos.y,
                      }}
                      transition={{
                        duration: isSelected ? 0.6 : 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.button
                        className={`relative flex items-center justify-center rounded-full border transition-all duration-500 ease-out ${
                          isSelected
                            ? "w-24 h-24 bg-[#F5F5F5] border-[#F5F5F5] shadow-[0_0_40px_rgba(245,245,245,0.4)]"
                            : isHovered
                            ? "w-18 h-18 bg-[#111111] border-[#F5F5F5]/70 shadow-[0_0_25px_rgba(245,245,245,0.25)]"
                            : isDimmed
                            ? "w-16 h-16 bg-[#0A0A0A] border-[#A1A1AA]/20 opacity-40"
                            : "w-16 h-16 bg-[#0A0A0A] border-[#A1A1AA]/40 shadow-[0_0_15px_rgba(245,245,245,0.15)]"
                        }`}
                        onClick={() => handleProjectClick(project)}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        whileHover={{ scale: isSelected ? 1 : 1.06 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        aria-label={`View ${project.title}`}
                      >
                        {/* Soft glow halo behind icon */}
                        {!isDimmed && (
                          <div 
                            className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                              isSelected
                                ? "bg-[#F5F5F5]/20 blur-xl opacity-100"
                                : isHovered
                                ? "bg-[#F5F5F5]/15 blur-lg opacity-100"
                                : "bg-[#F5F5F5]/10 blur-lg opacity-60"
                            }`}
                            style={{ transform: 'scale(1.2)' }}
                          />
                        )}

                        {/* Icon */}
                        <span
                          className={`relative z-10 transition-all duration-500 ease-out ${
                            isSelected 
                              ? "text-4xl filter grayscale" 
                              : isHovered 
                              ? "text-3xl" 
                              : "text-2xl"
                          }`}
                          style={{
                            filter: isSelected ? 'grayscale(100%) brightness(0.3)' : 'none',
                          }}
                        >
                          {project.icon}
                        </span>

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
                      </motion.button>

                      {/* Tooltip on hover */}
                      <AnimatePresence>
                        {isHovered && !isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-[#111111] border border-[#A1A1AA]/30 rounded-lg text-sm font-medium text-[#F5F5F5] shadow-lg pointer-events-none z-20"
                          >
                            {project.shortTitle}
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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/20 rounded-3xl" />
                    
                    {/* Content container */}
                    <div className="relative p-10">
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

                    {/* OPTION 1: Hologram Frame */}
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
