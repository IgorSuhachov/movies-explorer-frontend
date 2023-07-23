export default class MoviesApi {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }

  // Проверяем запрос
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // Получаем фильмы
  getInitialsMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}
export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
