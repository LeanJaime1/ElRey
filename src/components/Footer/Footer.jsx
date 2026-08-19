import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/img/logo.png";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const defaultMessage = "¡Hola, El rey de las Ojotas! Quisiera hacer una consulta.";
  const encodedMessage = encodeURIComponent(defaultMessage);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
            <li><Link to="/quienes-somos" onClick={handleLinkClick}>Quiénes Somos</Link></li>
            <li><Link to="/contacto" onClick={handleLinkClick}>Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Seguinos</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/elreydelasojotas"
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
            <a href="mailto:elreydelasojotas@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-info">
          <p>© {new Date().getFullYear()} El Rey de las Ojotas. Todos los derechos reservados.</p>
          <span className="footer-separator">·</span>
          <p>Buenos Aires, Argentina</p>
        </div>

        <p className="footer-credits">
          Diseño y desarrollo web por{" "}
          <a
            href="https://wa.me/54911XXXXXXXX?text=Hola%20Lean,%20vi%20la%20web%20de%20El%20Rey%20de%20las%20Ojotas%20y%20me%20gustaría%20cotizar%20un%20sitio%20web."
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credits-link"
          >
            Lean Jaime
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="footer-external-icon"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;