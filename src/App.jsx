import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useParams } from "react-router-dom";

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

import eventoCardImg from "./assets/img/evento.webp";
import hotelesCardImg from "./assets/img/hoteles.webp";
import empresasCardImg from "./assets/img/empresas.webp";
import img1 from "./assets/img/1.webp";
import img2 from "./assets/img/2.webp";
import img3 from "./assets/img/3.webp";
import img4 from "./assets/img/4.webp";
import img5 from "./assets/img/5.webp";
import img6 from "./assets/img/6.webp";
import img7 from "./assets/img/7.webp";
import img8 from "./assets/img/8.webp";
import img9 from "./assets/img/9.webp";
import img10 from "./assets/img/10.webp";
import img11 from "./assets/img/11.webp";
import img12 from "./assets/img/12.webp";
import img13 from "./assets/img/13.webp";

const categoriesData = [
  {
    name: "Eventos",
    id: "eventos",
    path: "eventos",
    cardImg: eventoCardImg,
    galleryImages: [
      { src: img6, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img4, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
      { src: img10, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img3, name: "Descartables", description: "Goma Eva 3mm suela Antideslizante." },
      { src: img11, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
      { src: img9, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
    ],
  },
  {
    name: "Empresas",
    id: "empresas",
    path: "empresas",
    cardImg: empresasCardImg,
    galleryImages: [
      { src: img1, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img2, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img11, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
      { src: img13, name: "Sublimación", description: "Ojotas para sublimar de goma Eva 16 mm de espesor tira de PVC, superficie a estampar  %100 polister. Talles del 19 al 46 colores varios" },
      { src: img4, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
      { src: img9, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
    ],
  },
  {
    name: "Hoteles / Spa",
    id: "hoteles-spa",
    path: "hoteles-spa",
    cardImg: hotelesCardImg,
    galleryImages: [
      { src: img5, name: "Descartables", description: "Goma Eva 3mm suela Antideslizante." },
      { src: img7, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img8, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img9, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
      { src: img12, name: "Personalizadas", description: "Goma Eva 16 mm de espesor, tira pvc, Suela Antideslizante. Colores varios." },
      { src: img11, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
      { src: img4, name: "Lisas", description: "Goma Eva 16 mm, tira pvc, suela Antideslizante. Colores varios." },
    ],
  },
];

const CategoryCatalog = () => {
  const location = useLocation();
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const locationStateCategory = location?.state?.selectedCategory || null;
  const categoryFromUrl = categoryId ? categoriesData.find(cat => cat.id === categoryId) : null;
  const finalSelectedCategory = locationStateCategory || categoryFromUrl || selectedCategory;

  useEffect(() => {
    if (locationStateCategory && locationStateCategory !== selectedCategory) setSelectedCategory(locationStateCategory);
    else if (categoryFromUrl && categoryFromUrl !== selectedCategory) setSelectedCategory(categoryFromUrl);
  }, [locationStateCategory, categoryFromUrl, selectedCategory]);

  // 🔹 Scroll al catálogo cuando cambia la categoría
  useEffect(() => {
    if (finalSelectedCategory) {
      const catalogSection = document.getElementById("catalogo");
      if (catalogSection) {
        const headerOffset = 80;
        const elementPosition = catalogSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  }, [finalSelectedCategory]);

  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="benefits"><Benefits /></section>
      <Text />
      <section id="categories">
        <Categories categories={categoriesData} setSelectedCategory={setSelectedCategory} />
      </section>
      <section id="catalogo">
        <Catalog categories={categoriesData} selectedCategory={finalSelectedCategory} />
      </section>
      <Contact />
    </>
  );
};

const ScrollToHashElement = () => {
  const location = useLocation();
  const scrollToId = location.hash.substring(1);

  useEffect(() => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
        }, 100);
      }
    }
  }, [scrollToId]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToHashElement />
      <Routes>
        <Route path="/:categoryId?" element={<CategoryCatalog />} />
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
