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

  // --- NUEVOS ESTADOS PARA MANEJAR EL SWIPE ---
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleCardClick = (index, categoryName) => {
    // Lógica de click que ya teníamos
    if (isMobile) {
      if (index !== activeIndex) {
        setActiveIndex(index);
      } else {
        setSelectedCategory((prev) =>
          prev === categoryName ? null : categoryName
        );
      }
    } else {
      setSelectedCategory((prev) =>
        prev === categoryName ? null : categoryName
      );
    }
    // Lógica de scroll
    setTimeout(() => {
      const catalogSection = document.getElementById("catalogo");
      if (catalogSection) {
        const headerOffset = 80;
        const elementPosition = catalogSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // --- NUEVAS FUNCIONES PARA LOS EVENTOS TÁCTILES ---
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
    // Si la distancia de swipe es lo suficientemente grande
    if (swipeDistance > 50) { // Deslizar hacia la izquierda
      setActiveIndex((prevIndex) =>
        prevIndex < categories.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (swipeDistance < -50) { // Deslizar hacia la derecha
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
    setIsSwiping(false);
  };

  return (
    <div className="categories-wrapper">
      <h1 className="categories-title">CATEGORÍAS</h1>
      <div className="categories-container">
        {isMobile ? (
          // Usamos los nuevos eventos táctiles en el contenedor principal
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
                  className={`category-card ${position}`}
                  onClick={() => handleCardClick(index, category.name)}
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
              );
            })}
          </div>
        ) : (
          categories.map((category, index) => (
            <div
              key={category.name}
              className="category-card"
              onClick={() => handleCardClick(index, category.name)}
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