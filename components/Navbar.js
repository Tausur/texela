"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Ensure client-only rendering (fixes hydration error)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 960) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  if (!mounted) return null;

  const navLinks = ["Convert", "Docs", "Pricing", "Support"];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-white rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center font-bold text-black cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img src="../logo1.png" alt="Texela logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-serif">Texela</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveLink(link)}
              className="px-4 py-2 cursor-pointer rounded-full text-black font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-2xl transition-transform duration-300"
        >
          <span className={mobileMenuOpen ? "rotate-90 inline-block" : "inline-block"}>
            {mobileMenuOpen ? "✖️" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="border-t mx-6 my-2" />
        <div className="px-6 pb-4 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActiveLink(link);
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 rounded-full text-black font-medium text-left transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}