import React from 'react';
import Switch from './Switch/Switch';

export default function SearchForm() {
  return (
    <section className="searchForm">
      <div className="searchForm__search-field">
        <input type="search" className="searchForm__input" placeholder="Фильм" required />
        <button className="searchForm__find" />
      </div>
      <Switch />
    </section>
  );
}
