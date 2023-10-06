import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './providers/authProvider';
import MangaProvider from './providers/mangaProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MangaProvider>
        <App />
      </MangaProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
