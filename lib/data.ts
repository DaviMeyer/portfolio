// Portfolio Data
// Edit this file to update the content of your portfolio website

export const personalInfo = {
  name: "Davi Meyer",
  title: "Full Stack Developer",
  email: "contact@davimeyer.dev",
  location: "Deutschland",
  bio: "Leidenschaftlicher Entwickler mit Fokus auf moderne Web-Technologien und benutzerfreundliche Lösungen.",
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
  description: `Hallo! Ich bin Davi Meyer, ein leidenschaftlicher Full Stack Developer aus Deutschland. 
  
  Ich liebe es, elegante Lösungen für komplexe Probleme zu entwickeln und dabei moderne Technologien einzusetzen. Mein Fokus liegt auf der Entwicklung von performanten, benutzerfreundlichen Web-Anwendungen, die echten Mehrwert bieten.
  
  Wenn ich nicht gerade code, verbringe ich meine Zeit gerne mit Fotografie, Wandern und dem Entdecken neuer Technologien. Ich bin immer offen für interessante Projekte und neue Herausforderungen.`,
  hobbies: [
    {
      title: "Programmieren",
      description: "Neue Technologien lernen und innovative Projekte entwickeln",
      image: "/hobbies/coding.jpg",
    },
    {
      title: "Fotografie",
      description: "Die Welt durch die Linse entdecken",
      image: "/hobbies/photography.jpg",
    },
    {
      title: "Wandern",
      description: "Natur genießen und neue Orte erkunden",
      image: "/hobbies/hiking.jpg",
    },
    {
      title: "Gaming",
      description: "Entspannen und mit Freunden spielen",
      image: "/hobbies/gaming.jpg",
    },
  ],
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools & Others",
    items: ["Git", "Docker", "AWS", "CI/CD", "Agile/Scrum"],
  },
];

export const experience = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Company GmbH",
    location: "Berlin, Deutschland",
    period: "2022 - Heute",
    description: "Entwicklung und Wartung von Webanwendungen mit React, Next.js und Node.js. Leitung eines Teams von 3 Entwicklern.",
    achievements: [
      "Performance-Optimierung der Hauptanwendung um 40%",
      "Implementierung eines neuen CI/CD Pipelines",
      "Mentoring von Junior-Entwicklern",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    location: "München, Deutschland",
    period: "2020 - 2022",
    description: "Entwicklung von kundenspezifischen Web-Lösungen für verschiedene Branchen.",
    achievements: [
      "Erfolgreiches Launch von 10+ Kundenprojekten",
      "Entwicklung wiederverwendbarer Komponenten-Bibliothek",
      "Integration von Third-Party APIs",
    ],
  },
  {
    title: "Junior Developer",
    company: "Startup XYZ",
    location: "Hamburg, Deutschland",
    period: "2018 - 2020",
    description: "Erste professionelle Erfahrungen in der Webentwicklung mit modernen Frameworks.",
    achievements: [
      "Mitarbeit an MVP-Entwicklung",
      "Unit-Testing und Code-Reviews",
      "Agile Teamarbeit",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Informatik",
    institution: "Technische Universität",
    location: "Deutschland",
    period: "2015 - 2018",
    description: "Schwerpunkt: Software Engineering und Web-Technologien",
  },
];

export const projects = [
  {
    title: "Departure",
    description: "A modern travel planning application built with cutting-edge technologies.",
    image: "/projects/departure.jpg",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    github: "https://github.com/DaviMeyer/departure",
    demo: "https://departure-demo.vercel.app",
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
    content: "Die Zusammenarbeit mit Davi war großartig. Er liefert stets pünktlich und übertrifft die Erwartungen.",
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
