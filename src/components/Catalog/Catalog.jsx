import React, { useState, useMemo, useCallback } from "react";
import "./Catalog.css";

const Catalog = ({ categories, selectedCategory }) => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxGallery, setLightboxGallery] = useState([]);
  const [currentNavIndex, setCurrentNavIndex] = useState(null);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);

  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Cargando galería...</p>;
  }

  const sourceCategories = selectedCategory ? [selectedCategory] : categories;

  const allImagesFlat = useMemo(() => {
    const featuredImages = [];
    const uniqueSubcategories = new Set();

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

  const pageTitle = selectedCategory ? selectedCategory.name : "Nuestros productos";

  const openLightbox = useCallback((image) => {
    const fullGallery = categories.flatMap(category =>
      (category.galleryImages || []).map((imageItem) => ({
        src: imageItem.src,
        category: category.name,
        alt: imageItem.name,
        description: imageItem.description,
      }))
    );

    const filteredGallery = selectedCategory
      ? fullGallery.filter(img => img.category === selectedCategory.name && img.alt === image.alt)
      : fullGallery.filter(img => img.alt === image.alt);

    setLightboxGallery(filteredGallery);
    setLightboxImage(filteredGallery[0]);
    setCurrentThumbnailIndex(0);

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
        ? fullGallery.filter(img => img.category === selectedCategory.name && img.alt === newImage.alt)
        : fullGallery.filter(img => img.alt === newImage.alt);

      setLightboxGallery(filteredGallery);
      setLightboxImage(filteredGallery[0]);
      setCurrentThumbnailIndex(0);
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
            ? `Explora los tipos de productos que ofrecemos para ${selectedCategory.name}.`
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
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>×</button>
            <button className="lightbox-nav-button prev" onClick={goToPrevious}>&#10094;</button>
            <img src={lightboxImage.src} alt={lightboxImage.alt} className="lightbox-image" />
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
                      className={`thumbnail ${index === currentThumbnailIndex ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(img);
                        setCurrentThumbnailIndex(index);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <button className="lightbox-nav-button next" onClick={goToNext}>&#10095;</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalog;
