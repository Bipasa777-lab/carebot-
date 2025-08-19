"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cyan-300 shadow-lg" : "bg-cyan-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-black italic">
          caRebot
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/home" className="text-black font-medium hover:text-gray-700">
            Dashboard
          </Link>
          <Link href="/faq" className="text-black font-medium hover:text-gray-700">
            FAQ
          </Link>
          <Link href="/about" className="text-black font-medium hover:text-gray-700">
            About
          </Link>
          <Link
            href="/signin"
            className="bg-cyan-300 px-5 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-cyan-300 px-5 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-black">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-cyan-200 shadow-lg">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link href="/home" className="text-black font-medium text-lg hover:text-gray-700" onClick={toggleMobileMenu}>
              Dashboard
            </Link>
            <Link href="/faq" className="text-black font-medium text-lg hover:text-gray-700" onClick={toggleMobileMenu}>
              FAQ
            </Link>
            <Link href="/about" className="text-black font-medium text-lg hover:text-gray-700" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link
              href="/signin"
              className="bg-cyan-300 px-6 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition"
              onClick={toggleMobileMenu}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-cyan-300 px-6 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition"
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
