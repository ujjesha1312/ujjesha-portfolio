"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  SiC, SiCplusplus, SiPython, SiHtml5, SiMysql,
  SiNumpy, SiPandas, SiScikitlearn, SiPytorch,
  SiGithub, SiJupyter, SiNotion, SiFigma, SiCanva,
  SiHuggingface, SiReact, SiNextdotjs, SiTailwindcss,
  SiOpenai, SiGoogle, SiPerplexity, SiFastapi, SiStreamlit,
  SiGrammarly
} from "react-icons/si"
import { 
  FaDatabase, FaBrain, FaRobot, FaNetworkWired, FaGlobe, FaComments, 
  FaUsers, FaLightbulb, FaMicrophone, FaChartLine, FaJava, FaCode, FaChartBar,
  FaFilePdf, FaServer, FaAppStore, FaClock, FaPuzzlePiece, FaHandshake,
  FaFileWord, FaTools, FaFont
} from "react-icons/fa"
import { BsMicrosoft } from "react-icons/bs"

interface SkillCategory {
  id: number
  title: string
  skills: { name: string; icon: any; color: string }[]
}

const categories: SkillCategory[] = [
  {
    id: 1,
    title: "Core Programming",
    skills: [
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "DSA", icon: FaNetworkWired, color: "#10B981" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ]
  },
  {
    id: 2,
    title: "AI / ML & LLM Systems",
    skills: [
      { name: "NumPy", icon: SiNumpy, color: "#013243" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "RAG", icon: FaBrain, color: "#F59E0B" },
      { name: "Agentic AI", icon: FaRobot, color: "#EC4899" },
    ]
  },
  {
    id: 3,
    title: "Frameworks & Libraries",
    skills: [
      { name: "Transformers", icon: SiHuggingface, color: "#FFD21E" },
      { name: "Sentence-Transformers", icon: FaBrain, color: "#FFB000" },
      { name: "LangChain", icon: FaNetworkWired, color: "#1C3C3C" },
      { name: "LlamaIndex", icon: FaDatabase, color: "#8B5CF6" },
      { name: "FAISS", icon: FaDatabase, color: "#0081FB" },
      { name: "ChromaDB", icon: FaDatabase, color: "#FF6B6B" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
      { name: "Gradio", icon: FaAppStore, color: "#FF7C00" },
      { name: "SpaCy", icon: FaBrain, color: "#09A3D5" },
      { name: "NLTK", icon: FaCode, color: "#2D8CFF" },
      { name: "PyPDF", icon: FaFilePdf, color: "#EF4444" },
      { name: "BeautifulSoup", icon: FaCode, color: "#3B82F6" },
      { name: "Regex", icon: FaFont, color: "#10B981" },
    ]
  },
  {
    id: 4,
    title: "Tools & Platforms",
    skills: [
      { name: "VS Code", icon: FaCode, color: "#007ACC" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "GitHub Copilot", icon: SiGithub, color: "#FFFFFF" },
      { name: "Jupyter Notebook", icon: SiJupyter, color: "#F37626" },
      { name: "Google Colab", icon: SiJupyter, color: "#F9AB00" },
      { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
      { name: "Microsoft Office", icon: BsMicrosoft, color: "#D83B01" },
      { name: "Google Workspace", icon: SiGoogle, color: "#4285F4" },
      { name: "Notion", icon: SiNotion, color: "#FFFFFF" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" },
      { name: "ChatGPT", icon: SiOpenai, color: "#10A37F" },
      { name: "Gemini", icon: SiGoogle, color: "#4285F4" },
      { name: "Claude", icon: FaBrain, color: "#D97757" },
      { name: "Perplexity", icon: SiPerplexity, color: "#20808D" },
      { name: "Grammarly", icon: SiGrammarly, color: "#15C39A" },
    ]
  },
  {
    id: 5,
    title: "Languages",
    skills: [
      { name: "English", icon: FaGlobe, color: "#3B82F6" },
      { name: "Hindi", icon: FaGlobe, color: "#FF9933" },
      { name: "Telugu", icon: FaGlobe, color: "#10B981" },
      { name: "Spanish", icon: FaGlobe, color: "#EF4444" },
    ]
  },
  {
    id: 6,
    title: "Soft Skills",
    skills: [
      { name: "Communication", icon: FaComments, color: "#3B82F6" },
      { name: "People Management", icon: FaUsers, color: "#8B5CF6" },
      { name: "Teamwork", icon: FaUsers, color: "#10B981" },
      { name: "Adaptability", icon: FaPuzzlePiece, color: "#F59E0B" },
      { name: "Time Management", icon: FaClock, color: "#EC4899" },
      { name: "Problem-Solving", icon: FaLightbulb, color: "#FBBF24" },
      { name: "Creative Thinking", icon: FaLightbulb, color: "#A78BFA" },
      { name: "Rapport Building", icon: FaHandshake, color: "#34D399" },
    ]
  },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [chamberPulse, setChamberPulse] = useState(0)

  const handleCategoryClick = useCallback((categoryId: number) => {
    setActiveCategory(categoryId)
    setChamberPulse(prev => prev + 1)
  }, [])

  const activeSkills = activeCategory 
    ? categories.find(cat => cat.id === activeCategory)?.skills || []
    : []

  return (
    <section
      id="skills"
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      
      <div className="relative w-full h-full flex z-10">
        {/* Left Side - Black Hole Portal (40%) */}
        <div className="w-[40%] h-full flex items-center justify-center p-8">
          <div className="relative w-[480px] h-[480px]">
            
            {/* Black Hole Core */}
            <div className="absolute inset-0 rounded-full bg-black overflow-hidden">
              {/* Event Horizon Glow */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `
                    inset 0 0 60px rgba(0, 0, 0, 0.9),
                    0 0 80px rgba(59, 130, 246, 0.4),
                    0 0 120px rgba(139, 92, 246, 0.3),
                    0 0 160px rgba(59, 130, 246, 0.2)
                  `
                }}
              />
              
              {/* Accretion Disk Glow */}
              <motion.div
                className="absolute inset-[-20px] rounded-full"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(59, 130, 246, 0.3) 25%, transparent 50%, rgba(139, 92, 246, 0.3) 75%, transparent 100%)',
                  filter: 'blur(30px)'
                }}
              />

              {/* Inner darkness gradient */}
              <div className="absolute inset-[20px] rounded-full bg-gradient-radial from-transparent via-black to-black" />
              
              {/* Skill Dots emerging from black hole */}
              <AnimatePresence mode="wait">
                {activeCategory && activeSkills.map((skill, index) => {
                  const angle = (index / activeSkills.length) * Math.PI * 2
                  const radius = 80
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius
                  const SkillIcon = skill.icon

                  return (
                    <motion.div
                      key={`${activeCategory}-${skill.name}`}
                      className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-zinc-900 border-2 flex items-center justify-center shadow-lg"
                      style={{
                        borderColor: skill.color,
                        boxShadow: `0 0 20px ${skill.color}40`
                      }}
                      initial={{ 
                        x: '-50%',
                        y: '-50%',
                        scale: 0,
                        opacity: 0
                      }}
                      animate={{ 
                        x: `calc(-50% + ${x}px)`,
                        y: `calc(-50% + ${y}px)`,
                        scale: 1,
                        opacity: 1
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                        transition: { duration: 0.2 }
                      }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                    >
                      <SkillIcon 
                        className="w-5 h-5"
                        style={{ color: skill.color }}
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Pulsing center when active */}
              {activeCategory && (
                <motion.div
                  className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.3, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
                  }}
                />
              )}
            </div>

            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-[-30px] rounded-full pointer-events-none"
              animate={{
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
              }}
            />

          </div>
        </div>

        {/* Right Side - Skills Categories (60%) */}
        <div className="w-[60%] h-full flex flex-col px-8 py-16">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-base font-semibold text-white tracking-widest uppercase">
              Skills & Expertise
            </h2>
            <p className="text-white/60 text-sm mt-2">
              Click a category to explore skills
            </p>
          </motion.div>

          {/* Category Boxes */}
          <div className="flex gap-1.5 mb-8 overflow-x-auto">
            {categories.map((category, index) => {
              const isActive = activeCategory === category.id

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    relative px-3 py-1.5 rounded-md text-left transition-all duration-300 flex-shrink-0
                    ${isActive 
                      ? 'bg-white/15 border border-white/30 shadow-lg shadow-blue-500/20' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20'
                    }
                  `}
                >
                  <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-white' : 'text-white/70'}`}>
                    {category.title}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Skill Bricks Container */}
          <div className="flex-1 relative overflow-hidden">
            {/* Glowing Bottom Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1"
              animate={{
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.6)',
                  '0 0 40px rgba(59, 130, 246, 0.9)',
                  '0 0 20px rgba(59, 130, 246, 0.6)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8), transparent)'
              }}
            />
            
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-2 left-0 right-0 px-4 flex flex-wrap gap-2 justify-center content-end pb-4"
                >
                  {activeSkills.map((skill, index) => {
                    const SkillIcon = skill.icon
                    
                    // Pre-calculated random values for better performance
                    const startX = Math.random() * 60 - 30
                    const startRotation = (Math.random() - 0.5) * 60
                    const fallDelay = index * 0.08
                    const dropHeight = -450
                    const finalRotation = Math.random() * 4 - 2

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ 
                          x: startX,
                          y: dropHeight,
                          opacity: 0,
                          rotateZ: startRotation 
                        }}
                        animate={{ 
                          x: 0,
                          y: 0, 
                          opacity: 1,
                          rotateZ: finalRotation,
                        }}
                        exit={{
                          y: -500,
                          opacity: 0,
                          transition: { duration: 0.3, delay: index * 0.02 }
                        }}
                        transition={{
                          type: "tween",
                          duration: 0.6,
                          ease: "easeOut",
                          delay: fallDelay,
                        }}
                        whileHover={{
                          scale: 1.15,
                          y: -8,
                          rotateZ: 0,
                          transition: { type: "tween", duration: 0.2 }
                        }}
                        style={{
                          willChange: 'transform',
                        }}
                        className="px-3 py-2 rounded-lg bg-zinc-900 border border-white/20 shadow-lg flex items-center gap-2 hover:bg-zinc-800 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all cursor-pointer"
                      >
                        <SkillIcon 
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: skill.color }}
                        />
                        <span className="text-white font-medium text-xs whitespace-nowrap">
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instruction when no category selected */}
            {!activeCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center text-white/40">
                  <FaBrain className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">Select a category to view skills</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
