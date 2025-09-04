import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";
import Catalog from "./components/Catalog/Catalog";
import Benefits from "./components/Benefits/Benefits";
import Us from "./components/Us/Us";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";
import Text from "./components/Text/Text";

// --- Importaciones de imágenes (sin cambios) ---
import eventoCardImg from "./assets/img/evento.png";
import hotelesCardImg from "./assets/img/hoteles.png";
import empresasCardImg from "./assets/img/empresas.png";
import img1 from "./assets/img/1.png";
import img2 from "./assets/img/2.png";
import img3 from "./assets/img/3.png";
import img4 from "./assets/img/4.png";
import img5 from "./assets/img/5.png";
import img6 from "./assets/img/6.png";
import img7 from "./assets/img/7.png";
import img8 from "./assets/img/8.png";
import img9 from "./assets/img/9.png";
import img10 from "./assets/img/10.png";
import img11 from "./assets/img/11.png";

// --- Data (sin cambios) ---
const categoriesData = [
  {
    name: "Eventos",
    cardImg: eventoCardImg,
    galleryImages: [
      { src: img6, name: "Personalizadas" },
      { src: img4, name: "Lisas" },
      { src: img10, name: "Personalizadas" },
      { src: img3, name: "Descartables" },
    ],
  },
  {
    name: "Empresas",
    cardImg: empresasCardImg,
    galleryImages: [
      { src: img1, name: "Personalizadas" },
      { src: img2, name: "Personalizadas" },
      { src: img11, name: "Lisas" },
    ],
  },
  {
    name: "Hoteles / Spa",
    cardImg: hotelesCardImg,
    galleryImages: [
      { src: img5, name: "Descartables" },
      { src: img7, name: "Personalizadas" },
      { src: img8, name: "Personalizadas" },
      { src: img9, name: "Lisas" },
    ],
  },
];

const ScrollToHashElement = () => {
  const location = useLocation();
  const scrollToId = location.hash.substring(1);

  useEffect(() => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [scrollToId]);

  return null;
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <BrowserRouter>
      <Header />
      <ScrollToHashElement />
      <Routes>
        {/* Ruta para la Home con todos los componentes */}
        <Route
          path="/"
          element={
            <>
              <section id="hero"><Hero /></section>
              <section id="benefits"><Benefits /></section>
              <Text />
              <section id="categories">
                <Categories 
                  categories={categoriesData} 
                  setSelectedCategory={setSelectedCategory} 
                />
              </section>
              <section id="catalogo">
                <Catalog
                  categories={categoriesData}
                  selectedCategory={selectedCategory}
                />
              </section>
              <Contact />
            </>
          }
        />
        {/* Ruta para la página de Contacto */}
        <Route path="/contacto" element={<Contact />} />
        <Route path="/quienes-somos" element={<Us />} />
        <Route path="/gracias" element={<ThankYouPage />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
};

export default App;