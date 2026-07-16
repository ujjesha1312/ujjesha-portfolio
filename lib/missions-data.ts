export type MissionVehicle = "satellite" | "beacon" | "station"

export interface Mission {
  id: number
  code: string
  name: string
  role: string
  status: string
  location: string
  duration: string
  missionType: string
  project?: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  vehicle: MissionVehicle
  x: number
  y: number
  certificateUrl?: string
  githubUrl?: string
  gallery?: string[]
}

export const missions: Mission[] = [
  {
    id: 0,
    code: "MISSION 01",
    name: "NRSC – ISRO",
    role: "AI/ML Intern",
    status: "Completed",
    location: "Hyderabad",
    duration: "45 Days",
    missionType: "On-site Research Internship",
    project: "DisasterVision",
    responsibilities: [
      "Developed DisasterVision, an AI-powered disaster understanding platform",
      "Applied Vision-Language Models for multimodal disaster imagery reasoning",
      "Built computer vision pipelines for satellite and disaster imagery",
      "Shipped a FastAPI backend to serve the model for real-time use",
    ],
    achievements: [
      "Delivered a working AI-powered disaster analysis prototype",
      "Applied Vision-Language Models in a real research setting",
      "Completed a 45-day on-site research internship at NRSC–ISRO",
    ],
    technologies: ["Python", "PyTorch", "Vision-Language Models", "Computer Vision", "FastAPI", "Hugging Face Transformers"],
    vehicle: "satellite",
    x: 24,
    y: 42,
  },
  {
    id: 1,
    code: "MISSION 02",
    name: "Innovation Ambassador",
    role: "Institution's Innovation Council (IIC)",
    status: "Completed",
    location: "Raghu Engineering College",
    duration: "3 Years",
    missionType: "Ongoing Outreach Program",
    responsibilities: [
      "Promoted innovation and entrepreneurship activities across campus",
      "Organized and supported student-led workshops",
      "Bridged IIC initiatives with student communities",
      "Encouraged participation in innovation challenges and programs",
    ],
    achievements: [
      "Sustained a 3-year innovation outreach initiative",
      "Supported idea-stage students through mentorship and exposure",
      "Strengthened the entrepreneurship ecosystem on campus",
    ],
    technologies: ["Mentorship", "Workshop Facilitation", "Community Engagement", "Public Speaking"],
    vehicle: "beacon",
    x: 50,
    y: 62,
  },
  {
    id: 2,
    code: "MISSION 03",
    name: "E-Cell Leadership",
    role: "Events & Operations Head → Alumni & Community Relations Head",
    status: "Completed",
    location: "Raghu Engineering College",
    duration: "2024 – Present",
    missionType: "Leadership Rotation",
    responsibilities: [
      "Organized and managed large-scale entrepreneurship events",
      "Directed operations, logistics and cross-team coordination as Events & Operations Head",
      "Built alumni engagement programs as Alumni & Community Relations Head",
      "Connected students with external mentors and alumni professionals",
    ],
    achievements: [
      "Led end-to-end execution of flagship E-Cell events",
      "Grew structured alumni engagement from the ground up",
      "Coordinated cross-functional teams across two leadership roles",
    ],
    technologies: ["Event Operations", "Team Leadership", "Alumni Relations", "Community Building"],
    vehicle: "station",
    x: 77,
    y: 40,
  },
]
