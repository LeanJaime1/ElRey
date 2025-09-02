import React from "react";
// Se agregó FaClock
import { FaTruck, FaPencilAlt, FaShieldAlt, FaClock } from "react-icons/fa";
import "./Benefits.css";

const Benefits = () => {
  return (
    <section className="benefits-section">
      <div className="benefit-item">
        <FaTruck className="benefit-icon" />
        <div>
          <h3>Envíos a todo el país</h3>
          <p>Estamos en Buenos Aires</p>
        </div>
      </div>

      <div className="benefit-item">
        <FaPencilAlt className="benefit-icon" />
        <div>
          <h3>Diseño Incluido</h3>
          <p>Sin costo adicional</p>
        </div>
      </div>

      <div className="benefit-item">
        <FaShieldAlt className="benefit-icon" />
        <div>
          <h3>Compra Segura</h3>
          <p>Protección y garantía</p>
        </div>
      </div>

      {/* --- Nuevo item agregado --- */}
      <div className="benefit-item">
        <FaClock className="benefit-icon" />
        <div>
          <h3>Entrega Inmediata</h3>
          <p>Stock disponible</p>
        </div>
      </div>
      
    </section>
  );
};

export default Benefits;