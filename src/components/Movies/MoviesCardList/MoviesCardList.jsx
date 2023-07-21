import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

export default function MoviesCardList({ cards, savedMovies, handleSaveCard, handleDeleteCard, preloader, notFound }) {
  const [shownMovies, setShownMovies] = useState(0);

  const location = useLocation();
  const isSavedMoviesRoute = location.pathname.includes('saved-movies');

  // Определение количества отоброжаемых карточек в зависимости от ширины экрана
  useEffect(() => {
    const shownCount = () => {
      const display = window.innerWidth;
      if (display > 1024) {
        setShownMovies(12);
      } else if (display > 750) {
        setShownMovies(8);
      } else {
        setShownMovies(5);
      }
    };

    shownCount();
    window.addEventListener('resize', shownCount);
  }, []);

  // Функция для добавления карточек при нажатии кнопки "еще"
  function showMore() {
    const display = window.innerWidth;
    if (display > 1024) {
      setShownMovies(shownMovies + 3);
    } else {
      setShownMovies(shownMovies + 2);
    }
  }

  // Функция для получения сохраненной карточки фильма
  function getSavedCard(savedMovies, card) {
    return savedMovies.find((savedMovies) => savedMovies.movieId === card.id);
  }

  return (
    <>
      {isSavedMoviesRoute ? ( // Если находимся на /savved-movies
        <>
          <section className="moviesCardList">
            {cards.map((card) => (
              <MoviesCard
                key={card._id}
                cards={cards}
                card={card}
                saved={getSavedCard(savedMovies, card)}
                savedMovies={savedMovies}
                handleDeleteCard={handleDeleteCard}
              />
            ))}
          </section>
          <div className="moviesCardList__wrapper"></div>
        </>
      ) : (
        // Если находимся на /movies
        <>
          {preloader && <Preloader />}
          {!preloader && notFound && <NotFound />}
          <section className="moviesCardList">
            {cards.slice(0, shownMovies).map((card) => (
              <MoviesCard
                key={card.id}
                cards={cards}
                card={card}
                saved={getSavedCard(savedMovies, card)}
                savedMovies={savedMovies}
                handleSaveCard={handleSaveCard}
                handleDeleteCard={handleDeleteCard}
              />
            ))}
          </section>
          <div className="moviesCardList__wrapper">
            {cards.length > shownMovies ? (
              <button className="moviesCardList__button" onClick={showMore}>
                Еще
              </button>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </>
  );
}
