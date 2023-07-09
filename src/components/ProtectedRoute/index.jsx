import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute ({ component: Component, loggedIn, ...restProps  }) {
  return (
    loggedIn ? <Component {...restProps} /> : <Navigate to="/" replace/>
)}

export default ProtectedRoute;