import React, { useState, useEffect, useRef } from "react"; // Importa useRef
import { Link } from "react-router-dom";
import "./Hero.css";

import banner1 from "../../assets/img/banner.png";
import banner2 from "../../assets/img/banner2.png";
import banner3 from "../../assets/img/banner3.png";

const banners = [
  { src: banner1, title: "¡Diseñá tus propias ojotas!", subtitle: "Personalizá tu estilo. Únicas, cómodas y hechas para vos." },
  { src: banner2, title: "¡Que la Fiesta No Pare!", subtitle: "Tus invitados lo van a dar todo en la pista. Regalales un recuerdo único y la comodidad para bailar hasta el amanecer." },
  { src: banner3, title: "Tu Marca en su momento de relax", subtitle: "Un recuerdo que tus huéspedes se llevarán a casa." }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const length = banners.length;

  // NUEVO: Estados y Refs para la funcionalidad de Swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50; // Distancia mínima para considerar un swipe

  // Funciones para navegar entre slides
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Cambio automático cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, 6000);
    return () => clearInterval(interval);
  }, [length]); // Añade length a las dependencias para evitar warnings

  // Función para ir a un slide específico al hacer clic en un punto
  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  // NUEVO: Handlers para eventos táctiles (swipe)
  const onTouchStart = (e) => {
    touchEndX.current = 0; // Resetea el endX en cada inicio de toque
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Solo ejecuta si hay un swipe significativo
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Resetea para el próximo swipe
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section 
      className="hero"
      onTouchStart={onTouchStart} // Añade los handlers táctiles aquí
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Las flechas se ocultan con CSS en mobile */}
      <button onClick={prevSlide} className="hero-arrow left">
        &lt;
      </button>

      <button onClick={nextSlide} className="hero-arrow right">
        &gt;
      </button>

      {banners.map((banner, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${banner.src})` }}
        >
          <div className="hero-text">
            <h1>{banner.title}</h1>
            <p>{banner.subtitle}</p>
            <Link to="/contacto" className="hero-btn">Contactanos</Link>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`hero-dot ${index === current ? "active" : ""}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;