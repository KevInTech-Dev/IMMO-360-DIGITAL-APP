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

      <div className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-16 xl:grid-cols-[1.2fr_0.8fr]">
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

            <div className="grid gap-3 sm:grid-cols-4">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <Bed className="h-4 w-4 text-[#1572D3]" />
                <span>{product.rooms}</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <Bath className="h-4 w-4 text-[#1572D3]" />
                <span>{product.bath}</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <Coffee className="h-4 w-4 text-[#1572D3]" />
                <span>{product.kitchen}</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <Car className="h-4 w-4 text-[#1572D3]" />
                <span>{product.parking}</span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
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
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-semibold text-slate-950">{product.type}</h1>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.status === "Disponible"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
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
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-[#1572D3] focus:ring-[#1572D3]"
                  />
                  <span>J'ai lu et accepté les conditions générales d'utilisation, notamment la mention relative à la protection des données personnelles.</span>
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-[#1572D3] focus:ring-[#1572D3]"
                  />
                  <span>Souhaitez-vous être informé de l'actualité et des événements importants concernant AIRCAR.</span>
                </label>
              </div>

              <button className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#1572D3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]">
                Je réserve
              </button>

              <p className="mt-4 text-sm text-slate-600">
                Besoin d’aide ? <Link href="/contact" className="font-semibold text-[#1572D3] hover:text-[#0f5bb2]">Contactez-nous</Link>.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
