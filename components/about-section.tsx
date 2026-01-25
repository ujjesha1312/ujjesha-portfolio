"use client"

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  const buildSteps = [
    { label: "IDEA", color: "text-[#F5F5F5]" },
    { label: "BUILD", color: "text-[#F5F5F5]" },
    { label: "FAIL", color: "text-[#F5F5F5]" },
    { label: "REFINE", color: "text-[#F5F5F5]" },
    { label: "SHIP", color: "text-[#F5F5F5]" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-white tracking-widest uppercase">
              About Me
            </h2>
          </div>

          <div className="grid lg:grid-cols-[140px_1fr] gap-8 lg:gap-12 items-start">
            {/* Left Column - Build Philosophy Flowchart */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex flex-col items-center space-y-4">
                {buildSteps.map((step, index) => (
                  <div key={step.label} className="flex flex-col items-center">
                    {/* Step Box */}
                    <div className="relative">
                      <div className="px-4 py-2 bg-[#111111] border border-[#A1A1AA]/20 rounded-lg hover:border-[#A1A1AA]/40 transition-all duration-300">
                        <span className={`text-xs font-bold tracking-wider ${step.color}`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow - don't show after last item */}
                    {index < buildSteps.length - 1 && (
                      <ArrowDown className="h-5 w-5 text-[#71717A] my-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Bio Content */}
            <div className="space-y-3 text-[#F5F5F5] leading-relaxed">
              <p className="text-sm">
                I'm someone who's learning by doing, exploring how ideas grow into real, working products.
              </p>

              <p className="text-sm">
                Currently, I serve as the Alumni and Community Relations Head at E-Cell, Raghu Engineering College, and this is my second year actively working with the E-Cell ecosystem. Along the way, I've also been a core member of multiple student clubs and an Innovation Ambassador IIC REC, engaging closely with innovation, entrepreneurship, and campus communities.
              </p>

              <p className="text-sm">
                I wasn't always interested in technology or product building. But as I began understanding how ideas evolve from identifying use cases to shaping solutions and finally building usable products, I naturally gravitated toward creating things. I started small, building chatbots, experimenting with working models, and learning by breaking and improving systems.
              </p>

              <p className="text-sm">
                Today, I work deeply with Machine Learning, Large Language Models, RAG systems, and Agentic AI, focusing on understanding how these systems actually function, interact, and perform—not just using them, but learning how they think and scale.
              </p>

              <p className="text-sm">
                Beyond tech, I genuinely enjoy communicating with people. I love hosting and managing events, and over the past three years, I've hosted numerous events both on campus and outside. This journey has strengthened my confidence, sharpened my ability to speak in front of large audiences, and taught me how to lead conversations and teams effectively.
              </p>

              <p className="text-sm">
                I stay curious by reading trending articles, keeping up with what's happening around me, and constantly learning from people and experiences. Outside of work, I find my balance and happiness in dance, music, and art—spaces where creativity feels natural and unrestricted.
              </p>
            </div>
          </div>

          {/* Action Buttons - Centered across full width */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
            <a
              href="https://github.com/ujjesha1312"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#111111] hover:bg-[#0A0A0A] text-[#F5F5F5] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40"
              >
                <Github className="mr-2 h-4 w-4" />
                View GitHub
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/in/ujjesha-nitya-routhu-5a4938312/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#111111] hover:bg-[#0A0A0A] text-[#F5F5F5] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Connect on LinkedIn
              </Button>
            </a>

            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-[#111111] hover:bg-[#0A0A0A] text-[#F5F5F5] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
