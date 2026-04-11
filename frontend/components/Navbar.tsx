"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "ACCUEIL", href: "/" },
    { name: "PRODUITS", href: "/products" },
    { name: "PROMOTIONS", href: "/promotions" },
    { name: "À PROPOS", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b h-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assets/LogoSansBack 1.svg"
                alt="Immo 360 Digital"
                width={100}
                height={100}
                className="h-23 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-[#1572D3] transition-all duration-300 font-medium text-base py-2 px-3 rounded-md hover:bg-[#1572D3]/5 hover:scale-105 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1572D3] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="inline-flex w-[160px] h-[40px] items-center justify-center bg-[#1572D3] text-white hover:bg-[#0f5bb2] rounded-lg font-medium text-sm px-6 py-3 transition-all duration-200">
              CONNEXION
            </Link>
            <Link href="/register" className="inline-flex w-[160px] h-[40px] items-center justify-center border-2 border-gray-600 text-gray-600 hover:bg-[#1572D3] hover:text-white rounded-lg font-medium text-sm px-6 py-3 transition-all duration-200">
              INSCRIPTION
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors duration-200 font-medium text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Link href="/login" className="inline-flex w-full h-[43px] items-center justify-center bg-[#1572D3] text-white hover:bg-[#0f5bb2] rounded-lg font-medium text-sm transition-all duration-200">
                  CONNEXION
                </Link>
                <Link href="/register" className="inline-flex w-full h-[43px] items-center justify-center border-2 border-[#1572D3] text-[#1572D3] hover:bg-[#1572D3] hover:text-white rounded-lg font-medium text-sm transition-all duration-200">
                  INSCRIPTION
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;