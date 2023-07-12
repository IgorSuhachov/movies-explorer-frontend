import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useForm } from '../../hooks/useForm';

export default function Register({ handleRegister }) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.email, values.password, values.name);
  }

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__header">
          <Link to="/">
            <img src={logo} alt="логотип" />
          </Link>
          <h1 className="register__heading">Добро пожаловать!</h1>
        </div>
        {renderInput('Имя', 'text', 'name', 'name', values.name, handleChange)}
        {renderInput('E-mail', 'email', 'email', 'email', values.email, handleChange)}
        {renderInput('Пароль', 'password', 'password', 'password', values.password, handleChange)}
        <button className="register__submit">Зарегистрироваться</button>
        <div className="register__outro">
          <span className="register__text">Уже Зарегистрированы?</span>
          <Link to="/signin" className="register__link">
            Войти
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
