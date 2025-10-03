// Portfolio Data
// Edit this file to update the content of your portfolio website

export const personalInfo = {
  name: "Davi Meyer",
  title: "Full Stack Developer",
  email: "contact@davimeyer.dev",
  location: "Schweiz",
  bio: "Entwickler mit Fokus auf moderne Web-Technologien und benutzerfreundliche Lösungen.",
  profileImage: "/profile.jpg", // Add your profile image to /public folder
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/DaviMeyer",
    icon: "github",
  },
];

export const about = {
  description: `Hallo! Ich bin Davi Meyer, ein Full Stack Developer aus der Schweiz. 
  
  Ich liebe es, Lösungen für komplexe Probleme zu entwickeln und dabei moderne Technologien einzusetzen. Mein Fokus liegt auf der Entwicklung von performanten, benutzerfreundlichen Web-Anwendungen, die echten Mehrwert bieten.
  
  Meine Freizeit verbringe ich gerne mit Fotografie, Wandern und dem Entdecken neuer Technologien. Ich bin immer offen für interessante Projekte und neue Herausforderungen.`,
  hobbies: [
    {
      title: "Sport",
      description: "Krafttraining im Fitnessstudio und Ausdauersport",
      image: "/hobbies/gym.jpg",
    },
    {
      title: "Wandern",
      description: "Natur geniessen und neue Orte erkunden",
      image: "/hobbies/wandern.jpg",
    },
    {
      title: "Gaming",
      description: "Entspannen und mit Freunden spielen",
      image: "/hobbies/wandern.jpg",
    },
    {
      title: "Klavier",
      description: "Musikalisch begeistert",
      image: "/hobbies/wandern.jpg",
    },
  ],
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Angular", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Spring Boot", "Node.js", "Express", "MariaDB"],
  },
  {
    category: "Tools & Others",
    items: ["Git", "Docker", "AWS", "CI/CD", "Agile/Scrum"],
  },
];
export const experience = [
  {
    title: "Basislehrjahr",
    company: "BBC",
    location: "Zürich, Schweiz",
    period: "2022 - 2023",
    description: "Grundausbildung im IT-Bereich. Einführung in Programmierung, Softwareentwicklung und IT-Grundlagen.",
    achievements: [
      "Erste praktische Erfahrungen in Web- und Softwareentwicklung",
      "Teilnahme an internen Projekten zur Wissensvertiefung",
    ],
  },
  {
    title: "IT-Lab Developer",
    company: "SIX Group",
    location: "Zürich, Schweiz",
    period: "2023 - 2025",
    description: "Einsatz im IT-Lab zur Umsetzung kleinerer Projekte und Prototypen. Vertiefung von Backend- und Frontend-Technologien.",
    achievements: [
      "Mitentwicklung von Admigo (Lehrlings Administrationstool)",
      "Mitentwicklung von RAT (Internes Risk Assessment Tool)",
      "Teamarbeit in agilen Projekten",
    ],
  },
  {
    title: "Application engineering Team Intern / Lernender",
    company: "SIX Group",
    location: "Zürich, Schweiz",
    period: "2025 - 2026 (voraussichtlich)",
    description: "Weiterentwicklung eines internes Frameworks basierend aus Spring",
    achievements: [
      "Arbeiten an produktiven Backend-Services",
      "Mitwirkung bei Prozessoptimierungen",
      "Erweiterung von Kenntnissen in modernen Technologien",
    ],
  },
];

export const education = [
  {
    degree: "Sekundarschule Sek A",
    institution: "Sekundarschule",
    location: "Zürich",
    period: "2019 - 2022",
    description: "Abschluss der Sekundarschule Sek A, anschliessend Start der Lehre bei SIX.",
  },
];

export const projects = [
  {
    title: "Departure",
    description: "A modern travel planner for checking real-time tram departures from the Six office locations in Zurich",
    image: "/projects/departure.jpg",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    github: "https://github.com/DaviMeyer/departure",
    demo: "https://tram.davimeyer.dev",
    featured: true,
  },
];

export const testimonials = [
  {
    name: "Max Müller",
    position: "CEO, Tech Company GmbH",
    content: "Davi ist ein hervorragender Entwickler mit ausgezeichneten Problemlösungsfähigkeiten. Seine Arbeit ist immer von höchster Qualität.",
    avatar: "/testimonials/avatar1.jpg",
  },
  {
    name: "Sarah Schmidt",
    position: "Projekt Manager, Digital Agency",
    content: "Die Zusammenarbeit mit Davi war grossartig. Er liefert stets pünktlich und übertrifft die Erwartungen.",
    avatar: "/testimonials/avatar2.jpg",
  },
];

export const footer = {
  copyright: `© ${new Date().getFullYear()} Davi Meyer. Alle Rechte vorbehalten.`,
  links: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
  ],
};
