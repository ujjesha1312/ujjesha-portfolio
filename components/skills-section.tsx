"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  SiC, SiCplusplus, SiPython, SiHtml5, SiMysql,
  SiNumpy, SiPandas, SiScikitlearn, SiPytorch,
  SiGit, SiGithub, SiJupyter, SiNotion, SiFigma, SiCanva,
  SiHuggingface, SiNextdotjs, SiReact, SiTypescript, SiTailwindcss,
  SiJavascript, SiFramer, SiCss3, SiGoogledrive, SiSlack, SiDiscord,
  SiVercel, SiNpm, SiGooglechrome, SiPostman, SiZoom,
  SiTrello
} from "react-icons/si"
import { 
  FaDatabase, FaBrain, FaRobot, FaNetworkWired, FaGlobe, FaComments, 
  FaUsers, FaLightbulb, FaMicrophone, FaChartLine, FaJava, FaCode, FaChartBar,
  FaTerminal, FaCloud, FaMicrosoft, FaWindows
} from "react-icons/fa"
import { IoLanguage } from "react-icons/io5"

interface SkillCategory {
  id: number
  title: string
  icon: any
  skills: { name: string; icon: any; color?: string }[]
}

const categories: SkillCategory[] = [
  {
    id: 1,
    title: "Core Programming",
    icon: FaBrain,
    skills: [
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "DSA", icon: FaNetworkWired, color: "#10B981" },
    ]
  },
  {
    id: 2,
    title: "Web Development",
    icon: FaCode,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#BB4BFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
    ]
  },
  {
    id: 3,
    title: "AI / Machine Learning",
    icon: FaBrain,
    skills: [
      { name: "NumPy", icon: SiNumpy, color: "#013243" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
    ]
  },
  {
    id: 4,
    title: "LLM & Agentic Systems",
    icon: FaRobot,
    skills: [
      { name: "LangChain", icon: FaNetworkWired, color: "#1C3C3C" },
      { name: "LlamaIndex", icon: FaDatabase, color: "#8B5CF6" },
      { name: "RAG", icon: FaBrain, color: "#F59E0B" },
      { name: "Agent Nodes", icon: FaRobot, color: "#EC4899" },
    ]
  },
  {
    id: 5,
    title: "Databases & Vector Stores",
    icon: FaDatabase,
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "FAISS", icon: FaDatabase, color: "#0081FB" },
      { name: "ChromaDB", icon: FaDatabase, color: "#FF6B6B" },
    ]
  },
  {
    id: 6,
    title: "Development Tools",
    icon: FaChartLine,
    skills: [
      { name: "VS Code", icon: FaCode, color: "#007ACC" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "GitHub Copilot", icon: SiGithub, color: "#FFFFFF" },
      { name: "Jupyter Notebook", icon: SiJupyter, color: "#F37626" },
      { name: "Google Colab", icon: SiJupyter, color: "#F9AB00" },
      { name: "Terminal", icon: FaTerminal, color: "#4AF626" },
      { name: "Chrome DevTools", icon: SiGooglechrome, color: "#4285F4" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ]
  },
  {
    id: 7,
    title: "Design & Productivity",
    icon: FaChartBar,
    skills: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" },
      { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
      { name: "Notion", icon: SiNotion, color: "#FFFFFF" },
      { name: "Trello", icon: SiTrello, color: "#0052CC" },
      { name: "Microsoft Office", icon: FaMicrosoft, color: "#D83B01" },
      { name: "Google Workspace", icon: SiGoogledrive, color: "#4285F4" },
    ]
  },
  {
    id: 8,
    title: "Communication Tools",
    icon: FaComments,
    skills: [
      { name: "Slack", icon: SiSlack, color: "#4A154B" },
      { name: "Discord", icon: SiDiscord, color: "#5865F2" },
      { name: "Zoom", icon: SiZoom, color: "#2D8CFF" },
    ]
  },
  {
    id: 9,
    title: "Spoken Languages",
    icon: IoLanguage,
    skills: [
      { name: "English", icon: FaGlobe, color: "#3B82F6" },
      { name: "Hindi", icon: FaGlobe, color: "#FF9933" },
      { name: "Telugu", icon: FaGlobe, color: "#10B981" },
      { name: "Spanish", icon: FaGlobe, color: "#EF4444" },
    ]
  },
  {
    id: 10,
    title: "Soft Skills",
    icon: FaUsers,
    skills: [
      { name: "Communication", icon: FaComments, color: "#3B82F6" },
      { name: "Leadership", icon: FaChartLine, color: "#F59E0B" },
      { name: "People Management", icon: FaUsers, color: "#8B5CF6" },
      { name: "Event Management", icon: FaUsers, color: "#10B981" },
      { name: "Hosting", icon: FaMicrophone, color: "#EC4899" },
      { name: "Creative Thinking", icon: FaLightbulb, color: "#FBBF24" },
    ]
  },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [showCategories, setShowCategories] = useState(false)

  const handleCategoryClick = useCallback((categoryId: number) => {
    setActiveCategory(categoryId)
  }, [])

  const handleSkillHover = useCallback((skillId: string | null) => {
    setHoveredSkill(skillId)
  }, [])

  return (
    <section
      id="skills"
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Dark Background with Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full h-full max-w-6xl mx-auto px-8 py-16 z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => setShowCategories(true)}
          className="mb-10 text-center"
        >
          <h2 className="text-base font-semibold text-white tracking-widest uppercase">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex gap-6 h-[calc(100%-120px)] max-w-5xl mx-auto">
          {/* Left Side - Category Selector (30%) */}
          <div className="w-[30%] flex flex-col gap-2.5">
            {showCategories && categories.map((category, index) => {
              const isActive = activeCategory === category.id

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    relative text-left px-4 py-3 rounded-lg
                    transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-white/10 text-white border border-white/20 shadow-lg shadow-blue-500/10' 
                      : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/8 hover:text-white/80 hover:border-white/15'
                    }
                  `}
                >
                  <span className="text-base font-medium">{category.title}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right Side - Card Stack (70%) */}
          <div className="w-[70%] relative">
            {/* Instruction Card - Shows when no category selected */}
            {!activeCategory && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 100 }}
              >
                <div className="w-full h-full rounded-2xl bg-zinc-900 border border-white/20 overflow-hidden relative shadow-2xl flex items-center justify-center">
                  <div className="text-center px-12">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Select a Category
                    </h3>
                    <p className="text-white/70 text-sm mb-3">
                      Click on any category from the left sidebar to explore my skills
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                      <span>Choose from the categories</span>
                      <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skill Cards Stack */}
            {categories.map((category, index) => {
              const isActive = activeCategory === category.id
              const totalCards = categories.length
              const stackIndex = index
              const cardDepth = totalCards - stackIndex

              return (
                <motion.div
                  key={category.id}
                  initial={false}
                  animate={
                    activeCategory === null
                      ? {
                          scale: 0.75 - stackIndex * 0.012,
                          x: '35%',
                          y: '25%',
                          rotateZ: stackIndex * 1.2,
                          opacity: 1,
                          zIndex: cardDepth,
                        }
                      : isActive
                      ? {
                          scale: 1,
                          x: 0,
                          y: 0,
                          rotateZ: 0,
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          scale: 0.7 - stackIndex * 0.012,
                          x: '35%',
                          y: '25%',
                          rotateZ: stackIndex * 1.2,
                          opacity: 0.4,
                          zIndex: cardDepth,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: "top right",
                  }}
                >
                    {/* Card */}
                    <div className="w-full h-full rounded-2xl bg-zinc-900 border border-white/20 overflow-hidden relative shadow-2xl">
                      {/* Animated Background Gradient - Only on Active Card */}
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute inset-0 opacity-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)',
                            }}
                          />
                          {/* Subtle Floating Particles */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                                initial={{ 
                                  x: `${20 + i * 20}%`,
                                  y: '100%',
                                }}
                                animate={{ 
                                  x: `${25 + i * 20 + (i % 2 ? 5 : -5)}%`,
                                  y: '-10%',
                                }}
                                transition={{
                                  duration: 4 + i,
                                  delay: i * 0.8,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                style={{
                                  boxShadow: '0 0 4px 1px rgba(96, 165, 250, 0.4)',
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      
                      {/* Card Content */}
                      <div className="relative h-full p-5 flex flex-col overflow-hidden">
                        {/* Category Title */}
                        <h3 className="text-lg font-bold text-white mb-4 flex-shrink-0">
                          {category.title}
                        </h3>

                        {/* Skills Icon Grid */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 -mx-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
                          <div className={`grid ${category.skills.length > 16 ? 'grid-cols-6 gap-2.5 max-w-xl' : 'grid-cols-4 gap-3 max-w-lg'} w-full mx-auto pb-4`}>
                            {category.skills.map((skill, skillIndex) => {
                              const SkillIcon = skill.icon
                              const isHovered = hoveredSkill === `${category.id}-${skill.name}`

                              return (
                                <motion.div
                                  key={skill.name}
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ 
                                    delay: isActive ? skillIndex * 0.03 : 0,
                                    duration: 0.2,
                                    ease: "easeOut"
                                  }}
                                  onMouseEnter={() => handleSkillHover(`${category.id}-${skill.name}`)}
                                  onMouseLeave={() => handleSkillHover(null)}
                                  className="relative flex items-center justify-center group"
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className={`relative ${category.skills.length > 16 ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-white backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200`}
                                  >
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300" />
                                    <SkillIcon 
                                      className={`${category.skills.length > 16 ? 'w-5 h-5' : 'w-6 h-6'} relative z-10 transition-transform duration-200 group-hover:scale-110`}
                                      style={{ color: skill.color || '#FFFFFF' }}
                                    />
                                  </motion.div>

                                  {/* Tooltip */}
                                  {isHovered && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-medium shadow-xl pointer-events-none"
                                      style={{ zIndex: 9999 }}
                                    >
                                      {skill.name}
                                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-white/20 rotate-45" />
                                    </motion.div>
                                  )}
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
