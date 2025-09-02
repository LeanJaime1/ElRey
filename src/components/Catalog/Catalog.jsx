import React, { useState, useMemo } from "react";
import "./Catalog.css";

const Catalog = ({ categories, selectedCategory }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Cargando galería...</p>;
  }

  // --- Mapeo corregido ---
  const allImagesFlat = useMemo(() => {
    return categories.flatMap((category) =>
      // Aquí 'imageItem' es un objeto { src, name }
      (category.galleryImages || []).map((imageItem) => ({
        src: imageItem.src, // Accedemos a la propiedad src del objeto
        category: category.name,
        alt: imageItem.name, // Usamos el nuevo nombre descriptivo para el alt
      }))
    );
  }, [categories]);

  return (
    <section id="catalogo" className="catalog">
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
              {/* Opcional: Puedes mostrar el nombre de la imagen en el overlay */}
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