import Link from "next/link";
import Image from "next/image";
import { personalInfo, socialLinks, projects } from "@/lib/data";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="block text-gray-900 dark:text-white">
                  Hallo, ich bin
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-2xl text-gray-700 dark:text-gray-300">
                {personalInfo.title}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {personalInfo.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  Meine Projekte
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={link.name}
                  >
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={32}
                      height={32}
                      className="dark:invert"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 bg-gradient-to-br from-blue-400 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center text-white text-8xl">
                  👨‍💻
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ausgewählte Projekte
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Meine Arbeiten
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
                <div
                    key={index}
                    className={`bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300
        ${featuredProjects.length === 1 ? "md:col-start-2" : ""}`}
                >
                  <div
                      className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-6xl">
                    📱
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
              {tag}
            </span>
                      ))}
                    </div>
                  </div>
                </div>
            ))}
          </div>


          <div className="text-center mt-12">
            <Link
                href="/projects"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Alle Projekte ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Lassen Sie uns zusammenarbeiten
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Haben Sie ein Projekt im Kopf? Kontaktieren Sie mich und lassen Sie
            uns darüber sprechen!
          </p>
          <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  );
}
