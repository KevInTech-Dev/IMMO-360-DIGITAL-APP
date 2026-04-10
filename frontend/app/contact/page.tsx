import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact - Immo 360 Digital",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[480px_minmax(0,623px)] lg:items-start">
          <section className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-slate-950">Contactez-nous</h1>
              <p className="max-w-xl text-base leading-8 text-slate-700/80">
                Nous serions ravis d’avoir de vos nouvelles. Veuillez remplir ce formulaire.
              </p>
            </div>

            <form className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Prénom</label>
                  <input
                    type="text"
                    placeholder="Prénoms"
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nom</label>
                  <input
                    type="text"
                    placeholder="Nom"
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="utilisateur@compagnie.com"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Numéro de téléphone</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <span className="inline-flex h-11 items-center rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700">
                    +228
                  </span>
                  <input
                    type="tel"
                    placeholder="90 90 90 90"
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                  placeholder="Entrez votre message..."
                  rows={6}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1572D3] focus:ring-[#1572D3]" />
                Vous acceptez notre politique de confidentialité conviviale.
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1572D3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]"
              >
                Envoyer le message
              </button>
            </form>
          </section>

          <section className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-950">Nous serions ravis d’avoir de vos nouvelles</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-700/80">
                Envie de clarifier quelque chose ? Nous sommes à votre disposition pour soulager toutes vos inquiétudes.
              </p>
            </div>

            <div className="grid gap-6">
              <article className="flex items-start gap-5 rounded-3xl border border-slate-200 bg-[#FFF4EC] p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-sm text-[#EA7338]">
                  <Mail className="h-6 w-6" />
                </span>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-slate-950">Email</h3>
                    <p className="text-sm text-slate-600">Notre conviviale équipe est là pour aider.</p>
                  </div>
                  <p className="text-lg font-medium text-[#6D47F1]">info@immodigital.com</p>
                </div>
              </article>

              <article className="flex items-start gap-5 rounded-3xl border border-slate-200 bg-[#F6F2FF] p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-sm text-[#6D47F1]">
                  <Phone className="h-6 w-6" />
                </span>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-slate-950">Téléphone</h3>
                    <p className="text-sm text-slate-600">Lun-Ven de 08h à 17h.</p>
                  </div>
                  <p className="text-lg font-medium text-[#6D47F1]">+228 90 90 90 90</p>
                </div>
              </article>

              <article className="flex items-start gap-5 rounded-3xl border border-slate-200 bg-[#E6F7F2] p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-sm text-[#3DBB86]">
                  <MapPin className="h-6 w-6" />
                </span>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-slate-950">Siège</h3>
                    <p className="text-sm text-slate-600">Rendez-vous à notre siège :</p>
                  </div>
                  <p className="text-lg font-medium text-[#6D47F1]">BP 01, Bvd Kara, Gbossimé, Lomé Togo</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
