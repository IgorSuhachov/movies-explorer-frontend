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

  const navigate = useNavigate();
  const location = useLocation();

  //Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    api
      .getContent(token)
      .then(() => {
        setLoggedIn(true);
        navigate(location.pathname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Получаем информацию о пользователе
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Регистрация
  function handleRegister(email, password, name) {
    api
      .register({ email, password, name })
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Авторизация
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
      });
  }

  //Выход из аккаунта
  function handleSignout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  //Обновление профиля
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
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
            <Route path="/movies" element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />} />
            <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />} />
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
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}
