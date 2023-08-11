import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../../images/avatar.jpeg';

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
            Я – начинающий Front-end разработчик с опытом в создании интерактивных образовательных приложений и
            веб-сайтов. Мое увлечение программированием началось с разработки методического пособия для уроков в Unity.
            В этом процессе я не только создавал обучающие игры, но и успешно структурировал и представил сложные
            концепции так, чтобы они были легко понятны школьникам. Мой образовательный путь был сформирован на
            факультете Веб-разработчик в Яндекс Практикуме. Здесь я приобрел глубокие знания и практические навыки,
            которые позволили мне успешно разработать два лендинга с использованием HTML, CSS и методологии BEM. Моя
            способность преобразовывать дизайн в современные и удобные пользовательские интерфейсы дала мне навыки,
            необходимые для эффективной Front-end разработки.
          </p>
          <Link to="https://github.com/IgorSuhachov" className="aboutMe__link" target="_blank">
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
