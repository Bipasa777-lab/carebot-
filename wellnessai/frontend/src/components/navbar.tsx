"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname(); // To track current route
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Function to check if link is active
  const isActive = (href: string) => pathname === href;

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
          <Link
            href="/home"
            className={`text-black font-medium hover:text-gray-700 ${
              isActive("/home") ? "underline decoration-2 underline-offset-2" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/faq"
            className={`text-black font-medium hover:text-gray-700 ${
              isActive("/faq") ? "underline decoration-2 underline-offset-2" : ""
            }`}
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className={`text-black font-medium hover:text-gray-700 ${
              isActive("/about") ? "underline decoration-2 underline-offset-2" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/auth/signin"
            className={`px-5 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition ${
              isActive("/auth/signin") ? "bg-cyan-400" : "bg-cyan-300"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className={`px-5 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition ${
              isActive("/auth/signup") ? "bg-cyan-400" : "bg-cyan-300"
            }`}
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
            <Link
              href="/home"
              className="text-black font-medium text-lg hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/faq"
              className="text-black font-medium text-lg hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="text-black font-medium text-lg hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="/auth/signin"
              className="bg-cyan-300 px-6 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition"
              onClick={toggleMobileMenu}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
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
