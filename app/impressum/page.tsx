import { Metadata } from "next";
import { personalInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impressum - Davi Meyer Portfolio",
  description: "Impressum und rechtliche Angaben",
};

export default function ImpressumPage() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Impressum
            </span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Angaben gemäss schweizerischem Obligationenrecht
            </h2>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">
                {personalInfo.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Zürich, Switzerland
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Kontakt
            </h3>
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                E-Mail:{" "}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {personalInfo.email}
                </a>
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Haftungsausschluss
            </h3>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Haftung für Inhalte
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Gemäss den 
              gesetzlichen Bestimmungen sind wir für eigene Inhalte auf 
              diesen Seiten nach den allgemeinen schweizerischen Gesetzen 
              verantwortlich.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Haftung für Links
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Urheberrecht
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
