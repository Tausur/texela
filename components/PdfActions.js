"use client";

import { getPdfBlob } from "../utils/pdfStore";
import { Download, Share2, Printer, Cloud } from "lucide-react";

export default function PdfActions() {

  const getPdfUrl = () => {
    const blob = getPdfBlob();
    if (!blob) return null;
    return URL.createObjectURL(blob);
  };

  const handleDownload = () => {
    const blob = getPdfBlob();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Texela-${new Date().toISOString()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
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
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
      >
        Download PDF
      </button>

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
