"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="relative bg-white pt-40 pb-12 overflow-visible min-h-screen">

      {/* Hero Image - Absolute Positioning */}
      <div className="absolute top-[158px] right-0 w-[826px] h-[465px] z-20">
        <Image
          src="/assets/picture 1.png"
          alt="Hero Building"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="font-urbanist font-semibold text-5xl lg:text-6xl leading-tight text-gray-900 mb-6">
            Trouvez plus rapidement et facilement vos{" "}
            <span className="text-[#1572D3]">biens immobiliers</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins font-medium text-lg leading-relaxed text-gray-700 mb-19">
            <span className="text-[#1572D3] font-semibold">Immo 360 Digital</span>, votre plateforme de location, achat et vente des maisons, appartements, pièces studio, chambre salon, terrain et bien plus.
          </p>

          {/* Discover Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              className="border-2 border-[#1572D3] text-[#1572D3] hover:bg-[#1572D3] hover:text-white px-8 py-3 rounded-xl transition-all duration-200 font-medium"
            >
              Découvrir
            </Button>
          </div>
        </div>

        {/* Search Form - Positioned below text, above images */}
        <div className="relative z-40 mt-[100px]">
          <div className="bg-white border border-slate-300 rounded-[32px] shadow-lg p-6 max-w-full">
            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4 items-start">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] font-bold text-gray-900">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-100 text-[#1572D3]">
                      <Image src="/assets/localisation.svg" alt="Location" width={18} height={18} />
                    </span>
                    Ville du logement
                  </div>
                  <Input
                    placeholder="Rechercher une ville ou un village"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-500 hover:border-slate-400 focus:border-[#1572D3] focus:ring-1 focus:ring-[#1572D3]/20 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] font-bold text-gray-900">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-100 text-[#1572D3]">
                      <Image src="/assets/localisation.svg" alt="Location" width={18} height={18} />
                    </span>
                    Quartier du logement
                  </div>
                  <Input
                    placeholder="Rechercher un quartier"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-500 hover:border-slate-400 focus:border-[#1572D3] focus:ring-1 focus:ring-[#1572D3]/20 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between border-t border-slate-200 pt-4 xl:border-t-0 xl:border-l xl:pl-4 xl:pt-0">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.24em] font-bold text-gray-900">Type de logement</p>
                    <Input
                      placeholder="Ex : Appartement"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-500 hover:border-slate-400 focus:border-[#1572D3] focus:ring-1 focus:ring-[#1572D3]/20 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.24em] font-bold text-gray-900">Action</p>
                    <Input
                      placeholder="Ex : Acheter"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-500 hover:border-slate-400 focus:border-[#1572D3] focus:ring-1 focus:ring-[#1572D3]/20 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-5 xl:mt-5 xl:flex xl:justify-end">
                  <Button className="bg-[#1572D3] hover:bg-[#0f5bb2] text-white px-10 py-4 rounded-2xl font-medium transition-all duration-200 w-full xl:w-auto">
                    TROUVER UN LOGEMENT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;