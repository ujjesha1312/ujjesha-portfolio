"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, X } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBeaconActive, setIsBeaconActive] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Show confirmation message
    setIsSubmitting(false)
    setShowConfirmation(true)
    
    // Close modal and reset after showing confirmation
    setTimeout(() => {
      setShowConfirmation(false)
      setIsBeaconActive(false)
      setFormState({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsBeaconActive(false)
      setShowConfirmation(false)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-base font-semibold text-white tracking-widest uppercase mb-4">
              Get In Touch
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-[#F5F5F5]">
              Let's{" "}
              <span className="text-[#F5F5F5]">
                Work Together
              </span>
            </h3>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you!
            </p>
          </div>

          {/* Signal Beacon Layout */}
          <div className="relative">
            {/* Beacon Container */}
            <div 
              className={`relative transition-opacity duration-500 ${
                isBeaconActive ? "opacity-40" : "opacity-100"
              }`}
            >
              <div className="flex flex-col items-center justify-center py-6">
                {/* Central Beacon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsBeaconActive(true)
                  }}
                  className="relative group mb-8"
                  disabled={isBeaconActive}
                >
                  {/* Pulse Rings */}
                  <div className={`absolute inset-0 -m-8 ${isBeaconActive ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="absolute inset-0 rounded-full border-2 border-[#F5F5F5]/20 animate-ping" 
                         style={{ animationDuration: "3s" }} />
                    <div className="absolute inset-0 rounded-full border-2 border-[#F5F5F5]/10 animate-ping" 
                         style={{ animationDuration: "3s", animationDelay: "1.5s" }} />
                  </div>

                  {/* Core Beacon */}
                  <div className={`relative w-20 h-20 rounded-full bg-[#111111] border-2 border-[#F5F5F5] flex items-center justify-center transition-all duration-300 ${
                    isBeaconActive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(245,245,245,0.3)]'
                  }`}>
                    <Send className={`h-8 w-8 text-[#F5F5F5] transition-transform duration-300 ${
                      isBeaconActive ? '' : 'group-hover:rotate-45'
                    }`} />
                  </div>

                  {/* Label */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-sm text-[#A1A1AA] group-hover:text-[#F5F5F5] transition-colors">
                      Click to send signal
                    </span>
                  </div>
                </button>

                {/* Contact Info Grid - Around Beacon */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mt-6">
                  {/* Email */}
                  <a
                    href="mailto:nityarouthu13@gmail.com"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-[#A1A1AA]/10 text-[#A1A1AA] group-hover:bg-[#A1A1AA]/20 transition-colors">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1 text-[#F5F5F5]">Email</div>
                      <div className="text-sm text-[#A1A1AA]">nityarouthu13@gmail.com</div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+918019569312"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-[#A1A1AA]/10 text-[#A1A1AA] group-hover:bg-[#A1A1AA]/20 transition-colors">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1 text-[#F5F5F5]">Phone</div>
                      <div className="text-sm text-[#A1A1AA]">+91 8019569312</div>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#111111] border border-[#A1A1AA]/10">
                    <div className="p-3 rounded-lg bg-[#A1A1AA]/10 text-[#A1A1AA]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1 text-[#F5F5F5]">Location</div>
                      <div className="text-sm text-[#A1A1AA]">Vizianagaram, Andhra Pradesh, India</div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#111111] border border-[#A1A1AA]/10">
                    <div className="relative p-3">
                      <div className="w-3 h-3 bg-[#71717A] rounded-full" />
                      {!isBeaconActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-[#71717A] rounded-full animate-ping" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1 text-[#F5F5F5]">Status</div>
                      <div className="text-sm text-[#A1A1AA]">Available for Work</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://github.com/ujjesha1312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:scale-110"
                  >
                    <Github className="h-5 w-5 text-[#A1A1AA]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ujjesha-nitya-routhu-5a4938312/?originalSubdomain=in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#111111] border border-[#A1A1AA]/10 hover:border-[#A1A1AA]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5 text-[#A1A1AA]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Modal */}
            {isBeaconActive && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/90 backdrop-blur-md"
                style={{ animation: 'fade-in 0.3s ease-out forwards' }}
              >
                <div 
                  className="w-full max-w-2xl p-6 rounded-2xl bg-[#111111] border-2 border-[#A1A1AA]/30 shadow-2xl relative opacity-100"
                  style={{ animation: 'slide-up 0.3s ease-out forwards', zIndex: 60 }}
                >
                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCloseModal()
                    }}
                    disabled={isSubmitting}
                    className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0A0A] border border-[#A1A1AA]/20 hover:border-[#A1A1AA]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5 text-[#F5F5F5]" />
                  </button>

                  {/* Confirmation Message */}
                  {showConfirmation ? (
                    <div className="py-12 text-center animate-fade-in">
                      <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#71717A]/20 flex items-center justify-center">
                          <Send className="h-8 w-8 text-[#F5F5F5] rotate-45" />
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold mb-3 text-[#F5F5F5]">
                        Let's stay connected
                      </h4>
                      <p className="text-lg text-[#A1A1AA] max-w-md mx-auto">
                        Thank you for reaching out. I'll get back to you soon!
                      </p>
                    </div>
                  ) : (
                    <div className="opacity-100">
                      <h4 className="text-xl font-bold mb-2 text-[#F5F5F5]">Send a Message</h4>
                      <p className="text-sm text-[#A1A1AA] mb-4">
                        I typically respond within 24 hours.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4 opacity-100">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#F5F5F5]">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            autoFocus
                            className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#A1A1AA]/10 focus:border-[#A1A1AA]/30 focus:outline-none focus:ring-2 focus:ring-[#A1A1AA]/20 transition-all text-[#F5F5F5]"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#F5F5F5]">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#A1A1AA]/10 focus:border-[#A1A1AA]/30 focus:outline-none focus:ring-2 focus:ring-[#A1A1AA]/20 transition-all text-[#F5F5F5]"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-[#F5F5F5]">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#A1A1AA]/10 focus:border-[#A1A1AA]/30 focus:outline-none focus:ring-2 focus:ring-[#A1A1AA]/20 transition-all text-[#F5F5F5]"
                            placeholder="Project Inquiry"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#F5F5F5]">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#A1A1AA]/10 focus:border-[#A1A1AA]/30 focus:outline-none focus:ring-2 focus:ring-[#A1A1AA]/20 transition-all resize-none text-[#F5F5F5]"
                            placeholder="Tell me about your project..."
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full bg-[#F5F5F5] text-[#000000] hover:bg-[#A1A1AA] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <span className="animate-pulse">Sending...</span>
                            </span>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
