"use client";

import { useState, useEffect } from "react";
import PdfPreview from "../../../components/PdfPreview";
import PdfActions from "../../../components/PdfActions";

export default function PreviewPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);

  // Detect mobile screens
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    // Desktop layout
    return (
      <div className="h-screen flex">
        <div className="w-[70%] border-r bg-gray-300">
          <PdfPreview />
        </div>
        <div className="w-[30%] p-4 bg-white">
          <PdfActions />
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div className="relative h-screen w-screen bg-gray-100 overflow-hidden">
      {/* PDF preview full screen */}
      <div className="h-full w-full">
        <PdfPreview />
      </div>

      {/* Bottom sliding actions */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-xl shadow-xl p-4 transition-transform duration-300 ease-in-out z-40`}
        style={{
          transform: sliderOpen
            ? "translateY(0)"
            : "translateY(50%)", // 50% of slider visible
          maxHeight: "80%",
        }}
      >
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setSliderOpen((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 transition-transform duration-300"
          >
            {/* Rotate arrow based on slider state */}
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                sliderOpen ? "rotate-0" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Actual actions */}
        <PdfActions />
      </div>
    </div>
  );
}
