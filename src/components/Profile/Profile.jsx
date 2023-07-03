import React from 'react';
import Header from '../Header/Header';

export default function Profile() {
  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__name">Привет, Игорь!</h1>
        <div className="profile__data">
          <div className="profile__info">
            <span className="profile__initials">Имя</span>
            <p className="profile__initials">Игорь</p>
          </div>
          <div className="profile__info">
            <span className="profile__initials">E-mail</span>
            <p className="profile__initials">pochta@yandex.ru</p>
          </div>
        </div>
        <button className="profile__button">Редактировать</button>
        <button className="profile__button profile__button_red">Выйти из аккаунта</button>
      </section>
    </>
  );
}
