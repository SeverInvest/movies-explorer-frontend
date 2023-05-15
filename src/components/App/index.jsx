import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../main/Main';
import Movies from '..//movies/Movies';
import SavedMovies from '..//movies/SavedMovies';
import Register from '../user/Register';
import Login from '../user/Login';
import Profile from '../user/Profile';
import PageError from '../PageError';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
// import { isError } from "../../utils/utils";
import ProtectedRoute from '../ProtectedRoute';
import moviesApi from "../../utils/MoviesApi";

export default function App() {
  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false); // прелоадер

  // states for savedMovies
  const [savedMovies, setSavedMovies] = useState([]); // массив сохраненных фильмов
  // states for movies
  const [errorMessageMovies, setErrorMessageMovies] = useState(""); // ошибка от сервера при запросе фильмов
  const [movies, setMovies] = useState([]); // массив фильмов
  const [isGetInfoFromBD, setIsGetInfoFromBD] = useState(false); // получена ли информация из БД
  const [isFirstLoad, setIsFirstLoad] = useState(true); // первая загрузка (при первом поиске)


  const navigate = useNavigate();

  async function handleGetSavedMovies() {
    try {
      const data = await mainApi.getAllSavedMovies();
      setSavedMovies(data);
    } catch (error) {
      console.log(error.message);
    }
  }

async function handleDeleteMovie(moveId) {
  try {
    await mainApi.deleteMovie(moveId);
    handleGetSavedMovies();
  } catch (error) {
    console.log(error.message);
  }
}


  async function handleSaveMovie(data) {
    try {
      await mainApi.saveMovie(data);
      handleGetSavedMovies();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleGetMovies() {
      try {
        setErrorMessageMovies("");
        const movies = await moviesApi.getAllMovies();
        const updateMovies = movies.map((item) => {
          item.image.url = `https://api.nomoreparties.co/${item.image.url}`
          item.image.formats.thumbnail.url = `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`
          return {...item}
        })
        setMovies(updateMovies);
        handleGetSavedMovies();
        setIsGetInfoFromBD(true);
      } catch (error) {
        console.log(error);
        setIsFirstLoad(true);
        setIsPreloaderVisible(false);
        setErrorMessageMovies(error.message);
      }
  };

  async function handleRegister({ name, email, password }) {
    try {
      const data = await mainApi.register(name, email, password);
      const newCurrentUser = { userName: data.name, userEmail: data.email };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      const { token } = await mainApi.authorize(email, password);
      if (token) {
        localStorage.setItem('jwt', token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const { token } = await mainApi.authorize(email, password);
      if (token) {
        localStorage.setItem('jwt', token);
        setLoggedIn(true);
        const data = await mainApi.getUser();
        const newCurrentUser = { userName: data.name, userEmail: data.email };
        setCurrentUser({ ...currentUser, ...newCurrentUser });
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    }
  }

  async function handleChangeUserInfo(info) {
    try {
      const data = await mainApi.setUserInfo(info);
      const newCurrentUser = { userName: data.name, userEmail: data.email };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      setErrorMessage("Изменения профила сохранены");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({ userName: "", userEmail: "" });
    setLoggedIn(false);
    setMovies([]);
    setSavedMovies([]);
    setErrorMessage("");
    setErrorMessageMovies("");
    setIsFirstLoad(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                // handleGetSavedMovies={handleGetSavedMovies}
                movies={movies}
                savedMovies={savedMovies}
                errorMessageMovies={errorMessageMovies}
                isGetInfoFromBD={isGetInfoFromBD}
                isFirstLoad={isFirstLoad}
                isPreloaderVisible={isPreloaderVisible}
                handleGetMovies={handleGetMovies}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                setIsFirstLoad={setIsFirstLoad}
                setIsPreloaderVisible={setIsPreloaderVisible}

                component={Movies}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                handleGetSavedMovies={handleGetSavedMovies}
                savedMovies={savedMovies}
                component={SavedMovies}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Register
                handleRegister={handleRegister}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path="signin"
            element={
              <Login
                handleLogin={handleLogin}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path="profile"
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={Profile}
              handleChangeUserInfo={handleChangeUserInfo}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              onClick={handleSignOut}
            />
            }
          />
          <Route path="*" element={<PageError status={404} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider >
  );
}
