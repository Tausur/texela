"use client";

import { useState } from "react";
import { convertImagesToPdf } from "../utils/ImageToPdf";
import { ReactSortable } from "react-sortablejs";
import Modal from "react-modal";

export default function UploadSection() {
  const [items, setItems] = useState([]);
  const [previewModalSrc, setPreviewModalSrc] = useState(null);

  // Handle file upload
  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newItems = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  // Remove image
  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Convert to PDF (USES UI ORDER)
  const handleConvert = () => {
    if (items.length === 0) {
      alert("Please select at least one image!");
      return;
    }

    const orderedFiles = items.map((item) => item.file);
     // Create timestamp
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19); // YYYY-MM-DDTHH-MM-SS

    const filename = `Texela-${timestamp}.pdf`;
    convertImagesToPdf(orderedFiles, filename);
  };

  return (
    <section className="mt-5 py-10 flex items-center justify-center bg-linear-to-br from-purple-600 via-indigo-500 to-cyan-400 rounded-lg">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 md:w-[60%] w-[80%] text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          Convert Images to PDF
        </h1>

        <p className="mt-3 text-gray-600">
          Upload JPG, PNG or WEBP images and convert them instantly
        </p>

        {/* Upload Box */}
        <label className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:border-purple-500 transition-all duration-300 hover:bg-gray-50">
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            className="hidden"
            onChange={handleFiles}
          />

          <div className="text-5xl mb-2">📄</div>
          <p className="font-medium text-gray-700">
            Click to upload or drag & drop
          </p>
          <p className="text-sm text-gray-500 mt-1">
            JPG, PNG, WEBP supported
          </p>
        </label>

        {/* Image previews (sortable) */}
        {items.length > 0 && (
          <ReactSortable
            list={items}
            setList={setItems}
            className="mt-4 flex flex-wrap justify-center gap-3"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="relative w-24 h-24 group cursor-grab active:cursor-grabbing"
              >
                {/* Image */}
                <img
                  src={item.preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg border transition-all duration-300 group-hover:brightness-75"
                />

                {/* Delete icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 z-20 cursor-pointer"
                >
                  ×
                </button>

                {/* Preview icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewModalSrc(item.preview);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/20 rounded-lg text-3xl text-white cursor-pointer"
                >
                  🔍
                </button>
              </div>
            ))}
          </ReactSortable>
        )}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
        >
          Convert to PDF
        </button>

        {/* Preview Modal */}
        <Modal
          isOpen={!!previewModalSrc}
          onRequestClose={() => setPreviewModalSrc(null)}
          ariaHideApp={false}
          className="fixed mt-20 inset-0 flex items-center justify-center z-50 pointer-events-none"
          overlayClassName="fixed inset-0 bg-black/50 z-40"
        >
          <div className="relative pointer-events-auto">
            <button
              onClick={() => setPreviewModalSrc(null)}
              className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer z-50"
            >
              ×
            </button>

            <img
              src={previewModalSrc}
              alt="Preview"
              className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-xl"
            />
          </div>
        </Modal>

      </div>
    </section>
  );
}