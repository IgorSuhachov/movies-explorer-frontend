import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../../images/me.png';

export default function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <div className="aboutMe__header">
        <h2 className="aboutMe__heading">Студент</h2>
      </div>
      <div className="aboutMe__data">
        <img src={avatar} alt="аватар" className="aboutMe__avatar" />

        <div className="aboutMe__wrapper">
          <p className="aboutMe__name">Игорь</p>
          <p className="aboutMe__info">Фронтенд-разработчик, 21 год</p>
          <p className="aboutMe__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
            музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После
            того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="https://github.com/IgorSuhachov" className="aboutMe__link" target="_blank">
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
