"use client";

import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useEffect, useState, useRef } from "react";
import { getPdfBlob } from "../utils/pdfStore";
import PdfControls from "./PdfControls"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfPreview() {
  const [blob, setBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const pageRefs = useRef([]);

  useEffect(() => {
    setBlob(getPdfBlob());
  }, []);

  if (!blob) return <p className="p-4">No PDF found</p>;

  // Called when PDF is loaded
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages);
  };

  /* 🔹 Detect visible page while scrolling */
  const handleScroll = () => {
    if (!containerRef.current) return;

    const containerTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    const center = containerTop + containerHeight / 2;

    for (let i = 0; i < pageRefs.current.length; i++) {
      const page = pageRefs.current[i];
      if (!page) continue;

      const top = page.offsetTop;
      const bottom = top + page.offsetHeight;

      if (center >= top && center <= bottom) {
        setPageNumber(i + 1);
        break;
      }
    }
  };

  /* 🔹 Scroll to page */
  const scrollToPage = (targetPage) => {
    const pageEl = pageRefs.current[targetPage - 1];
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <div ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-auto flex justify-center p-4">
        <div className="w-full max-w-[700px]">
          <Document file={blob} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <div
                key={index}
                ref={(el) => (pageRefs.current[index] = el)}
                className="mb-4 flex justify-center"
              >
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index+1}
                  scale={scale}
                  className="mx-auto mb-2"
                />
              </div>
            ))}
          </Document>
        </div>

        {/* Controls always visible at bottom of screen */}
        {numPages && (
          <PdfControls
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={(p) => {
              setPageNumber(p);
              scrollToPage(p);
            }}
            scale={scale}
            setScale={setScale}
            fixed={true}
          />
        )}
      </div>
    );
  }
