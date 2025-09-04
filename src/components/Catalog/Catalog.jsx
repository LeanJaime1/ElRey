import React, { useState, useMemo } from "react";
import "./Catalog.css";

const Catalog = ({ categories, selectedCategory }) => {
  // El estado almacena el objeto completo de la imagen o null.
  const [lightboxImage, setLightboxImage] = useState(null);

  // Si no hay categorías, muestra un mensaje de carga.
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Cargando galería...</p>;
  }

  // Aplanamos el array de categorías para tener una lista de todas las imágenes.
  // Usamos useMemo para optimizar el rendimiento y evitar recálculos innecesarios.
  const allImagesFlat = useMemo(() => {
    return categories.flatMap((category) =>
      (category.galleryImages || []).map((imageItem) => ({
        src: imageItem.src,
        category: category.name,
        alt: imageItem.name,
        // Tomamos la descripción directamente de los datos del producto
        description: imageItem.description,
      }))
    );
  }, [categories]);

  // Define el título de la página basado en la categoría seleccionada.
  const pageTitle = selectedCategory ? selectedCategory : "Nuestros productos";

  return (
    <section id="catalogo" className="catalog">
      <div className="catalog-header">
        <h2>{pageTitle}</h2>
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
            // Cuando se hace clic, guardamos el objeto completo en el estado
            onClick={() => setLightboxImage(image)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <div className="image-overlay">
              <span>{image.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Renderizamos el lightbox solo si hay una imagen seleccionada */}
      {lightboxImage && (
        <div className="lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.src} alt={lightboxImage.alt} className="lightbox-image" />
            <div className="lightbox-details">
              <h3>{lightboxImage.alt}</h3>
              {/* Mostramos la descripción del producto */}
              <p>{lightboxImage.description}</p>
            </div>
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