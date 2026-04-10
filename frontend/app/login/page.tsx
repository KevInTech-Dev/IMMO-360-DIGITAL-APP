import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Connexion - Immo 360 Digital",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl min-h-[650px]">
            <Image
              src="/Registration.png"
              alt="Login presentation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12 text-white">
              <span className="mb-6 text-sm tracking-[0.35em] uppercase text-slate-200 opacity-90">
                Immo 360 Digital
              </span>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Connectez-vous et retrouvez tous vos biens, vos messages et vos réservations.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-200/90">
                Accédez à votre espace personnel en toute simplicité, où que vous soyez.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-2xl sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <h2 className="text-3xl font-semibold text-slate-950">Connexion</h2>
              <Link href="/register" className="inline-flex items-center gap-2 text-sm font-medium text-[#1572D3] hover:text-[#0f5bb2]">
                <ArrowLeft className="h-4 w-4" />
                S’inscrire
              </Link>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="exemple@mail.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <button className="w-full rounded-2xl bg-[#1572D3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]">
                Se connecter
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Pas encore de compte ?{' '}
              <Link href="/register" className="font-medium text-[#1572D3] hover:text-[#0f5bb2]">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
