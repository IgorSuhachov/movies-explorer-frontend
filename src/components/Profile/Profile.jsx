import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useForm';
import { emailPattern } from '../../utils/pattern';

export default function Profile({ loggedIn, handleSignout, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [dataChanged, setDataChanged] = useState(false);

  const { values, handleChange, setValues, errors, isValid } = useFormWithValidation({
    email: '',
    name: '',
  });

  useEffect(() => {
    if (!dataChanged) {
      setValues({
        name: currentUser.name || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser, dataChanged]);

  // Функция для проверки изменений данных формы
  function checkDataChanged() {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  }

  useEffect(() => {
    checkDataChanged();
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name: values.name,
      email: values.email,
    });
    setDataChanged(false);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h1 className="profile__name">{`Привет, ${currentUser.name}`}</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__data">
            <div className="profile__info">
              <span className="profile__initials">Имя</span>
              <input
                type="text"
                className="profile__initials"
                value={values.name || ''}
                onChange={handleChange}
                name="name"
                required
              />
            </div>
            <span className="profile__input-error">{errors.name}</span>
            <div className="profile__info">
              <span className="profile__initials">E-mail</span>
              <input
                type="email"
                className="profile__initials"
                value={values.email || ''}
                onChange={handleChange}
                name="email"
                required
                pattern={emailPattern}
              />
            </div>
            <span className="profile__input-error">{errors.email}</span>
          </div>
          <button
            className={dataChanged && isValid ? 'profile__button' : 'profile__button profile__button_disabled'}
            disabled={!dataChanged || !isValid}
          >
            Редактировать
          </button>
          <button className="profile__button profile__button_red" onClick={handleSignout}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}
