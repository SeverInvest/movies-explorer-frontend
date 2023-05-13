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
import auth from "../../utils/Auth";
// import { isError } from "../../utils/utils";
import ProtectedRoute from '../ProtectedRoute';
// import api from "../../utils/Api";

export default function App() {
  const [currentUser, setCurrentUser] = useState({ userName: "", userEmail: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  // const navigate = useNavigate();

  // TODO: 
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({ userName: "", userEmail: "" });
    setLoggedIn(false);
    console.log("I'm here");
    // navigate("/", { replace: true });
  }

  useEffect(() => {
    console.log("up", loggedIn, localStorage.getItem("jwt"), currentUser)
  }, [loggedIn, currentUser])

  async function handleRegister({ name, email, password }) {
    try {
      const data = await auth.register(name, email, password);
      const newCurrentUser = { userName: data.name, userEmail: data.email };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      const { token } = await auth.authorize(email, password);
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
      const { token } = await auth.authorize(email, password);
      if (token) {
        localStorage.setItem('jwt', token);
        setLoggedIn(true);
        const data = await auth.getUser();
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
      const data = await auth.setUserInfo(info);
      const newCurrentUser = { userName: data.name, userEmail: data.email };
      setCurrentUser({ ...currentUser, ...newCurrentUser });
      setErrorMessage("Изменения профила сохранены");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="movies" element={<ProtectedRoute loggedIn={loggedIn} component={Movies} />} />
          <Route path="saved-movies" element={<ProtectedRoute loggedIn={loggedIn} component={SavedMovies} />} />
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
          <Route path="page-error" element={<PageError />} />
        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}
