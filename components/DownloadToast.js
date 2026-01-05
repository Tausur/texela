"use client";

import { Check } from "lucide-react";
import { createPortal } from "react-dom";

export default function DownloadToast({ visible }) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-[99999]
        transition-all duration-300 ease-out
        ${
          visible
            ? "opacity-100 bottom-[20%] scale-100"
            : "opacity-0 bottom-[15%] scale-95 pointer-events-none"
        }
      `}
    >
      <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full shadow-xl">
        <Check size={16} />
        <span className="text-sm font-medium">PDF downloaded</span>
      </div>
    </div>,
    document.body
  );
}
