import Link from "next/link";

export default function CTASection() {
  return (
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
  );
}
