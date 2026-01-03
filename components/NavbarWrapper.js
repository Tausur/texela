"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper({ children }) {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Top offset of navbar (top-12 = 3rem = 48px)
  const topOffset = 100;

  useEffect(() => {
    const updateHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div ref={navbarRef}>
        <Navbar />
      </div>

      {/* Page content pushed below navbar */}
      <main style={{ paddingTop: navbarHeight + topOffset }}>
        {children}
      </main>
    </>
  );
}
