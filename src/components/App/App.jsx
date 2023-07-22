import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Error404 from '../Error404/Error404';
import { api } from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import AuthContext from '../ProtectedRoute/AuthContext';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .getContent(token)
        .then(() => {
          setLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Получаем информацию о пользователе
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then(setCurrentUser)
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialsMovies()
        .then(setSavedMovies)
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // Регистрация
  function handleRegister(email, password, name) {
    api
      .register({ email, password, name })
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  // Авторизация
  function handleLogin(email, password) {
    api
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  // Выход из аккаунта
  function handleSignout() {
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('movies');
    localStorage.removeItem('moviesSearch');
    localStorage.removeItem('short');
    setLoggedIn(false);
    navigate('/');
  }

  // Обновление профиля
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        alert('Данные сохранены');
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  // Сохранить карточку
  function handleSaveCard(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
        console.log(`${newCard.nameRU} лайкнута`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удалить карточку
  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((prevMovies) => prevMovies.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleSaveCard={handleSaveCard}
                  handleDeleteCard={handleDeleteCard}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleDeleteCard={handleDeleteCard}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  handleSignout={handleSignout}
                  handleUpdateUser={handleUpdateUser}
                />
              }
            />
            <Route path="/signup" element={<Register handleRegister={handleRegister} loggedIn={loggedIn} />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}
