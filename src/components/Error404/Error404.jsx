import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <section className="error">
      <div className="error__info">
        <h1 className="error__heading">404</h1>
        <p className="error__text">Страница не найдена</p>
      </div>
      <button className="error__link" onClick={handleGoBack}>
        Назад
      </button>
    </section>
  );
}
