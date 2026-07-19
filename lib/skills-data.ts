import type { ComponentType, CSSProperties } from "react"
import {
  Brain,
  Network,
  Component,
  Database,
  Cpu,
  Wifi,
  Search,
  Bot,
  Wand2,
  Boxes,
  Sparkles,
  SlidersHorizontal,
  ScanEye,
  Blend,
  Link2,
} from "lucide-react"
import { SiPython, SiC, SiNumpy, SiPandas, SiScikitlearn, SiGithub, SiJupyter, SiFigma, SiHuggingface, SiFastapi } from "react-icons/si"
import { FaJava, FaCode, FaAppStore } from "react-icons/fa"

export type IconType = ComponentType<{ className?: string; style?: CSSProperties }>

export interface Skill {
  name: string
  icon: IconType
}

export interface Shelf {
  id: string
  title: string
  skills: Skill[]
}

export const shelves: Shelf[] = [
  {
    id: "programming",
    title: "Programming",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "C", icon: SiC },
      { name: "Java", icon: FaJava },
      { name: "SQL", icon: Database },
    ],
  },
  {
    id: "core-cs",
    title: "Core CS",
    skills: [
      { name: "Data Structures & Algorithms", icon: Network },
      { name: "OOP", icon: Component },
      { name: "DBMS", icon: Database },
      { name: "Operating Systems", icon: Cpu },
      { name: "Computer Networks", icon: Wifi },
    ],
  },
  {
    id: "ai-ml",
    title: "AI Engineering",
    skills: [
      { name: "Machine Learning", icon: Brain },
      { name: "NumPy", icon: SiNumpy },
      { name: "Pandas", icon: SiPandas },
      { name: "Scikit-Learn", icon: SiScikitlearn },
      { name: "RAG", icon: Search },
      { name: "Agentic AI", icon: Bot },
      { name: "Prompt Engineering", icon: Wand2 },
      { name: "Vector Databases", icon: Boxes },
      { name: "Embeddings", icon: Sparkles },
      { name: "Fine-Tuning", icon: SlidersHorizontal },
      { name: "Vision Language Models", icon: ScanEye },
      { name: "Multimodal AI", icon: Blend },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    skills: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "LangChain", icon: Link2 },
      { name: "Transformers", icon: SiHuggingface },
      { name: "Gradio", icon: FaAppStore },
      { name: "BeautifulSoup", icon: FaCode },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    skills: [
      { name: "VS Code", icon: FaCode },
      { name: "GitHub", icon: SiGithub },
      { name: "Jupyter Notebook", icon: SiJupyter },
      { name: "Figma", icon: SiFigma },
    ],
  },
]
