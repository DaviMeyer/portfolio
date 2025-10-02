import { Metadata } from "next";
import { about, personalInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Über mich - Davi Meyer Portfolio",
  description: "Erfahren Sie mehr über Davi Meyer - Interessen, Hobbys und Hintergrund",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Über mich
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Lerne mehr über meine Geschichte und was mich antreibt
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {about.description.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meine Hobbys
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Was ich gerne mache, wenn ich nicht arbeite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.hobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-6xl">
                  {getHobbyIcon(hobby.title)}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {hobby.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {hobby.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Kurz & Knapp</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Standort</p>
                    <p className="text-blue-100">{personalInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="font-semibold">Position</p>
                    <p className="text-blue-100">{personalInfo.title}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold">E-Mail</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper function to get hobby icons
function getHobbyIcon(title: string): string {
  const icons: { [key: string]: string } = {
    Programmieren: "💻",
    Fotografie: "📷",
    Wandern: "🥾",
    Gaming: "🎮",
  };
  return icons[title] || "🎨";
}
