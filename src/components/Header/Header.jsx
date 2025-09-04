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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigation = (targetId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Si no estamos en la página de inicio, navegamos primero
      // y pasamos el ID como estado para hacer el scroll después.
      navigate("/", { state: { scrollTo: targetId } });
    }
    setMenuOpen(false);
  };

  // Nuevo useEffect para manejar el scroll después de navegar
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

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
      {menuOpen && <div className="backdrop" onClick={toggleMenu}></div>}

      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="El Rey de las Ojotas" className="logo-img" />
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={handleInicioClick}>Inicio</a>
        <Link to="/quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes somos</Link>
        {/* Usamos un <a> con onClick para usar nuestra lógica de navegación */}
        <a href="#contacto" onClick={(e) => { e.preventDefault(); handleNavigation("contacto"); }}>Contacto</a>
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