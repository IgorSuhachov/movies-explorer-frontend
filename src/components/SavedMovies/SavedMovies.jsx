import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { filterMovies, filterShort } from '../../utils/utils';

export default function SavedMovies({ loggedIn, savedMovies, handleDeleteCard }) {
	const [shortCard, setShortCard] = useState(false);
	const [filteredCards, setFilteredCards] = useState(savedMovies);
	const [query, setQuery] = useState('');
	const [notFound, setNotFound] = useState(false);

	function onSearchMovies(query) {
		setQuery(query);
	}

	function handleShortToggle() {
		setShortCard(!shortCard);
	}

	useEffect(() => {
		const moviesCardList = filterMovies(savedMovies, query);
		setFilteredCards(shortCard ? filterShort(moviesCardList) : moviesCardList);
	}, [savedMovies, shortCard, query]);

	useEffect(() => {
		const filteredSavedMovies = filterMovies(savedMovies, query, shortCard);
		const notFoundCondition = filteredSavedMovies.length === 0 && query !== '';
		setNotFound(notFoundCondition);
	}, [savedMovies, query, shortCard]);

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='movies'>
				<SearchForm onSearchMovies={onSearchMovies} onFilteredMovies={handleShortToggle} />
				<MoviesCardList
					cards={filteredCards}
					savedMovies={savedMovies}
					handleDeleteCard={handleDeleteCard}
					notFound={notFound}
				/>
			</main>
			<Footer />
		</>
	);
}
