import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Bed, Store, Car, Bath } from "lucide-react";

const PopularDeals = () => {
  const properties = [
    {
      id: 1,
      image: "/assets/Rectangle 7 (1).png",
      title: "Villa Duplex",
      price: "20 000 XOF /Mois",
      rating: 4.9,
      reviews: 3006,
      details: [
        { icon: "bed", label: "06 Chambres" },
        { icon: "store", label: "02 Cuisines internes" },
        { icon: "car", label: "04 Voitures" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
    {
      id: 2,
      image: "/assets/Rectangle 7 (2).png",
      title: "Pièce studio",
      price: "7 500 XOF /Mois",
      rating: 4.5,
      reviews: 2436,
      details: [
        { icon: "bed", label: "02 Chambres" },
        { icon: "store", label: "Pas de cuisine" },
        { icon: "car", label: "Pas de Parking" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
    {
      id: 3,
      image: "/assets/Rectangle 7 (3).png",
      title: "Villa Duplex",
      price: "22 000 XOF /Mois",
      rating: 4.8,
      reviews: 2006,
      details: [
        { icon: "bed", label: "04 Chambres" },
        { icon: "store", label: "Cuisine interne" },
        { icon: "car", label: "02 Voitures" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
    {
      id: 4,
      image: "/assets/Rectangle 7 (5).png",
      title: "Appartement studio",
      price: "9 000 XOF /Mois",
      rating: 4.2,
      reviews: 6402,
      details: [
        { icon: "bed", label: "01 Chambre" },
        { icon: "store", label: "Cuisine interne" },
        { icon: "car", label: "01 Voiture" },
        { icon: "bath", label: "WC, douche interne" },
      ],
    },
  ];

  const iconMap: Record<string, typeof Bed> = {
    bed: Bed,
    store: Store,
    car: Car,
    bath: Bath,
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
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-custom-secondary">{property.title}</h3>
                    <p className="text-sm text-slate-500">{property.price}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-slate-500">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{property.rating}</span>
                    <span>({property.reviews} vues)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-600">
                  {property.details.map((detail, index) => {
                    const IconComponent = iconMap[detail.icon];
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <IconComponent className="h-3.5 w-3.5 text-[#1572D3]" />
                        <span>{detail.label}</span>
                      </div>
                    );
                  })}
                </div>

                <Link href={`/products/${property.id}`} className="inline-flex w-full items-center justify-center rounded-lg bg-[#1572D3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 hover:shadow-lg">
                  Louer Maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-600 transition hover:border-[#1572D3] hover:text-[#1572D3] hover:bg-slate-50">
            Voir Plus
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDeals;