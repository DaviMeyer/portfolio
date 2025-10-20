import { Metadata } from "next";
import { projects } from "@/lib/data";
import ExpandableCard from "@/components/ExpandableCard";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Projekte - Davi Meyer Portfolio",
  description: "Entdecken Sie meine Projekte und bisherige Arbeiten",
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <PageHeader
        title="Meine Projekte"
        subtitle="Eine Auswahl meiner Arbeiten und Side-Projects"
      />

      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              ⭐ Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
              Projekte, auf die ich besonders stolz bin
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-1 gap-8 max-w-5xl justify-items-center w-full">
              {featuredProjects.map((project, index) => (
              <ExpandableCard
                key={index}
                title={project.title}
                description={project.description}
                imagePlaceholder={
                  <div className="h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-8xl">
                    {getProjectIcon(index)}
                  </div>
                }
                tags={project.tags}
                imageHeight="h-64"
                className="bg-gray-50 dark:bg-gray-800 w-full max-w-md"
                actions={
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-center font-medium"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                    >
                      Demo
                    </a>
                  </div>
                }
              />
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Weitere Projekte
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Andere interessante Arbeiten und Experimente
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl justify-items-center w-full">
              {otherProjects.map((project, index) => (
              <ExpandableCard
                key={index}
                title={project.title}
                description={project.description}
                imagePlaceholder={
                  <div className="h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-6xl">
                    {getProjectIcon(index + featuredProjects.length)}
                  </div>
                }
                tags={project.tags.slice(0, 2)}
                imageHeight="h-48"
                className="bg-white dark:bg-gray-900 w-full max-w-sm"
                actions={
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 transition-colors text-center text-sm font-medium"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                    >
                      Demo
                    </a>
                  </div>
                }
              />
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interessiert an einer Zusammenarbeit?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Ich bin immer offen für neue Projekte und interessante
            Herausforderungen.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            Kontaktieren Sie mich
          </a>
        </div>
      </section>
    </div>
  );
}

// Helper function to get project icons
function getProjectIcon(index: number): string {
  const icons = ["🛒", "✅", "🌤️", "📝", "📰", "🤖", "💡", "🎨"];
  return icons[index % icons.length];
}
