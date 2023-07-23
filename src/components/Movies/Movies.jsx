import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies, filterShort } from '../../utils/utils';

export default function Movies({ loggedIn, handleSaveCard, handleDeleteCard, savedMovies }) {
  const [initialCards, setInitialCards] = useState([]);
  const [shortCard, setShortCard] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Функция для фильтрации и обновления списка фильмов
  function handleFilterMovies(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short);
    setInitialCards(moviesCardList);
    setFilteredCards(short ? filterShort(moviesCardList) : moviesCardList);
    localStorage.setItem('movies', JSON.stringify(moviesCardList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  // Функция переключения короткометражных фильмов
  function handleShortToggle() {
    const newShortCardValue = !shortCard;
    setShortCard(newShortCardValue);
    setFilteredCards(newShortCardValue ? filterShort(initialCards) : initialCards);
    localStorage.setItem('short', newShortCardValue);
  }

  // Функция поиска фильмов по запросу
  function onSearchMovies(query) {
    localStorage.setItem('moviesSearch', query);
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));

    if (allMovies) {
      handleFilterMovies(allMovies, query, shortCard);
    } else {
      setPreloader(true);
      moviesApi
        .getInitialsMovies()
        .then((data) => {
          handleFilterMovies(data, query, shortCard);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }

  useEffect(() => {
    const short = localStorage.getItem('short') === 'true';
    setShortCard(short);
  }, []);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    setInitialCards(movies || []);
    setFilteredCards(shortCard ? filterShort(movies) : movies || []);
  }, [shortCard]);

  useEffect(() => {
    setNotFound(filteredCards.length === 0 && localStorage.getItem('moviesSearch'));
  }, [filteredCards]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearchMovies={onSearchMovies} onFilteredMovies={handleShortToggle} shortCard={shortCard} />
        <MoviesCardList
          cards={filteredCards}
          savedMovies={savedMovies}
          handleSaveCard={handleSaveCard}
          handleDeleteCard={handleDeleteCard}
          preloader={preloader}
          notFound={notFound}
        />
      </main>
      <Footer />
    </>
  );
}
