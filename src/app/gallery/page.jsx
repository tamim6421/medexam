"use client";

import { useEffect, useState } from "react";

const mockImages = [
  // Replace with your real image URLs or fetch from API
  "/gallery/img1.jpg",
  "/gallery/img2.jpg",
  "/gallery/img3.jpg",
  "/gallery/img4.jpg",
  "/gallery/img5.jpg",
  "/gallery/img6.jpg",
  "/gallery/img7.jpg",
  "/gallery/img8.jpg",
  "/gallery/img9.jpg",
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    // Fetch images from API here if needed
    setImages(mockImages);
  }, []);

  const openModal = (src) => {
    setModalImg(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-emerald-700 mb-10 text-center">
          📸 Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-lg bg-white group relative cursor-pointer"
              onClick={() => openModal(src)}
            >
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold bg-emerald-700/70 px-4 py-2 rounded-lg shadow">
                  View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-4 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={modalImg}
              alt="Large"
              className="w-full h-[60vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}