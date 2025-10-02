import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const navigate = useNavigate();

  // swipe
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleCategorySelection = (category, index) => {
    setActiveIndex(index);

    // 1) actualizo el estado local de la app (por si otros componentes dependen de ello)
    setSelectedCategory(category);

    // 2) navigo a la ruta de la categoría y le paso el objeto por state (esto asegura que
    //    CategoryCatalog lo reciba como location.state.selectedCategory al llegar).
    navigate(`/${category.id}`, { state: { selectedCategory: category } });

    // 3) scroll (igual que antes)
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
                  key={category.id}
                  id={category.id}
                  className={`category-card ${position}`}
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
                        handleCategorySelection(category, index);
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
          categories.map((category, index) => (
            <div
              key={category.id}
              id={category.id}
              className="category-card"
              onClick={() => handleCategorySelection(category, index)}
            >
              <img src={category.cardImg} alt={`Ojotas para ${category.name}`} />
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
