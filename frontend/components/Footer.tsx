import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0F3B5C] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Immo 360 Digital</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300 text-sm">+ 228 90000000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300 text-sm">info@immodigital.tg</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Actions Rapides</h3>
            <div className="space-y-2">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                ➤ Accueil
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                ➤ À Propos
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                ➤ Contacts
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                ➤ Location
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                ➤ Achat
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                ➤ Vente
              </Link>
            </div>
          </div>

          {/* Column 3: Information Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Immo 360 Digital</h3>
            <div className="space-y-2">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                QUI SOMMES-NOUS?
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                NOTRE BLOG
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                PROGRAMME DE FIDÉLITÉ AutoDrive
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                FAQ
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block">
                CONSEILS LOCATION DE VOITURES
              </Link>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-Nous</h3>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-all duration-200">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright 2025 • Location et achat de biens immobiliers, Tous Droits Réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;