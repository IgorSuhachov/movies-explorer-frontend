import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useForm } from '../../hooks/useForm';

export default function Login({ handleLogin }) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }

  return (
    <section className="register" onSubmit={handleSubmit}>
      <form className="register__form">
        <div className="register__header">
          <Link to="/">
            <img src={logo} alt="логотип" />
          </Link>
          <h1 className="register__heading">Рады видеть!</h1>
        </div>
        {renderInput('E-mail', 'email', 'email', 'email', values.email, handleChange)}
        {renderInput('Пароль', 'password', 'password', 'password', values.password, handleChange)}
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

function renderInput(label, type, name, id, value, onChange) {
  return (
    <>
      <label className="register__label">{label}</label>
      <input type={type} className="register__input" name={name} id={id} value={value} onChange={onChange} required />
    </>
  );
}
