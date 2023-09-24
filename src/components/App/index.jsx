import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../main/Main";
import Videos from "../videos/Videos";
import Habr from "../videos/Videos";
import Users from "../habr/Habr";
import Register from "../user/Register";
import Login from "../user/Login";
import Profile from "../user/Profile";
import PageError from "../PageError";
import ProtectedRoute from "../ProtectedRoute";
import ProtectedRouteHabr from "../ProtectedRouteHabr";
import { useSelector } from "react-redux";

export default function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoggedInHabr = useSelector((state) => state.habr.isLoggedInHabr)

  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Main loggedIn={isLoggedIn} />} />

        <Route
          path="videos"
          element={<ProtectedRoute loggedIn={isLoggedIn} component={Videos} />}
        />

        <Route
          path="habr"
          element={<ProtectedRouteHabr loggedIn={isLoggedIn} isLoggedInHabr={isLoggedInHabr} component={Habr} />}
        />

        <Route
          path="users"
          element={<ProtectedRoute loggedIn={isLoggedIn} component={Users} />}
        />

        <Route
          path="signup"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="signin"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="profile"
          element={<ProtectedRoute loggedIn={isLoggedIn} component={Profile} />}
        />
        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}
