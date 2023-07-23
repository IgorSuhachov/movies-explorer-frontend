import React, { useEffect, useState } from 'react';
import Switch from './Switch/Switch';
import { useLocation } from 'react-router-dom';

export default function SearchForm({ onSearchMovies, onFilteredMovies, shortCard }) {
  const [query, setQuery] = useState('');
  const [emptyQuery, setEmptyQuery] = useState(false);
  const location = useLocation();

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setEmptyQuery(true);
    } else {
      setEmptyQuery(false);
      onSearchMovies(query);
    }
  }

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('moviesSearch')) {
      const localQuery = localStorage.getItem('moviesSearch');
      setQuery(localQuery);
    }
  }, [location]);

  return (
    <section className="searchForm">
      <form className="searchForm__search-field" onSubmit={handleSubmit}>
        <input
          name="query"
          type="search"
          className="searchForm__input"
          placeholder="Фильм"
          onChange={handleChange}
          value={query || ''}
        />
        <button className="searchForm__find" />
      </form>
      {emptyQuery && <span className="searchForm__tip">Нужно ввести ключевое слово</span>}
      <Switch onFilteredMovies={onFilteredMovies} shortCard={shortCard} />
    </section>
  );
}
