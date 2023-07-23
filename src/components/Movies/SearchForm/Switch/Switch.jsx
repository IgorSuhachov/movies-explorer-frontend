import React from 'react';

export default function Switch({ onFilteredMovies, shortCard }) {
  return (
    <div className="switch">
      <input type="checkbox" id="switch" className="switch-input" onChange={onFilteredMovies} checked={shortCard} />
      <label htmlFor="switch" className="switch-label" />
      <p className="switch-text">Короткометражки</p>
    </div>
  );
}
