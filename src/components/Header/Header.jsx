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
      navigate("/", { state: { scrollTo: targetId } });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  const handleHomeNavigation = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    // ✅ Lógica mejorada para manejar la navegación a la home.
    if (location.pathname === "/") {
      // Si ya estoy en la home, hago scroll al hero para "recargar" la vista.
      handleNavigation("hero");
      // Si además había un hash, lo elimino.
      if (location.hash) {
          navigate("/", { replace: true });
      }
    } else {
      // Si no estoy en la home, navego a ella.
      handleNavigation("hero");
    }
  };

  return (
    <header className="header">
      {menuOpen && <div className="backdrop" onClick={toggleMenu}></div>}

      <div className="logo-container" onClick={handleHomeNavigation} style={{ cursor: "pointer" }}>
        <img src={logo} alt="El Rey de las Ojotas" className="logo-img" />
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={handleHomeNavigation}>Inicio</a>
        <Link to="/quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes somos</Link>
        <Link to="/#contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
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