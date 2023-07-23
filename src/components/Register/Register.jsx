import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useForm';
import { emailPattern } from '../../utils/pattern';

export default function Register({ handleRegister, loggedIn }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

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
        {renderInput('Имя', 'text', 'name', 'name', values.name || '', handleChange)}
        <span className="register__input-error">{errors.name}</span>
        {renderInput('E-mail', 'email', 'email', 'email', values.email || '', handleChange, emailPattern)}
        <span className="register__input-error">{errors.email}</span>
        {renderInput('Пароль', 'password', 'password', 'password', values.password || '', handleChange)}
        <span className="register__input-error">{errors.password}</span>
        <button
          className={isValid ? 'register__submit' : 'register__submit register__submit_disabled'}
          disabled={isValid ? false : true}
        >
          Зарегистрироваться
        </button>
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

function renderInput(label, type, name, id, value, onChange, pattern) {
  return (
    <>
      <label className="register__label">{label}</label>
      <input
        type={type}
        className="register__input"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        pattern={pattern}
        required
      />
    </>
  );
}
