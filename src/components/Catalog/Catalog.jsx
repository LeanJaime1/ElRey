import React, { useState, useMemo, useCallback } from "react";
import "./Catalog.css";

const Catalog = ({ categories, selectedCategory }) => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxGallery, setLightboxGallery] = useState([]);
  const [currentNavIndex, setCurrentNavIndex] = useState(null); // Para navegación entre subcategorías (flechas)
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0); // Para miniatura activa (clics en miniaturas)

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Cargando galería...</p>;
  }

  // Crea el array de imágenes a mostrar en la cuadrícula principal.
  const allImagesFlat = useMemo(() => {
    const featuredImages = [];
    const uniqueSubcategories = new Set();
    
    const sourceCategories = selectedCategory
      ? [categories.find(cat => cat.name === selectedCategory)].filter(Boolean)
      : categories;

    sourceCategories.forEach(category => {
      category.galleryImages.forEach(imageItem => {
        if (!uniqueSubcategories.has(imageItem.name)) {
          uniqueSubcategories.add(imageItem.name);
          featuredImages.push({
            src: imageItem.src,
            category: category.name,
            alt: imageItem.name,
            description: imageItem.description,
          });
        }
      });
    });

    return featuredImages;
  }, [categories, selectedCategory]);

  const pageTitle = selectedCategory ? selectedCategory : "Nuestros productos";

  // Función para abrir el lightbox y definir la galería
  const openLightbox = useCallback((image) => {
    // La galería del lightbox (para las miniaturas)
    const fullGallery = categories.flatMap(category =>
      (category.galleryImages || []).map((imageItem) => ({
        src: imageItem.src,
        category: category.name,
        alt: imageItem.name,
        description: imageItem.description,
      }))
    );

    const filteredGallery = selectedCategory
      ? fullGallery.filter(img => img.category === selectedCategory && img.alt === image.alt)
      : fullGallery.filter(img => img.alt === image.alt);
    
    setLightboxGallery(filteredGallery);
    setLightboxImage(filteredGallery[0]); // Mostrar la primera imagen de la subcategoría
    setCurrentThumbnailIndex(0); // Marcar la primera miniatura como activa
    
    // El índice de navegación (para las flechas)
    const navIndex = allImagesFlat.findIndex(img => img.alt === image.alt);
    setCurrentNavIndex(navIndex);
  }, [categories, selectedCategory, allImagesFlat]);

  const navigateAndOpen = useCallback((newNavIndex) => {
    if (newNavIndex >= 0 && newNavIndex < allImagesFlat.length) {
        const newImage = allImagesFlat[newNavIndex];
        const fullGallery = categories.flatMap(category =>
            (category.galleryImages || []).map((imageItem) => ({
                src: imageItem.src,
                category: category.name,
                alt: imageItem.name,
                description: imageItem.description,
            }))
        );

        const filteredGallery = selectedCategory
            ? fullGallery.filter(img => img.category === selectedCategory && img.alt === newImage.alt)
            : fullGallery.filter(img => img.alt === newImage.alt);

        setLightboxGallery(filteredGallery);
        setLightboxImage(filteredGallery[0]); // Mostrar la primera imagen de la nueva subcategoría
        setCurrentThumbnailIndex(0); // Resetear la miniatura activa a la primera
        setCurrentNavIndex(newNavIndex);
    }
  }, [categories, selectedCategory, allImagesFlat]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentNavIndex + 1) % allImagesFlat.length;
    navigateAndOpen(nextIndex);
  }, [currentNavIndex, allImagesFlat, navigateAndOpen]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (currentNavIndex - 1 + allImagesFlat.length) % allImagesFlat.length;
    navigateAndOpen(prevIndex);
  }, [currentNavIndex, allImagesFlat, navigateAndOpen]);

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

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
        setTouchStartX(0);
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
        <p>
          {selectedCategory
            ? `Explora los tipos de productos que ofrecemos para ${selectedCategory}.`
            : "Explora una selección de nuestros productos más destacados."}
        </p>
      </div>
      <div className="catalog-grid">
        {allImagesFlat.map((image, index) => (
          <div
            key={index}
            className={`catalog-grid-item visible`}
            onClick={() => openLightbox(image)}
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
              {lightboxGallery.length > 1 && (
                <div className="lightbox-thumbnails">
                  {lightboxGallery.map((img, index) => (
                    <img
                      key={index}
                      src={img.src}
                      alt={img.alt}
                      // Aquí se usa currentThumbnailIndex
                      className={`thumbnail ${index === currentThumbnailIndex ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(img);
                        setCurrentThumbnailIndex(index); // Actualizar el índice de la miniatura activa
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
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