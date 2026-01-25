"use client"

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative bg-[#000000] border-t border-[#A1A1AA]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4 tracking-tight">
                UJJESHA
              </h3>
              <p className="text-[#A1A1AA] mb-4 max-w-md">
                Building intelligent systems and meaningful technology. Focused on AI, scalable architectures, 
                and community-driven innovation. Let's create something impactful together.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ujjesha1312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-[#A1A1AA]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ujjesha-nitya-routhu-5a4938312/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-[#A1A1AA]" />
                </a>
                <a
                  href="mailto:nityarouthu13@gmail.com"
                  className="p-2 rounded-lg bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-[#A1A1AA]" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-[#F5F5F5]">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button 
                    onClick={() => scrollToTop()}
                    className="text-[#A1A1AA] hover:text-[#F5F5F5] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-[#A1A1AA] hover:text-[#F5F5F5] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('skills')}
                    className="text-[#A1A1AA] hover:text-[#F5F5F5] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="text-[#A1A1AA] hover:text-[#F5F5F5] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('experience')}
                    className="text-[#A1A1AA] hover:text-[#F5F5F5] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    Experience
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-[#A1A1AA] hover:text-[#F5F5F5] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#A1A1AA]/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-[#A1A1AA] text-center sm:text-left">
                © 2026 UJJESHA. All rights reserved.
                <span className="hidden sm:inline mx-2">•</span>
                <span className="block sm:inline mt-1 sm:mt-0">
                  Built with Next.js, TypeScript & Tailwind CSS
                </span>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300"
                aria-label="Back to top"
              >
                <span className="text-sm font-medium text-[#F5F5F5]">Back to Top</span>
                <ArrowUp className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F5F5F5] group-hover:-translate-y-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
