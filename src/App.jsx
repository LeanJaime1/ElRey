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
import img12 from "./assets/img/12.png";
import img13 from "./assets/img/13.png";

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

// Componente que maneja hero, categories, catalog y sincroniza con la URL
const CategoryCatalog = ({ categoriesData }) => {
  const location = useLocation();
  const { categoryId } = useParams();

  // Estado local para selección hecha por interacción (click)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Si el navegador trajo un objeto por state (navigate(..., { state: { selectedCategory } }))
  const locationStateCategory = location?.state?.selectedCategory || null;

  // Si la URL tiene categoryId, busco el objeto en categoriesData
  const categoryFromUrl = categoryId ? categoriesData.find(cat => cat.path === categoryId || cat.id === categoryId) : null;

  // Determino la categoría "final" de forma segura:
  // 1) primero la que vino en location.state (click -> navigate con state)
  // 2) sino la que corresponde a la URL
  // 3) sino la seleccionada manualmente en este estado
  const finalSelectedCategoryCandidate = locationStateCategory || categoryFromUrl || selectedCategory;

  // Aseguro que lo que le paso al Catalog sea siempre un OBJETO completo o null
  const finalSelectedCategory = (() => {
    if (!finalSelectedCategoryCandidate) return null;
    // Si viene un string por algún motivo, buscar el objeto
    if (typeof finalSelectedCategoryCandidate === "string") {
      return categoriesData.find(cat => cat.id === finalSelectedCategoryCandidate || cat.path === finalSelectedCategoryCandidate) || null;
    }
    // Si ya es un objeto con id, preferir el objeto desde categoriesData para mantener consistencia
    if (finalSelectedCategoryCandidate && finalSelectedCategoryCandidate.id) {
      return categoriesData.find(cat => cat.id === finalSelectedCategoryCandidate.id) || finalSelectedCategoryCandidate;
    }
    return null;
  })();

  // Mantengo sincronizado el estado local para evitar inconsistencias futuras
  useEffect(() => {
    if (locationStateCategory && locationStateCategory !== selectedCategory) {
      setSelectedCategory(locationStateCategory);
    } else if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    } else if (!categoryId && selectedCategory) {
      setSelectedCategory(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationStateCategory, categoryFromUrl, categoryId]);

  return (
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
          selectedCategory={finalSelectedCategory}
        />
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
  return (
    <BrowserRouter>
      <Header />
      <ScrollToHashElement />
      <Routes>
        <Route path="/:categoryId?" element={<CategoryCatalog categoriesData={categoriesData} />} />
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
