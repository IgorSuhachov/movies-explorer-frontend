import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import {
  desktopCount,
  desktopWidth,
  tabletCount,
  tabletWidth,
  mobileCount,
  desktopMoreCount,
  moreCount,
} from '../../../utils/constants';

export default function MoviesCardList({ cards, savedMovies, handleSaveCard, handleDeleteCard, preloader, notFound }) {
  const [shownMovies, setShownMovies] = useState(0);

  const location = useLocation();
  const isSavedMoviesRoute = location.pathname.includes('saved-movies');

  // Определение количества отоброжаемых карточек в зависимости от ширины экрана
  useEffect(() => {
    const shownCount = () => {
      const display = window.innerWidth;
      if (display > desktopWidth) {
        setShownMovies(desktopCount);
      } else if (display > tabletWidth) {
        setShownMovies(tabletCount);
      } else {
        setShownMovies(mobileCount);
      }
    };

    shownCount();
    window.addEventListener('resize', shownCount);

    return () => {
      window.removeEventListener('resize', shownCount);
    };
  }, []);

  // Функция для добавления карточек при нажатии кнопки "еще"
  function showMore() {
    const display = window.innerWidth;
    if (display > desktopWidth) {
      setShownMovies(shownMovies + desktopMoreCount);
    } else {
      setShownMovies(shownMovies + moreCount);
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
