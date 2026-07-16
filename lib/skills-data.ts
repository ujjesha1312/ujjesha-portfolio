export interface Skill {
  name: string
  description: string
  why: string
  related: string[]
  projects: string[]
  usedEverywhere?: boolean
}

export interface ShelfAccent {
  spineFrom: string
  spineTo: string
  rim: string
  foil: string
  tone: "white" | "blue"
}

export interface Shelf {
  id: string
  title: string
  accent: ShelfAccent
  skills: Skill[]
}

export const shelves: Shelf[] = [
  {
    id: "programming",
    title: "Programming",
    accent: {
      // Midnight Blue
      spineFrom: "#22345c",
      spineTo: "#050810",
      rim: "rgba(90, 145, 225, 0.45)",
      foil: "#e8edf6",
      tone: "blue",
    },
    skills: [
      {
        name: "Python",
        description:
          "A general-purpose language I use as the backbone for almost everything I build — from data pipelines to AI systems.",
        why: "It has the richest ecosystem for machine learning and rapid prototyping, letting me move from idea to working system quickly.",
        related: ["FastAPI", "NumPy", "Pandas", "LangChain"],
        projects: ["DisasterVision", "NanoRAG Assistant", "Banking Data Assistant", "MemOrg AI", "Multimodal Airline Agent"],
      },
      {
        name: "C",
        description:
          "The language I learned core CS fundamentals on — memory, pointers, and how a computer actually executes instructions.",
        why: "It forces you to understand what's happening under the hood, which sharpens debugging instincts in every other language.",
        related: ["Data Structures & Algorithms", "Operating Systems"],
        projects: [],
      },
      {
        name: "Java",
        description: "An object-oriented language I use for structured, strongly-typed programming and core CS coursework.",
        why: "Its strict typing and OOP design encourage writing clean, maintainable code from the start.",
        related: ["OOP", "Data Structures & Algorithms"],
        projects: [],
      },
      {
        name: "SQL",
        description: "The language I use to query, shape, and reason about relational data.",
        why: "Almost every real system eventually needs structured data — SQL is how I talk to it directly.",
        related: ["DBMS"],
        projects: [],
      },
    ],
  },
  {
    id: "core-cs",
    title: "Core CS",
    accent: {
      // Pearl White
      spineFrom: "#f5f3ef",
      spineTo: "#cacdd7",
      rim: "rgba(160, 190, 230, 0.4)",
      foil: "#1c2540",
      tone: "white",
    },
    skills: [
      {
        name: "Data Structures & Algorithms",
        description:
          "The foundation for writing efficient, scalable code — arrays, trees, graphs, and the algorithms that operate on them.",
        why: "Good AI systems still need efficient code underneath; DSA is what makes that possible.",
        related: ["C", "Python", "OOP"],
        projects: [],
      },
      {
        name: "OOP",
        description: "A way of structuring code around objects, state, and behavior rather than one long script.",
        why: "It keeps growing codebases organized and easy to reason about as projects scale.",
        related: ["Java", "Data Structures & Algorithms"],
        projects: [],
      },
      {
        name: "DBMS",
        description: "The theory behind how data is stored, indexed, and kept consistent — beyond just writing queries.",
        why: "Understanding DBMS internals helps me design schemas and pipelines that hold up under real use.",
        related: ["SQL", "Vector Databases"],
        projects: [],
      },
      {
        name: "Operating Systems",
        description: "How processes, memory, and resources are actually managed beneath the applications I build.",
        why: "It explains the constraints — concurrency, memory limits, scheduling — that every real system runs into.",
        related: ["Computer Networks", "C"],
        projects: [],
      },
      {
        name: "Computer Networks",
        description: "How data actually moves between the client, server, and everything in between.",
        why: "Every app I build is networked in some way — this is what makes that reliable and understandable.",
        related: ["Operating Systems", "FastAPI"],
        projects: [],
      },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    accent: {
      // Deep Space Blue
      spineFrom: "#141b33",
      spineTo: "#020308",
      rim: "rgba(110, 155, 255, 0.5)",
      foil: "#eef2f9",
      tone: "blue",
    },
    skills: [
      {
        name: "Machine Learning",
        description: "The core discipline behind teaching systems to find patterns in data rather than following fixed rules.",
        why: "It's the theoretical foundation underneath every AI system I build, from RAG to disaster-image analysis.",
        related: ["NumPy", "Pandas", "Scikit-Learn"],
        projects: ["DisasterVision", "NanoRAG Assistant", "MemOrg AI", "Xpert-Chroma"],
      },
      {
        name: "NumPy",
        description: "The library I reach for whenever I need fast, array-based numerical computation.",
        why: "It's the computational backbone underneath nearly every Python data or ML workflow.",
        related: ["Pandas", "Machine Learning"],
        projects: ["DisasterVision", "NanoRAG Assistant"],
      },
      {
        name: "Pandas",
        description: "My go-to tool for cleaning, exploring, and reshaping structured data.",
        why: "Real-world data is messy — Pandas makes it fast to clean, filter, and understand before it reaches a model.",
        related: ["NumPy", "Machine Learning"],
        projects: ["DisasterVision"],
      },
      {
        name: "Scikit-Learn",
        description: "A toolkit of classical machine learning algorithms I use for straightforward, interpretable models.",
        why: "Not every problem needs a deep neural network — Scikit-Learn is often the faster, clearer answer.",
        related: ["Machine Learning", "NumPy"],
        projects: ["DisasterVision"],
      },
      {
        name: "RAG",
        description: "An architecture that grounds language models in real documents instead of relying on memory alone.",
        why: "It's the difference between an AI that guesses and one that can actually cite where its answer came from.",
        related: ["Vector Databases", "Embeddings", "LangChain"],
        projects: ["NanoRAG Assistant", "Banking Data Assistant", "DisasterVision", "MemOrg AI", "Xpert-Chroma"],
      },
      {
        name: "Agentic AI",
        description: "Systems that don't just respond once, but reason, plan, and take multi-step actions toward a goal.",
        why: "It's where AI stops being a single-turn chatbot and starts being a system that can actually get things done.",
        related: ["RAG", "Prompt Engineering"],
        projects: ["Xpert-Chroma"],
      },
      {
        name: "Prompt Engineering",
        description: "The craft of shaping inputs so a language model reliably produces the output you actually need.",
        why: "The gap between a mediocre AI feature and a great one is often just how well it's prompted.",
        related: ["RAG", "Agentic AI", "Fine-Tuning"],
        projects: ["DisasterVision", "NanoRAG Assistant", "MemOrg AI", "Multimodal Airline Agent", "Xpert-Chroma"],
      },
      {
        name: "Vector Databases",
        description: "Storage systems built to search by meaning — finding the nearest matches in high-dimensional space.",
        why: "They're what makes retrieval fast enough to feel instant, even over large document collections.",
        related: ["Embeddings", "RAG"],
        projects: ["DisasterVision", "MemOrg AI", "NanoRAG Assistant", "Xpert-Chroma"],
      },
      {
        name: "Embeddings",
        description: "Numerical representations that capture the meaning of text or images, not just their raw form.",
        why: "They're the bridge that lets a machine compare meaning instead of just matching exact words.",
        related: ["Vector Databases", "RAG"],
        projects: ["MemOrg AI", "Xpert-Chroma", "NanoRAG Assistant", "DisasterVision"],
      },
      {
        name: "Fine-Tuning",
        description: "Adapting a pretrained model to a narrower task or domain by continuing its training on new data.",
        why: "It's how you push a general-purpose model to perform noticeably better on a specific problem.",
        related: ["Transformers", "Prompt Engineering"],
        projects: [],
      },
      {
        name: "Vision Language Models",
        description: "Models that reason jointly over images and text, rather than treating them as separate problems.",
        why: "Disaster imagery doesn't mean much without context — VLMs let the system describe and reason about what it sees.",
        related: ["Multimodal AI", "Transformers"],
        projects: ["DisasterVision"],
      },
      {
        name: "Multimodal AI",
        description: "Systems that combine more than one type of input or output — text, image, audio — into one experience.",
        why: "Real problems rarely come in a single format; multimodal systems meet users where their data actually is.",
        related: ["Vision Language Models", "Prompt Engineering"],
        projects: ["DisasterVision", "Multimodal Airline Agent"],
      },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    accent: {
      // Sapphire Blue
      spineFrom: "#28579e",
      spineTo: "#0a1a34",
      rim: "rgba(110, 170, 255, 0.45)",
      foil: "#f1f5fb",
      tone: "blue",
    },
    skills: [
      {
        name: "FastAPI",
        description: "A modern Python framework for building fast, typed APIs with minimal boilerplate.",
        why: "It lets me ship a production-ready backend for an AI feature almost as quickly as I can prototype it.",
        related: ["Python", "RAG"],
        projects: ["DisasterVision", "NanoRAG Assistant", "Multimodal Airline Agent"],
      },
      {
        name: "LangChain",
        description: "A framework for chaining together LLM calls, retrieval steps, and tools into a coherent pipeline.",
        why: "It removes the boilerplate of wiring retrieval, memory, and prompting together by hand.",
        related: ["RAG", "Vector Databases", "Python"],
        projects: ["NanoRAG Assistant"],
      },
      {
        name: "Transformers",
        description: "A library giving direct access to state-of-the-art pretrained language and vision models.",
        why: "It's usually the fastest path from \"I need a model that understands X\" to an actual working prototype.",
        related: ["Vision Language Models", "Fine-Tuning", "Machine Learning"],
        projects: ["DisasterVision"],
      },
      {
        name: "Gradio",
        description: "A library for turning a Python function into a shareable, interactive web interface in minutes.",
        why: "It lets me put a working demo in front of people without building a frontend from scratch first.",
        related: ["Python", "FastAPI"],
        projects: ["FlightAI Assistant", "Multimodal Airline Agent", "NanoRAG Assistant"],
      },
      {
        name: "BeautifulSoup",
        description: "A library for parsing and extracting information out of HTML pages.",
        why: "It's the simplest way to turn an unstructured webpage into structured data I can actually use.",
        related: ["Python"],
        projects: ["Marketing Brochure AI"],
      },
    ],
  },
  {
    id: "tools",
    title: "Dev Tools",
    accent: {
      // Ice White
      spineFrom: "#e8eff7",
      spineTo: "#b8c4d7",
      rim: "rgba(140, 180, 230, 0.4)",
      foil: "#161f38",
      tone: "white",
    },
    skills: [
      {
        name: "VS Code",
        description: "My primary editor for everything I write, from quick scripts to full applications.",
        why: "The extension ecosystem and debugging tools make it hard to beat for day-to-day development.",
        related: ["GitHub"],
        projects: [],
        usedEverywhere: true,
      },
      {
        name: "GitHub",
        description: "Where I version, host, and collaborate on every project I build.",
        why: "It's both my safety net for tracking changes and the place I showcase finished work.",
        related: ["VS Code"],
        projects: [],
        usedEverywhere: true,
      },
      {
        name: "Jupyter Notebook",
        description: "An interactive environment for exploring data and iterating on models step by step.",
        why: "For experimentation, seeing output after every cell beats re-running a whole script from scratch.",
        related: ["Python", "Pandas", "NumPy"],
        projects: ["DisasterVision", "NanoRAG Assistant"],
      },
      {
        name: "Figma",
        description: "A collaborative design tool I use for mocking up interfaces before writing any code.",
        why: "Sketching the UI first saves time and avoids rebuilding layouts midway through development.",
        related: [],
        projects: [],
      },
    ],
  },
]
