import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/img/logo.png";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const defaultMessage = "¡Hola, El rey de las Ojotas! Quisiera hacer una consulta.";
  const encodedMessage = encodeURIComponent(defaultMessage);
  
  return (
    <footer className="footer">
      <div className="footer-main-content">
        <div className="footer-column brand">
          <img
            src={logo}
            alt="Logo El Rey de las Ojotas"
            className="footer-logo"
          />
          <p className="footer-slogan">
            Convertí cada paso en una experiencia de marca.
          </p>
        </div>

        <div className="footer-column">
          <h4>Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Seguinos</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={`https://wa.me/5491132274885?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a href="mailto:elreydelasojotas@gmail.com" aria-label="Email"> {/* <-- Corregido aquí */}
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="footer-copy">© {new Date().getFullYear()} El Rey de las Ojotas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;