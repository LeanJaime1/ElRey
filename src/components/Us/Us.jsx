import React from "react";
import { Helmet } from "react-helmet-async"; // <-- Importado aquí
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Us.css";

const Us = () => {
  return (
    <div className="us-page">
      <Helmet> {/* <-- Agregado aquí */}
        <title>Quiénes Somos | El Rey de las Ojotas</title>
        <meta name="description" content="Descubre más sobre El Rey de las Ojotas, nuestra historia y compromiso con la calidad en ojotas personalizadas." />
        <link rel="canonical" href="https://elreydelasojotas.com/quienes-somos" />
      </Helmet>

      <Header />
      <main className="us-content">
        <h1>Quiénes Somos</h1>
        <p>
          En El Rey de las Ojotas contamos con más de 10 años de experiencia en la fabricación de ojotas lisas y personalizadas de alta calidad. Nos especializamos en crear productos únicos que combinan confort, estilo y funcionalidad, pensados para empresas, hoteles, eventos corporativos y sociales.
        </p>
        <p>
          Diseñamos cada par a medida, incorporando el logo o identidad visual de tu marca para que cada paso deje huella. Nuestro equipo de diseño gráfico trabaja sin cargo adicional para ofrecer propuestas visuales que se adapten exactamente a lo que imaginás.
        </p>
        <p>
          Ofrecemos atención personalizada, cumplimiento en los tiempos de entrega y pedidos por mayor, garantizando una solución profesional y a medida para cada cliente.
        </p>
        <p>
          Estamos en Buenos Aires y realizamos envíos a todo el país.
        </p>
        <p>
          Convertí cada paso en una experiencia de marca.
        </p>
        <p>
          ¡Consultanos y hacé la diferencia con tus propias ojotas personalizadas!
        </p>
      </main>

    </div>
  );
};

export default Us;