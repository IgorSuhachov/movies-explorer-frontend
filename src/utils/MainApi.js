export default class Api {
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

  // Получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // Получаем фильмы
  getInitialsMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // Лайкаем карточку с фильмом
  addCard(card) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: 'https://api.nomoreparties.co/' + card.image.url,
        trailerLink: card.trailerLink,
        thumbnail: 'https://api.nomoreparties.co/' + card.image.formats.thumbnail.url,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
    }).then(this._checkResponse);
  }

  // Удаляем карточку из сохраненных
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // Регистрируем пользователя
  register({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then(this._checkResponse);
  }

  // Авторизуем пользователя
  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  // Устанавливаем новую информацию о пользователе
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  // Получаем токен
  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.movies-suhachov.nomoreparties.sbs',
});
