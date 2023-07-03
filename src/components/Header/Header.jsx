import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="логотип" className="header__logo" />
      </Link>
      <div className="header__authorization">
        <Link to="/signin" className="header__registration">
          Регистрация
        </Link>
        <Link to="/signup" className="header__login">
          Войти
        </Link>
      </div>
    </header>
  );
}
