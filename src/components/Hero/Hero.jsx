import React, { useState, useEffect } from "react";
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
  const length = banners.length; // Guardamos la longitud para no repetirla

  // NUEVO: Funciones para navegar entre slides
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Cambio automático cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      // Usamos la lógica de nextSlide para mantener consistencia
      setCurrent(prev => (prev + 1) % length);
    }, 6000);
    return () => clearInterval(interval);
  }, []); // El array vacío asegura que el efecto se ejecute solo al montar/desmontar

  // Función para ir a un slide específico al hacer clic en un punto
  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  return (
    <section className="hero">
      {/* NUEVO: Botón para slide anterior (flecha izquierda) */}
      <button onClick={prevSlide} className="hero-arrow left">
        &lt;
      </button>

      {/* NUEVO: Botón para slide siguiente (flecha derecha) */}
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