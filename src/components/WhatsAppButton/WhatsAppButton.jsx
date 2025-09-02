import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  // Mensaje que el usuario enviará por defecto
  const defaultMessage = "¡Hola, El rey de las Ojotas! Quisiera hacer una consulta.";
  
  // Codificamos el mensaje para que funcione en una URL
  const encodedMessage = encodeURIComponent(defaultMessage);
  
  return (
    <a
      // Añadimos el mensaje al final de la URL
      href={`https://wa.me/5491132274885?text=${encodedMessage}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;