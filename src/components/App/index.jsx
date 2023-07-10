import React, { useState } from 'react';
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
import { logOut } from "../../store/slices/userSlice";
// import { useLocalStorage } from "../../hooks/useLocalStorage";
// import { useSessionStorage } from "../../hooks/useSessionStorage";
import { useSelector, useDispatch } from 'react-redux';

export default function App() {


  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "", userId: "" });

  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = useState(""); // ошибка от сервера при запросе сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]); // массив сохраненных фильмов

  const navigate = useNavigate();

  // async function handleGetSavedMovies() {
  //   try {
  //     setErrorMessageSavedMovies("");
  //     const data = await mainApi.getAllSavedMovies();
  //     setSavedMovies(data);
  //   } catch (error) {
  //     console.log(error.message);
  //     setErrorMessageSavedMovies(error.message);
  //   }
  // };

  async function handleDeleteMovie(movieId) {
    try {
      await mainApi.deleteMovie(movieId);
      setSavedMovies(savedMovies.filter((item) => item._id !== movieId));
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
        // setLoggedIn(true);
        navigate("/videos", { replace: true });
      }
    } catch (error) {
      // setErrorMessage(error.message);
      console.log(error)
    } finally {
      // setIsPreloaderVisible(false);
    };
  };

  async function handleChangeUserInfo(info) {
    try {
      const data = await mainApi.setUserInfo(info);
      const newCurrentUser = { userName: data.name, userEmail: data.email, userId: data._id };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      // setErrorMessage("Изменения профиля сохранены");
      // console.log("профиль");
    } catch (error) {
      // setErrorMessage(error.message);
      console.log(error)
    } finally {
      // setIsPreloaderVisible(false);
    };
  };

  function handleSignOut() {
    setCurrentUser({ userName: "", userEmail: "", userId: "" });
    // setLoggedIn(false);
    dispatch(logOut());
    localStorage.clear();
    setSavedMovies([]);
    // setMovies([]);
    setErrorMessageSavedMovies("");
    // setErrorMessageMovies("");
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     handleGetCurrentUser();
  //     handleGetSavedMovies();
  //   }
  //   // eslint-disable-next-line 
  // }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>

          <Route exact path="/" element={<Main loggedIn={isLoggedIn} />} />

          <Route
            path="videos"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={Movies}
              />
            }
          />

          <Route
            path="movies"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                // savedMovies={savedMovies}
                // errorMessageSavedMovies={errorMessageSavedMovies}
                // handleGetSavedMovies={handleGetSavedMovies}
                // handleDeleteMovie={handleDeleteMovie}

                component={SavedMovies}
              />
            }
          />
          <Route
            path="signup"
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register
                  handleRegister={handleRegister}
                />
              )
            }
          />

          <Route
            path="signin"
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="profile"
            element={<ProtectedRoute
              loggedIn={isLoggedIn}
              component={Profile}
              handleChangeUserInfo={handleChangeUserInfo}
              handleSignOut={handleSignOut}
            />
            }
          />
          <Route path="*" element={<PageError />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider >
  );
}
