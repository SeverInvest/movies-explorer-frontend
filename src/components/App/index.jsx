import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from '../main/Main';
import Movies from '..//movies/Movies';
import SavedMovies from '..//movies/SavedMovies';
import Register from '../user/Register';
import Login from '../user/Login';
import Profile from '../user/Profile';
import PageError from '../PageError';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from '../ProtectedRoute';
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function App() {

  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "", userId: "" });

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));
  const [errorMessage, setErrorMessage] = useState("");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  // states for savedMovies
  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = useState(""); // ошибка от сервера при запросе сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]); // массив сохраненных фильмов
  // states for movies
  const [errorMessageMovies, setErrorMessageMovies] = useLocalStorage("errorMessageMovies", ""); // ошибка от сервера при запросе фильмов
  const [movies, setMovies] = useLocalStorage("movies", []); // массив фильмов

  const navigate = useNavigate();

  async function handleGetCurrentUser() {
    try {
      const data = await mainApi.getUser()
      setLoggedIn(true);
      const newCurrentUser = { userName: data.name, userEmail: data.email, userId: data._id };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
    } catch (error) {
      console.log(`Токен не соответствует: ${error}`);
      setLoggedIn(false);
    }
  };

  async function handleGetSavedMovies() {
    try {
      setErrorMessageSavedMovies("");
      const data = await mainApi.getAllSavedMovies();
      setSavedMovies(data);
    } catch (error) {
      console.log(error.message);
      setErrorMessageSavedMovies(error.message);
    }
  };

  async function handleDeleteMovie(movieId) {
    try {
      await mainApi.deleteMovie(movieId);
      setSavedMovies(savedMovies.filter((item) => item._id !== movieId));
    } catch (error) {
      console.log(error.message);
    }
  };

  async function handleSaveMovie(data) {
    try {
      const res = await mainApi.saveMovie(data);
      setSavedMovies([...savedMovies, res])
    } catch (error) {
      console.log(error.message);
    }
  };

  async function handleRegister({ name, email, password }) {
    try {
      const data = await mainApi.register(name, email, password);
      const newCurrentUser = { userName: data.name, userEmail: data.email, userId: data._id };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      const { token } = await mainApi.authorize(email, password);
      if (token) {
        localStorage.setItem("jwt", token);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    } finally {
      setIsPreloaderVisible(false);
    };
  };

  async function handleLogin({ email, password }) {
    try {
      const { token } = await mainApi.authorize(email, password);
      if (token) {
        localStorage.setItem("jwt", token);
        setLoggedIn(true);
        const data = await mainApi.getUser();
        const newCurrentUser = { userName: data.name, userEmail: data.email, userId: data._id };
        setCurrentUser({ ...currentUser, ...newCurrentUser });
        navigate("/movies", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    } finally {
      setIsPreloaderVisible(false);
    };
  };

  async function handleChangeUserInfo(info) {
    try {
      const data = await mainApi.setUserInfo(info);
      const newCurrentUser = { userName: data.name, userEmail: data.email, userId: data._id };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      setErrorMessage("Изменения профиля сохранены");
      // console.log("профиль");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    } finally {
      setIsPreloaderVisible(false);
    };
  };

  function handleSignOut() {
    setCurrentUser({ userName: "", userEmail: "", userId: "" });
    setLoggedIn(false);
    localStorage.clear();
    setSavedMovies([]);
    setMovies([]);
    setErrorMessageSavedMovies("");
    setErrorMessageMovies("");
  };

  useEffect(() => {
    if (loggedIn) {
      handleGetCurrentUser();
      handleGetSavedMovies();
    }
    // eslint-disable-next-line 
  }, [loggedIn]);

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
                movies={movies}
                savedMovies={savedMovies}
                errorMessageMovies={errorMessageMovies}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                setErrorMessageMovies={setErrorMessageMovies}
                setMovies={setMovies}

                component={Movies}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                errorMessageSavedMovies={errorMessageSavedMovies}
                handleGetSavedMovies={handleGetSavedMovies}
                handleDeleteMovie={handleDeleteMovie}

                component={SavedMovies}
              />
            }
          />
          <Route
            path="signup"
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register
                  handleRegister={handleRegister}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  setIsPreloaderVisible={setIsPreloaderVisible}
                  isPreloaderVisible={isPreloaderVisible}
                />
              )
            }
          />

          <Route
            path="signin"
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login
                  handleLogin={handleLogin}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  setIsPreloaderVisible={setIsPreloaderVisible}
                  isPreloaderVisible={isPreloaderVisible}
                />
              )
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
              handleSignOut={handleSignOut}
              setIsPreloaderVisible={setIsPreloaderVisible}
              isPreloaderVisible={isPreloaderVisible}
            />
            }
          />
          <Route path="*" element={<PageError />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider >
  );
}
