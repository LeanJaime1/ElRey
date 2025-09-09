import React, { useState, useMemo, useCallback } from "react";
import "./Catalog.css";

const Catalog = ({ categories, selectedCategory }) => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Cargando galería...</p>;
  }

  const allImagesFlat = useMemo(() => {
    const images = categories.flatMap((category) =>
      (category.galleryImages || []).map((imageItem) => ({
        src: imageItem.src,
        category: category.name,
        alt: imageItem.name,
        description: imageItem.description,
      }))
    );
    // Filtra las imágenes si hay una categoría seleccionada para el lightbox
    return selectedCategory
      ? images.filter((image) => image.category === selectedCategory)
      : images;
  }, [categories, selectedCategory]); // Dependencia de selectedCategory para filtrar el lightbox

  const pageTitle = selectedCategory ? selectedCategory : "Nuestros productos";

  // Función para abrir el lightbox
  const openLightbox = useCallback((image, index) => {
    setLightboxImage(image);
    setCurrentIndex(index);
  }, []);

  // Función para navegar a la siguiente imagen
  const goToNext = useCallback(() => {
    if (currentIndex < allImagesFlat.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setLightboxImage(allImagesFlat[currentIndex + 1]);
    } else {
      setCurrentIndex(0);
      setLightboxImage(allImagesFlat[0]);
    }
  }, [currentIndex, allImagesFlat]);

  // Función para navegar a la imagen anterior
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setLightboxImage(allImagesFlat[currentIndex - 1]);
    } else {
      setCurrentIndex(allImagesFlat.length - 1);
      setLightboxImage(allImagesFlat[allImagesFlat.length - 1]);
    }
  }, [currentIndex, allImagesFlat]);

  // Manejadores para el deslizamiento táctil
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!touchStartX) return;
      const touchEndX = e.touches[0].clientX;
      const diff = touchStartX - touchEndX;

      // Un umbral para evitar desplazamientos accidentales
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
        setTouchStartX(0); // Reinicia para evitar múltiples disparos
      }
    },
    [touchStartX, goToNext, goToPrevious]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStartX(0);
  }, []);

  return (
    <section id="catalogo" className="catalog">
      <div className="catalog-header">
        <h2>{pageTitle}</h2>
        {!selectedCategory && (
          <p>
            Explora nuestra galería completa o filtra por tus categorías
            favoritas.
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
            onClick={() => openLightbox(image, index)} // Usamos openLightbox
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <div className="image-overlay">
              <span>{image.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxImage(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Flecha izquierda */}
            <button className="lightbox-nav-button prev" onClick={goToPrevious}>
              &#10094;
            </button>

            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="lightbox-image"
            />
            <div className="lightbox-details">
              <h3>{lightboxImage.alt}</h3>
              <p>{lightboxImage.description}</p>
            </div>

            {/* Flecha derecha */}
            <button className="lightbox-nav-button next" onClick={goToNext}>
              &#10095;
            </button>
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