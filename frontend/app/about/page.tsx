import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "À propos - Immo 360 Digital",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      <Navbar />

      <section className="bg-[#F8FAFF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full bg-[#E8F1FF] px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#1572D3]">
              À propos
            </p>
            <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
              Immo 360 Digital, votre partenaire immobilier de confiance
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              Nous aidons particuliers et professionnels à louer, acheter et vendre des biens immobiliers au Togo, avec transparence, accompagnement et offres adaptées.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">Notre mission</h2>
              <p className="mt-4 text-slate-600 leading-7">
                Simplifier l’accès au logement et à l’investissement immobilier grâce à des solutions digitales claires, une sélection de biens vérifiés et un service client dédié.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">Notre vision</h2>
              <p className="mt-4 text-slate-600 leading-7">
                Devenir la plateforme immobilière la plus fiable de la région en proposant des expériences de location et d’achat modernes, sûres et personnalisées.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-semibold text-slate-950">500+</p>
              <p className="mt-3 text-sm text-slate-600">Biens publiés</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-semibold text-slate-950">98%</p>
              <p className="mt-3 text-sm text-slate-600">Clients satisfaits</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-semibold text-slate-950">24/7</p>
              <p className="mt-3 text-sm text-slate-600">Support client</p>
            </div>
          </div>

          <div className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">Pourquoi nous choisir ?</h3>
                <p className="mt-4 text-slate-600 leading-7">
                  Nous combinons expérience immobilière locale, technologies modernes et accompagnement humain pour vous aider à prendre les bonnes décisions.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl bg-[#F0F7FF] p-5">
                  <p className="text-sm font-medium text-[#1572D3]">Sélection vérifiée</p>
                  <p className="mt-2 text-sm text-slate-600">Chaque bien est sélectionné avec soin pour garantir fiabilité et qualité.</p>
                </div>
                <div className="rounded-3xl bg-[#F8FEF9] p-5">
                  <p className="text-sm font-medium text-emerald-700">Soutien personnalisé</p>
                  <p className="mt-2 text-sm text-slate-600">Un interlocuteur dédié vous accompagne à chaque étape.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl bg-[#FEF4F4] p-5">
                  <p className="text-sm font-medium text-rose-700">Transparence totale</p>
                  <p className="mt-2 text-sm text-slate-600">Des informations claires et une communication sans surprise.</p>
                </div>
                <div className="rounded-3xl bg-[#FFF8E5] p-5">
                  <p className="text-sm font-medium text-[#B47B00]">Offres flexibles</p>
                  <p className="mt-2 text-sm text-slate-600">Des solutions adaptées à tous les budgets et besoins.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1572D3]">Envie d’en savoir plus ?</p>
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Découvrir nos engagements et notre équipe</h2>
            <p className="max-w-2xl text-slate-600">
              Contactez-nous pour une étude personnalisée ou pour une visite de bien. Nous sommes prêts à vous accompagner sur chaque projet immobilier.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-[#1572D3] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]">
              Aller vers Contacts
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
