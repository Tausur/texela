"use client";

import { useState } from 'react';
import { getPdfBlob } from "../utils/pdfStore";
import { Download, Share2, Printer, Cloud, Check } from "lucide-react";
import DownloadToast from "./DownloadToast";


export default function PdfActions() {

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const getPdfUrl = () => {
    const blob = getPdfBlob();
    if (!blob) return null;
    return URL.createObjectURL(blob);
  };

  const handleDownload = () => {
    const blob = getPdfBlob();
    if (!blob) return;

    setDownloading(true);
    setDownloaded(false);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Texela-${new Date().toISOString()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);

    // Simulate completion feedback (mobile UX)
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);

      // Hide success message after 3s
      setTimeout(() => setDownloaded(false), 3000);
    }, 800);
  };

  /* 🖨 Print */
  const handlePrint = () => {
    const url = getPdfUrl();
    if (!url) return;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow.print();
    };
  };

  const handleShare = async () => {
    const blob = getPdfBlob();
    if (!blob) return;

    if (!navigator.share) {
      alert("Sharing not supported on this device");
      return;
    }

    const file = new File([blob], "Texela.pdf", {
      type: "application/pdf",
    });

    await navigator.share({
      title: "Texela PDF",
      text: "Here is your converted PDF",
      files: [file],
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2
        ${
          downloading
            ? "bg-purple-400 cursor-wait"
            : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        }`}
      >
        {downloading ? (
          <>
            <span className="animate-spin">⏳</span>
            Downloading…
          </>
        ) : (
          <>
            <Download size={16} />
            Download PDF
          </>
        )}
      </button>

      {/* Success feedback (mobile-friendly) */}
      <DownloadToast visible={downloaded} />

      {/* Action Row */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <Share2 size={16} />
          <span className="text-sm">Share</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex flex-1 items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <Printer size={16} />
          <span className="text-sm">Print</span>
        </button>

        <button
          disabled
          className="flex flex-1 items-center justify-center gap-2 border py-2 rounded-lg opacity-60 cursor-not-allowed"
        >
          <Cloud size={16} />
          <span className="text-sm">Save</span>
        </button>
      </div>

      <button className="w-full border py-2 rounded-lg opacity-60 cursor-not-allowed">
        Edit (Coming soon)
      </button>

      <button className="w-full border py-2 rounded-lg opacity-60 cursor-not-allowed">
        Merge (Coming soon)
      </button>
    </div>
  );
}
