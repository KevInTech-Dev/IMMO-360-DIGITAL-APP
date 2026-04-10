import Image from "next/image";
import { Tag, Calendar, MapPin, Gift } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Tag,
      title: "Nos tarifs",
      description: "Nos prix sont compétitifs et avantageux.",
    },
    {
      icon: Calendar,
      title: "Disponibilité",
      description: "Vous pouvez trouver votre bien immobilier à tout moment.",
    },
    {
      icon: MapPin,
      title: "Proximité",
      description: "Nous travaillons avec 500+ propriétaires et 1000+ bailleurs sur toute l'étendue du territoire qui fournissent de biens fréquemment.",
    },
    {
      icon: Gift,
      title: "Notre offre",
      description: "Nos biens immobiliers sont diversifiés et adaptés à vos besoins.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative order-1 lg:order-1">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/reside.png"
                alt="Why Choose Us"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-2 lg:order-2">
            <div className="space-y-4">
              <div className="inline-block bg-blue-100 px-6 py-2 rounded-2xl">
                <span className="text-[#1572D3] font-bold text-lg">Pourquoi nous choisir ?</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Votre location et achat des biens immobiliers.
              </h2>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-[#1572D3]" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;