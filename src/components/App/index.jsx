import React, { useState, useEffect } from 'react';
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
import ProtectedRoute from '../ProtectedRoute';
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function App() {

  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "", userId: "" });

  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // states for savedMovies
  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = useState(""); // ошибка от сервера при запросе фильмов
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
      navigate("/", { replace: true });
    } catch (error) {
      console.log(`Токен не соответствует: ${error}`);
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

  async function handleDeleteMovie(moveId) {
    try {
      await mainApi.deleteMovie(moveId);
      handleGetSavedMovies();
    } catch (error) {
      console.log(error.message);
    }
  };


  async function handleSaveMovie(data) {
    try {
      await mainApi.saveMovie(data);
      handleGetSavedMovies();
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
    }
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
    }
  };

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
    handleGetCurrentUser();
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    if (loggedIn) {
      handleGetSavedMovies();
    }
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
