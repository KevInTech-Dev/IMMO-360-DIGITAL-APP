import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Promotions - Immo 360 Digital",
};

const promotions = [
  {
    title: "Loyer réduit de 20%",
    subtitle: "Villa Duplex avec piscine",
    description: "Profitez d’un tarif exceptionnel pour un séjour longue durée à Agbalépédo.",
    badge: "Offre limitée",
    action: "Voir le bien",
    href: "/products/1",
  },
  {
    title: "Studio ergonomique",
    subtitle: "Pièce studio moderne",
    description: "Tarif spécial pour étudiants et jeunes professionnels à Lomé.",
    badge: "Nouveau",
    action: "Voir le bien",
    href: "/products/2",
  },
  {
    title: "Maison familiale confort",
    subtitle: "Offre spéciale famille",
    description: "Caution réduite et visite gratuite pour les réservations avant fin de mois.",
    badge: "Promotion",
    action: "Voir le bien",
    href: "/products/5",
  },
];

export default function PromotionsPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      <Navbar />

      <section className="bg-[#F8FAFF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex rounded-full bg-[#E8F1FF] px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#1572D3]">
              Promotions
            </p>
            <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
              Offres spéciales et promotions du moment
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Découvrez nos meilleures promotions sur des biens sélectionnés, avec des remises exclusives et des avantages de réservation.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {promotions.map((promo) => (
              <article key={promo.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1572D3]">{promo.badge}</p>
                    <h2 className="mt-4 text-xl font-semibold text-slate-950">{promo.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">{promo.subtitle}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-600">{promo.description}</p>
                <Link
                  href={promo.href}
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#1572D3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]"
                >
                  {promo.action}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-20 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1572D3]">Promotion exclusive</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">Réserver aujourd’hui, économiser demain</h2>
                <p className="mt-4 text-slate-600 leading-7">
                  Tous les biens mis en promotion sont disponibles pour une réservation rapide. Les offres sont limitées dans le temps et valables uniquement pour les premiers visiteurs.
                </p>
              </div>
              <div className="space-y-3 rounded-[1.5rem] bg-[#EFF8FF] p-6">
                <p className="text-lg font-semibold text-slate-950">Avantages de ces promotions</p>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#1572D3]" />
                    Réduction sur le loyer mensuel
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#1572D3]" />
                    Priorité de visite et réservation rapide
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#1572D3]" />
                    Accompagnement dédié lors de la réservation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
