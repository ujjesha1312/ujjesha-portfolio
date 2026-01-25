'use client';

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import GalleryCTASection from "@/components/gallery-cta-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import StarfieldBackground from "@/components/starfield-background"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Check if user has already visited (stored in sessionStorage)
    const visited = sessionStorage.getItem('hasVisited')
    if (visited) {
      setShowSplash(false)
      setHasVisited(true)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem('hasVisited', 'true')
    setHasVisited(true)
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && !hasVisited && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <StarfieldBackground />
      <main className="overflow-x-hidden relative bg-black" style={{ zIndex: 10 }}>
        <div id="home">
          <HeroSection />
        </div>
        <AboutSection />
        <SkillsSection />
        <GalleryCTASection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
