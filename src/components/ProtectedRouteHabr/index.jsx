import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteHabr({
  component: Component,
  loggedIn,
  isLoggedInHabr,
  ...restProps
}) {
  const clientIdHabr = "eee57389cc5e2311b183b312a3f9ccbd12529840743909f9093d405d981623d6";
  const redirectURI = "https://kino-garage.ru/habr";
  const urlHabr = `https://career.habr.com/integrations/oauth/authorize?client_id=${clientIdHabr}&redirect_uri=${redirectURI}&response_type=code`;

  return !loggedIn ? (
    <Navigate to="/" replace />
  ) : isLoggedInHabr ? (
    <Component {...restProps} />
  ) : (
    <Navigate to={urlHabr} replace />
  );
}

export default ProtectedRouteHabr;
