import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './providers/authProvider';
import { BrowserRouter } from 'react-router-dom';
import Guest from './pages/Guest';
import User from './pages/User';
import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState({});

  useEffect(() => {
    window.io = require('socket.io-client');

    window.Echo = new Echo({
      client: Socketio,
      broadcaster: 'socket.io',
      host:
        process.env.NODE_ENV === 'production'
          ? 'https://api.mange.uetvnu.id.vn:6001'
          : 'http://localhost:6001',
    });

    window.Echo.connector.socket.on('connect', function () {
      // console.log('connect success');
    });

    window.Echo.connector.socket.on('disconnect', function () {
      // console.log('disconnected');
    });

    window.Echo.channel('laravel_database_my-channel').listen(
      '.my-event',
      (e) => {
        // console.log(e);
      }
    );
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, [authUser]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('auth-user')));
  }, []);

  const role = authUser && authUser.role ? authUser.role : null;

  return (
    <BrowserRouter>
      {user && user.success == true ? <User /> : <Guest />}

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
