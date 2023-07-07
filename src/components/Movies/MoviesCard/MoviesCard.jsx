import React from 'react';
import { useLocation } from 'react-router-dom';
import film from '../../../images/film1.png';

export default function MoviesCard() {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname.includes('saved-movies');

  return (
    <div className="moviesCard">
      <div className="moviesCard__data">
        <div className="moviesCard__info">
          <h2 className="moviesCard__title">33 слова о дизайне</h2>
          <p className="moviesCard__time">1ч 47м</p>
        </div>
        <button className={`moviesCard__bookmark ${isSavedMoviesRoute ? ' moviesCard__bookmark_remove' : ''}`}></button>
      </div>
      <img src={film} alt="фильм" />
    </div>
  );
}
