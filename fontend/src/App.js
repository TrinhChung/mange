import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./providers/authProvider";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Loading from "./pages/Loading/Loading";
import Auth from "./pages/Auth";

function App() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [authUser]);

  const role = authUser && authUser.role ? authUser.role : null;

  return (
    <BrowserRouter>
      <Auth />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        style={{ textAlign: "left" }}
      />
    </BrowserRouter>
  );
}

export default App;
