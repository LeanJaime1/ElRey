import React, { useState, useMemo } from "react";
import "./Catalog.css";

const Catalog = ({ categories, selectedCategory }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Cargando galería...</p>;
  }

  const allImagesFlat = useMemo(() => {
    return categories.flatMap((category) =>
      (category.galleryImages || []).map((imageItem) => ({
        src: imageItem.src,
        category: category.name,
        alt: imageItem.name,
      }))
    );
  }, [categories]);

  const pageTitle = selectedCategory ? selectedCategory : "Nuestros productos";

  return (
    <section id="catalogo" className="catalog">
      <div className="catalog-header">
        <h2>{pageTitle}</h2>
        {/* Aquí está el cambio: solo renderiza el p si no hay una categoría seleccionada */}
        {!selectedCategory && (
          <p>
            Explora nuestra galería completa o filtra por tus categorías favoritas.
          </p>
        )}
      </div>
      <div className="catalog-grid">
        {allImagesFlat.map((image, index) => (
          <div
            key={index}
            className={`catalog-grid-item ${
              !selectedCategory || selectedCategory === image.category
                ? "visible"
                : "hidden"
            }`}
            onClick={() => setLightboxImage(image.src)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <div className="image-overlay">
              <span>{image.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div className="lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content">
            <img src={lightboxImage} alt="Vista ampliada" className="lightbox-image" />
          </div>
          <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;