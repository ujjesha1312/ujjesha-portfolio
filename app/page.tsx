import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import StarfieldBackground from "@/components/starfield-background"

export default function Home() {
  return (
    <>
      <StarfieldBackground />
      <main className="overflow-x-hidden relative bg-black" style={{ zIndex: 10 }}>
        <div id="home">
          <HeroSection />
        </div>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
