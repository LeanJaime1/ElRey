import React from "react";
import { Link } from "react-router-dom"; // Importamos Link
import "./Footer.css";
import logo from "../../assets/img/logo.png";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main-content">
        {/* --- Columna 1: Logo y Slogan --- */}
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

        {/* --- Columna 2: Navegación --- */}
        <div className="footer-column">
          <h4>Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
          </ul>
        </div>

        {/* --- Columna 3: Redes Sociales --- */}
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
              href="https://wa.me/5491123456789"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a href="mailto:tuemail@ejemplo.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* --- Barra inferior con el Copyright --- */}
      <div className="footer-bottom-bar">
        <p className="footer-copy">© {new Date().getFullYear()} El Rey de las Ojotas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;