"use client";

import { useState } from "react";

export default function PdfControls({ numPages, pageNumber, setPageNumber, scale, setScale,fixed }) {
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div className={`${fixed ? 'fixed' : 'absolute'} bottom-4 left-1/3 -translate-x-1/2 flex items-center space-x-4 bg-transparent backdrop-blur-[20px] rounded-xl shadow-lg p-2 z-50 hidden md:flex`}>

      {/* Zoom Out */}
      <button
        onClick={handleZoomOut}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition cursor-pointer font-bold text-2xl"
      >
        -
      </button>

      {/* Zoom In */}
      <button
        onClick={handleZoomIn}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition cursor-pointer font-bold text-2xl"
      >
        +
      </button>

      {/* Page navigation */}
      <button
        onClick={handlePrevPage}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition cursor-pointer"
      >
        ◀
      </button>
      <span className="px-2 font-medium text-gray-700">
        {pageNumber} / {numPages}
      </span>
      <button
        onClick={handleNextPage}
        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition cursor-pointer"
      >
        ▶
      </button>
    </div>
  );
}
