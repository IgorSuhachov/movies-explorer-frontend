import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Login() {
  return (
    <section className="register">
      <form className="register__form">
        <div className="register__header">
          <Link to="/">
            <img src={logo} alt="логотип" />
          </Link>
          <h1 className="register__heading">Рады видеть!</h1>
        </div>
        {renderInput('E-mail', 'text')}
        {renderInput('Пароль', 'password')}
        <button className="register__submit register__submit_mod">Войти</button>
        <div className="register__outro">
          <span className="register__text">Еще не зарегистрированы?</span>
          <Link to="/signup" className="register__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

function renderInput(label, type) {
  return (
    <>
      <label className="register__label">{label}</label>
      <input type={type} className="register__input" required />
    </>
  );
}
