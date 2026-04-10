import Image from "next/image";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Choisir une action",
      description: "Sélectionnez comment vous voulez vous procurer du logement (location ou achat).",
      image: "/assets/Vector 1.png",
    },
    {
      number: 2,
      title: "Sélectionner un type de logement",
      description: "Sélectionnez le type de logement de votre choix (maison, appartement, pièce studio, chambre salon etc...).",
      image: "/assets/Vector 2.png",
    },
    {
      number: 3,
      title: "Choisir un logement",
      description: "Choisissez un logement disponible parmi les propositions.",
      image: "/assets/Vector 3.png",
    },
    {
      number: 4,
      title: "Valider le paiement",
      description: "Entrez les informations nécessaires et effectuez votre paiement en ligne.",
      image: "/assets/Vector 4.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 px-8 py-3 rounded-2xl mb-6">
            <span className="text-[#1572D3] font-bold text-lg">Comment trouver un logement ?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Louez ou achetez avec quatre étapes suivantes
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center flex flex-col items-center">
              {/* Vector Image with Number Badge */}
              <div className="relative mb-8 flex justify-center items-center">
                {/* Light Blue Background */}
                <div className="absolute w-28 h-28 bg-blue-50 rounded-3xl"></div>
                
                {/* Vector Image */}
                <div className="relative w-24 h-24 flex items-center justify-center z-10">
                  <Image
                    src={step.image}
                    alt={`Step ${step.number}`}
                    fill
                    className="object-contain"
                  />
                </div>

              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;