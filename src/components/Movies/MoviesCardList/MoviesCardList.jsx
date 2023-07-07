import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <>
      <section className="moviesCardList">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
      <div className="moviesCardList__wrapper">
        <button className="moviesCardList__button">Еще</button>
      </div>
    </>
  );
}
