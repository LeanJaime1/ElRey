import React, { useState, useEffect } from "react";
import "./Categories.css";

// Hook para detectar el tamaño de la ventana
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const Categories = ({ categories, setSelectedCategory }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  // --- ESTADOS PARA MANEJAR EL SWIPE ---
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // Lógica para seleccionar una categoría y hacer scroll.
  const handleCategorySelection = (categoryName, index) => {
    setActiveIndex(index);
    setSelectedCategory(categoryName);

    setTimeout(() => {
      const catalogSection = document.getElementById("catalogo");
      if (catalogSection) {
        const headerOffset = 80;
        const elementPosition = catalogSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // --- FUNCIONES PARA LOS EVENTOS TÁCTILES ---
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (isSwiping) {
      setTouchEndX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;

    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > 75) {
      if (swipeDistance > 0) {
        setActiveIndex((prevIndex) =>
          prevIndex < categories.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      }
    }
    setIsSwiping(false);
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <div className="categories-wrapper">
      <h1 className="categories-title">CATEGORÍAS</h1>
      <div className="categories-container">
        {isMobile ? (
          // Vista Móvil
          <div
            className="mobile-carousel-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {categories.map((category, index) => {
              let position = "middle";
              if (index < activeIndex) position = "left";
              else if (index > activeIndex) position = "right";

              return (
                <div
                  key={category.name}
                  className={`category-card ${position} ${category.name === 'Eventos' ? 'eventos-zoom' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={category.cardImg}
                    alt={`Ojotas para ${category.name}`}
                  />
                  <div className="overlay">
                    <button
                      className="category-select-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelection(category.name, index);
                      }}
                    >
                      {category.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Vista de Escritorio
          categories.map((category, index) => (
            <div
              key={category.name}
              // Agregamos la clase condicional aquí también
              className={`category-card ${category.name === 'Eventos' ? 'eventos-zoom' : ''}`}
              onClick={() => handleCategorySelection(category.name, index)}
            >
              <img
                src={category.cardImg}
                alt={`Ojotas para ${category.name}`}
              />
              <div className="initial-text">
                <span>{category.name}</span>
              </div>
              <div className="overlay">
                <span>{category.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;