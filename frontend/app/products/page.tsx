import { properties } from "@/lib/properties";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Bed, Building2, Car, Bath } from "lucide-react";

export const metadata = {
  title: "Produits - Immo 360 Digital",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-4 py-16 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 xl:grid-cols-[320px_minmax(0,1.2fr)]">
          <section className="self-start w-full space-y-8 rounded-[2rem] border border-slate-300 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold text-slate-950">Filtrez les biens</h1>
              <p className="text-sm text-slate-600">
                Affinez votre recherche par prix, quartier et catégorie pour trouver le bien qui vous convient.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Prix</label>
                <input
                  type="text"
                  placeholder="20 000/Mois"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Ville</label>
                <input
                  type="text"
                  placeholder="Lomé"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Quartier</label>
                <input
                  type="text"
                  placeholder="Agbalépédo"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Action</label>
                <input
                  type="text"
                  placeholder="Louer"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Catégorie</label>
                <input
                  type="text"
                  placeholder="Appartement"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572D3] focus:ring-2 focus:ring-[#1572D3]/20"
                />
              </div>
            </div>

            <button className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-[#1572D3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5bb2]">
              Rechercher
            </button>
          </section>

          <section className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <article>
                    <div className="relative h-56 w-full">
                      <Image
                        src={product.image}
                        alt={product.type}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-semibold text-slate-950">{product.type}</h3>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                product.status === "Disponible"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {product.status}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-slate-500">{product.rating} ★ ({product.reviews} vues)</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {product.price}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-[#1572D3]" />
                          <span>{product.rooms}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-[#1572D3]" />
                          <span>{product.kitchen}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-[#1572D3]" />
                          <span>{product.parking}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-4 w-4 text-[#1572D3]" />
                          <span>{product.bath}</span>
                        </div>
                      </div>
                      <div className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#1572D3] px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-[#0f5bb2]">
                        Louer Maintenant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
