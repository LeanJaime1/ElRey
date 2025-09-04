import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate(); // Inicializa el hook
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    categoria: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es obligatorio";
        break;
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value)) return "El email no es válido";
        break;
      case "categoria":
        if (!value) return "Debes seleccionar una categoría";
        break;
      case "mensaje":
        if (!value.trim()) return "El mensaje es obligatorio";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setSubmitStatus(null);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {
      nombre: validateField("nombre", formData.nombre),
      email: validateField("email", formData.email),
      categoria: validateField("categoria", formData.categoria),
      mensaje: validateField("mensaje", formData.mensaje),
    };

    const activeErrors = Object.values(validationErrors).filter(Boolean);

    if (activeErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mzzakvwg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirige a la página de agradecimiento
        navigate("/gracias"); 
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <section className="contact-container" id="contacto">
      <h2>Contactanos</h2>

      {submitStatus === "success" && (
        <p className="success-message">
          ✅ ¡Mensaje enviado con éxito! Te responderemos pronto.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="error-message">
          ❌ ¡Hubo un error al enviar el mensaje! Por favor, inténtalo de nuevo.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tu nombre"
          className={errors.nombre ? "input-error" : ""}
        />
        {errors.nombre && <p className="error">{errors.nombre}</p>}

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="tuemail@ejemplo.com"
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="categoria">Categoría de interés</label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.categoria ? "input-error" : ""}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="empresas">Empresas</option>
          <option value="eventos">Eventos</option>
          <option value="hotel/spa">Hotel/Spa</option>
        </select>
        {errors.categoria && <p className="error">{errors.categoria}</p>}

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribe tu mensaje aquí"
          rows="5"
          className={errors.mensaje ? "input-error" : ""}
        />
        {errors.mensaje && <p className="error">{errors.mensaje}</p>}

        <button type="submit" className="btn-submit">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Contact;