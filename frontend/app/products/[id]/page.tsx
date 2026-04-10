import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Bed, Bath, Coffee, Car, Phone, CheckSquare } from "lucide-react";
import { properties } from "@/lib/properties";

export const metadata = {
  title: "Détails du produit - Immo 360 Digital",
};

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id.toString() }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = properties.find((item) => item.id.toString() === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-28">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 py-16 lg:px-8">
        <div className="mb-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1572D3] hover:text-[#0f5bb2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux produits
          </Link>
        </div>

        <div className="grid gap-12 xl:grid-cols-[1.25fr_0.85fr]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={product.image}
                  alt={product.type}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <Bed className="h-5 w-5 text-[#1572D3]" />
                <span className="text-sm font-semibold text-slate-800">{product.rooms}</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <Bath className="h-5 w-5 text-[#1572D3]" />
                <span className="text-sm font-semibold text-slate-800">{product.bath}</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <Coffee className="h-5 w-5 text-[#1572D3]" />
                <span className="text-sm font-semibold text-slate-800">{product.kitchen}</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <Car className="h-5 w-5 text-[#1572D3]" />
                <span className="text-sm font-semibold text-slate-800">{product.parking}</span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">Autres détails</h2>
              <div className="grid gap-4 text-sm text-slate-700">
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">Lieu</p>
                  <p>{product.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">Téléphone</p>
                  <p>{product.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">Propriétaire</p>
                  <p>{product.owner}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">Caution</p>
                    <p>{product.caution}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">Avance</p>
                    <p>{product.advance}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">Visite</p>
                  <p>{product.visit}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-950">{product.type}</h1>
                  <p className="mt-2 text-lg text-slate-600">{product.price}</p>
                  <p className="mt-2 text-sm text-[#B42E2E]">* Prix des extras non inclus.</p>
                </div>

                <div className="grid gap-4">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Nom & Prénom</span>
                    <input
                      type="text"
                      placeholder="Votre nom et prénom"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Téléphone</span>
                    <input
                      type="tel"
                      placeholder="Votre numéro de téléphone"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Email</span>
                    <input
                      type="email"
                      placeholder="login@gmail.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Pays & Ville</span>
                    <input
                      type="text"
                      placeholder="Votre ville"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Message</span>
                    <textarea
                      rows={4}
                      placeholder="Votre message"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-900">
                    <CheckSquare className="h-4 w-4" />
                  </span>
                  <span>J'ai lu et accepté les conditions générales d'utilisation, notamment la mention relative à la protection des données personnelles.</span>
                </label>

                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-900">
                    <CheckSquare className="h-4 w-4" />
                  </span>
                  <span>Souhaitez-vous être informé de l'actualité et des événements importants concernant AIRCAR.</span>
                </label>
              </div>

              <button className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-[#1572D3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]">
                Je réserve
              </button>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Phone className="h-4 w-4 text-[#1572D3]" />
                <span>Besoin d’aide ? Contactez-nous directement.</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
