import { SHORT_MOVIE_DURATION } from './constants';

export function filterMovies(movies, query) {
  const filteredMovies = movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase().trim()) ||
      movie.nameEN.toLowerCase().includes(query.toLowerCase().trim())
  );
  return filteredMovies;
}

export function converter(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
}

export function filterShort(movies) {
  if (!movies) {
    return [];
  }
  return movies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION);
}
