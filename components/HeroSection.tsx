import Link from "next/link";
import { personalInfo } from "@/lib/data";
import SocialLinks from "./SocialLinks";

export default function HeroSection() {
  return (
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
            <SocialLinks />
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
  );
}
