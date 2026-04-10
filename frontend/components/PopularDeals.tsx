import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";

const PopularDeals = () => {
  const properties = [
    {
      id: 1,
      image: "/assets/Rectangle 7 (1).png",
      title: "Villa Duplex",
      rating: 4.9,
      reviews: 3006,
      details: [
        { icon: "bed", label: "06 Chambres" },
        { icon: "kitchen", label: "02 Cuisines internes" },
        { icon: "car", label: "04 Voitures" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
    {
      id: 2,
      image: "/assets/Rectangle 7 (2).png",
      title: "Pièce studio",
      rating: 4.5,
      reviews: 2436,
      details: [
        { icon: "bed", label: "02 Chambres" },
        { icon: "kitchen", label: "Pas de cuisine" },
        { icon: "car", label: "Pas de Parking" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
    {
      id: 3,
      image: "/assets/Rectangle 7 (3).png",
      title: "Villa Duplex",
      rating: 4.8,
      reviews: 2006,
      details: [
        { icon: "bed", label: "4 Chambres" },
        { icon: "kitchen", label: "Cuisine interne" },
        { icon: "car", label: "02 Voitures" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
    {
      id: 4,
      image: "/assets/Rectangle 7 (5).png",
      title: "Appartement studio",
      rating: 4.2,
      reviews: 6402,
      details: [
        { icon: "bed", label: "1 Chambre" },
        { icon: "kitchen", label: "Cuisine interne" },
        { icon: "car", label: "01 Voiture" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "bed":
        return "🛏️";
      case "kitchen":
        return "🍳";
      case "car":
        return "🚗";
      case "bath":
        return "🛁";
      default:
        return "🏠";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-secondary mb-4">
            Trouvez votre logement qui vous convient en consultant notre parc de location de nos clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-custom-secondary">{property.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-sm text-custom-muted">({property.reviews} vues)</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {property.details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-custom-muted">
                      <span className="text-lg">{getIcon(detail.icon)}</span>
                      <span>{detail.label}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-[#1572D3] hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg">
                  Louer Maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600 hover:border-primary hover:text-primary px-8 py-3 rounded-lg transition-all duration-200"
          >
            Voir Plus
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDeals;