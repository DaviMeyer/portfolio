import { Metadata } from "next";
import { experience, education, skills } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Erfahrung - Davi Meyer Portfolio",
  description: "Beruflicher Werdegang, Skills und Ausbildung von Davi Meyer",
};

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <PageHeader
        title="Meine Erfahrung"
        subtitle="Werdegang, Skills und berufliche Stationen"
      />

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technische Skills
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Technologien und Tools, mit denen ich arbeite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Beruflicher Werdegang
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Meine beruflichen Stationen im Überblick
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-600"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            📍 {exp.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        🗓 {exp.period}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {exp.description}
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">
                          Highlights:
                        </p>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                            >
                              <span className="text-blue-600 mr-2">✓</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ausbildung
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Meine akademische Laufbahn
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-xl text-blue-100 mb-1">
                      {edu.institution}
                    </p>
                    <p className="text-blue-100">📍 {edu.location}</p>
                  </div>
                  <span className="text-lg font-semibold bg-white/20 px-4 py-2 rounded-lg">
                    {edu.period}
                  </span>
                </div>
                <p className="text-blue-50">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
