import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__header">
        <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <div className="footer__links">
          <Link to="https://practicum.yandex.ru/" className="footer__link" target="_blank">
            Яндекс.Практикум
          </Link>
          <Link to="https://github.com/IgorSuhachov/movies-explorer-frontend" className="footer__link" target="_blank">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
