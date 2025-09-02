// src/components/ThankYouPage/ThankYouPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="icon-container">
        <svg className="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h1>¡Gracias por contactarnos!</h1>
      <p>Tu mensaje ha sido recibido. Te responderemos a la brevedad.</p>
      <Link to="/" className="thank-you-btn">Volver a la página principal</Link>
    </div>
  );
};

export default ThankYouPage;