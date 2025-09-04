import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/img/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const handleNavigation = (targetId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    handleNavigation("hero");
  };

  const handleInicioClick = (e) => {
    e.preventDefault();
    handleNavigation("hero");
  };

  return (
    <header className="header">
      {/* --- Fondo oscuro para cerrar el menú --- */}
      {menuOpen && <div className="backdrop" onClick={toggleMenu}></div>}

      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="El Rey de las Ojotas" className="logo-img" />
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={handleInicioClick}>Inicio</a>
        <Link to="/quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes somos</Link>
        {/* Enlace de Contacto añadido al menú */}
        <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
      </nav>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </header>
  );
};

export default Header;