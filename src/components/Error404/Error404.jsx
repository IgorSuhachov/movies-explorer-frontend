import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <section className="error">
      <div className="error__info">
        <h1 className="error__heading">404</h1>
        <p className="error__text">Страница не найдена</p>
      </div>
      <Link to="/" className="error__link">
        Назад
      </Link>
    </section>
  );
}
