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
            <div className="max-w-[68ch] space-y-4 text-[#F5F5F5] leading-relaxed">
              <p className="text-sm">
                I never really planned on becoming an AI engineer. A few years ago, if someone had told me I&apos;d be building AI systems, working on Vision-Language Models, or interning at NRSC–ISRO, I probably wouldn&apos;t have believed them.
              </p>

              <p className="text-sm">
                What changed was curiosity.
              </p>

              <p className="text-sm">
                I became interested in how simple ideas turn into products that people can actually use. At first, it was just experimenting with chatbots and small AI projects. Over time, that curiosity grew into learning Machine Learning, Large Language Models, RAG systems, Computer Vision, and Agentic AI. Today, I enjoy building AI products that solve real problems while constantly trying to understand how these systems work behind the scenes—not just how to use them, but how to improve and scale them.
              </p>

              <p className="text-sm">
                Alongside technology, I&apos;ve spent the last few years actively contributing to my college&apos;s innovation ecosystem through E-Cell and as an Innovation Ambassador. Organizing events, working with different teams, and interacting with people from diverse backgrounds taught me that building products isn&apos;t just about writing good code—it&apos;s equally about communication, collaboration, and understanding the people you&apos;re building for.
              </p>

              <p className="text-sm">
                I&apos;m also someone who enjoys learning beyond the classroom. I like keeping up with new developments in AI and technology, reading about interesting ideas, and learning from the experiences of people around me. Outside of work, dance, music, and art are where I recharge and express my creativity.
              </p>

              <p className="text-sm">
                I still consider myself someone who&apos;s learning every day. Every project I build teaches me something new, and that&apos;s probably my favorite part of this journey. I genuinely believe that the best products start with curiosity, grow through experimentation, and create real value by solving meaningful problems. That&apos;s the mindset I try to bring to everything I build.
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
