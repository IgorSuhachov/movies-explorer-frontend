import React from 'react';
import { useLocation } from 'react-router-dom';
import { converter } from '../../../utils/utils';

export default function MoviesCard({ card, handleSaveCard, handleDeleteCard, saved, savedMovies }) {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname.includes('saved-movies');

  // Обработчик клика по кнопке сохранить или удалить из сохраненных фильмов
  function onClick() {
    if (saved) {
      handleDeleteCard(savedMovies.find((m) => m.movieId === card.id));
    } else {
      handleSaveCard(card);
    }
  }

  // Обработчик клика по кнопке удаления из сохраненных
  function handleDelete() {
    handleDeleteCard(card);
  }

  // Определения класса кнопки сохранения/удаления
  const cardStatus = `${saved ? 'moviesCard__bookmark moviesCard__bookmark_active' : 'moviesCard__bookmark'}`;

  return (
    <div className="moviesCard" key={card.id || card._id}>
      <div className="moviesCard__data">
        <div className="moviesCard__info">
          <h2 className="moviesCard__title">{card.nameRU}</h2>
          <p className="moviesCard__time">{converter(card.duration)}</p>
        </div>
        {isSavedMoviesRoute ? (
          <button onClick={handleDelete} className="moviesCard__bookmark moviesCard__bookmark_remove"></button>
        ) : (
          <button onClick={onClick} className={cardStatus}></button>
        )}
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={isSavedMoviesRoute ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
          alt={card.nameRU}
          className="moviesCard__image"
        />
      </a>
    </div>
  );
}
