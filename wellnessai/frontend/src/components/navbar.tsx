"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-cyan-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo (clickable - goes to Home page) */}
        <Link href="/home" className="text-3xl font-extrabold text-black">
          <span className="italic">ca</span>Rebot
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link href="src/app/faq" className="text-black font-medium hover:text-gray-700">
            FAQ
          </Link>
          <Link href="/about" className="text-black font-medium hover:text-gray-700">
            About
          </Link>
          <Link href="/signin" className="text-black font-medium hover:text-gray-700">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-cyan-300 px-5 py-2 rounded-full font-medium text-black hover:bg-cyan-400 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
