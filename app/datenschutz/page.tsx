import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz - Davi Meyer Portfolio",
  description: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Datenschutzerklärung
            </span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Datenschutz auf einen Blick
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Allgemeine Hinweise
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können. Diese
              Datenschutzerklärung richtet sich nach dem schweizerischen
              Datenschutzgesetz (DSG).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Datenerfassung auf dieser Website
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
              dieser Website entnehmen.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Wie erfassen wir Ihre Daten?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in
              ein Kontaktformular eingeben. Andere Daten werden automatisch beim
              Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
              allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Wofür nutzen wir Ihre Daten?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gewährleisten. Andere Daten können
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Hosting
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Diese Website wird bei einem externen Dienstleister gehostet
              (Hoster). Die personenbezogenen Daten, die auf dieser Website
              erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Datenschutz
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften der Schweiz (DSG) sowie dieser 
              Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist im Impressum angegeben.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Ihre Rechte nach DSG
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sie haben gemäss schweizerischem Datenschutzgesetz folgende Rechte:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
              <li>Recht auf Berichtigung unrichtiger Daten</li>
              <li>Recht auf Löschung Ihrer Daten</li>
              <li>Recht auf Einschränkung der Datenverarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Recht auf Widerspruch gegen die Datenverarbeitung</li>
              <li>Recht auf Beschwerde beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Kontaktformular
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
