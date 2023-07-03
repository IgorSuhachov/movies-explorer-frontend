import React from 'react';

export default function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="about__header">
        <h2 className="about__heading">О проекте</h2>
      </div>
      <div className="about__information">
        <div className="about__stage">
          <h3 className="about__subheading">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__stage">
          <h3 className="about__subheading">На выполнение диплома ушло 5 недель</h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__progress-wrapper">
        <div className="about__progress-item">
          <p className="about__progress-week">1 неделя</p>
          <p className="about__label">Back-end</p>
        </div>
        <div className="about__progress-item">
          <p className="about__progress-week">4 недели</p>
          <p className="about__label">Front-end</p>
        </div>
      </div>
    </section>
  );
}
