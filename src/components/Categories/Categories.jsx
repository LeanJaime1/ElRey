import React, { useState, useEffect } from "react";
import "./Categories.css";

// Hook para detectar el tamaño de la ventana
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });
  useEffect(() => {
    function handleResize() { setWindowSize({ width: window.innerWidth }); }
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

  const handleCardClick = (index, categoryName) => {
    // Lógica de click que ya teníamos
    if (isMobile) {
      if (index !== activeIndex) {
        setActiveIndex(index);
      } else {
        setSelectedCategory(prev => (prev === categoryName ? null : categoryName));
      }
    } else {
      setSelectedCategory(prev => (prev === categoryName ? null : categoryName));
    }

    // --- CORRECCIÓN DE SCROLL PARA MOBILE Y WEB ---
    setTimeout(() => {
      const catalogSection = document.getElementById('catalogo');
      if (catalogSection) {
        // 1. Altura del header fijo que debemos descontar
        const headerOffset = 80; // La altura de tu header en píxeles
        
        // 2. Calculamos la posición del elemento y le restamos el offset
        const elementPosition = catalogSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // 3. Hacemos scroll a la posición calculada
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <div className="categories-wrapper">
      <h1 className="categories-title">CATEGORÍAS</h1>
      <div className="categories-container">
        {isMobile ? (
          <div className="mobile-carousel-wrapper">
            {categories.map((category, index) => {
              let position = 'middle';
              if (index < activeIndex) position = 'left';
              else if (index > activeIndex) position = 'right';

              return (
                <div 
                  key={category.name} 
                  className={`category-card ${position}`}
                  onClick={() => handleCardClick(index, category.name)}
                >
                  <img src={category.cardImg} alt={`Ojotas para ${category.name}`} />
                  {/* AQUÍ ES DONDE ESTÁ EL CAMBIO EN EL JSX:
                      Ahora tenemos DOS SPANs. Uno para el texto inicial (pequeño)
                      y otro para el texto del overlay (grande y rojo). */}
                  <div className="initial-text"> {/* NUEVO DIV para el texto inicial */}
                    <span>{category.name}</span>
                  </div>
                  <div className="overlay"> {/* TU OVERLAY ROJO ACTUAL */}
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
              <img src={category.cardImg} alt={`Ojotas para ${category.name}`} />
              {/* Lo mismo para la vista de escritorio */}
              <div className="initial-text"> {/* NUEVO DIV para el texto inicial */}
                <span>{category.name}</span>
              </div>
              <div className="overlay"> {/* TU OVERLAY ROJO ACTUAL */}
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