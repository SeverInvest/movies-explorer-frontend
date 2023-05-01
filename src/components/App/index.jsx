import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import Main from '../Main';
import Header from '../common/Header';
import Main from '../main/Main';
import Movies from '..//movies/Movies';
import Footer from '../common/Footer';
// import Footer from '../Footer';
// import ProtectedRoute from '../ProtectedRoute';
// import Login from '../Login';
// import Register from '../Register';

// import api from "../../utils/Api";
// import auth from "../../utils/Auth";
// import { isError } from "../../utils/utils";
// import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function App() {
  // const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // const navigate = useNavigate();

  // function handleSingOut() {
  //   localStorage.removeItem("jwt");
  //   // setEmail("");
  //   setLoggedIn(false);
  //   navigate("/sign-in", { replace: true });
  // }

  return (
    // <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header
        // onSignOut={handleSingOut}
        loggedIn={loggedIn}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        {/* <Main /> */}
      </Routes>
      <Footer />
      {/* <Routes>
          <Route exact path="/" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
            />}
          />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>

        {loggedIn &&
          <Footer />
        } */}

    </div>
    // </CurrentUserContext.Provider>
  );
}

export default App;
