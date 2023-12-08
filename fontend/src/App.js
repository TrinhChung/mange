import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './providers/authProvider';
import { BrowserRouter } from 'react-router-dom';
import Guest from './pages/Guest';
import User from './pages/User';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './pages/Admin';
import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
import { notification } from 'antd';
function App() {
  const { authUser, setAuthUser } = useContext(AuthContext);

  window.io = require('socket.io-client');

  useEffect(() => {
    const token = localStorage
      .getItem('accessToken')
      ?.slice(1, localStorage.getItem('accessToken').length - 1);

    window.echo = new Echo({
      broadcaster: 'socket.io',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      host:
        process.env.NODE_ENV === 'production'
          ? 'https://api.mange.uetvnu.id.vn:6001'
          : 'http://localhost:6001',
    });

    window.echo.connector.socket.on('connect', function () {
      // console.log('connect success');
    });

    window.echo.connector.socket.on('disconnect', function () {
      // console.log('disconnected');
    });
  }, [authUser]);

  return (
    <BrowserRouter>
      {authUser ? (
        authUser.role === 'user' ? (
          <User />
        ) : authUser.role === 'admin' ? (
          <Admin />
        ) : null
      ) : (
        <Guest />
      )}
      {/* <Admin /> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        style={{ textAlign: 'left' }}
      />
    </BrowserRouter>
  );
}

export default App;
