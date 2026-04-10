import Image from "next/image";
import Link from "next/link";
import { Globe, Facebook } from "lucide-react";

export const metadata = {
  title: "Inscription - Immo 360 Digital",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl min-h-[650px]">
            <Image
              src="/Registration.png"
              alt="Registration presentation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12 text-white">
              <span className="mb-6 text-sm tracking-[0.35em] uppercase text-slate-200 opacity-90">
                Immo 360 Digital
              </span>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Créez votre compte en quelques secondes et accédez à une plateforme pensée pour vos besoins.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-200/90">
                Rejoignez les propriétaires, locataires et investisseurs qui utilisent Immo 360 Digital pour trouver le logement idéal.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-2xl sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <h2 className="text-3xl font-semibold text-slate-950">Inscription</h2>
              <p className="text-sm text-slate-600">
                Avez-vous déjà un compte ?{' '}
                <Link href="/login" className="font-medium text-[#1572D3] hover:text-[#0f5bb2]">
                  Se connecter
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Globe className="h-5 w-5 text-[#EA4335]" />
                Continuer avec Google
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Facebook className="h-5 w-5 text-[#1877F2]" />
                Continuer avec Facebook
              </button>
            </div>

            <div className="relative my-10 flex items-center">
              <span className="absolute left-0 right-0 h-px bg-slate-200" />
              <span className="relative mx-auto bg-white px-4 text-sm text-slate-500">Ou</span>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nom complet</label>
                <input
                  type="text"
                  placeholder="Entrez votre nom"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="exemple@mail.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Téléphone</label>
                <input
                  type="tel"
                  placeholder="+228 90 000 000"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Mot de passe</span>
                  <span className="text-slate-500">Cacher</span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Confirmation</span>
                  <span className="text-slate-500">Cacher</span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <button className="w-full rounded-2xl bg-[#1572D3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]">
                S’inscrire
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Avez-vous déjà un compte ?{' '}
              <Link href="/login" className="font-medium text-[#1572D3] hover:text-[#0f5bb2]">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
