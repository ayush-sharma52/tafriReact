// src/index.tsx or src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import App from './App';
import './styles/styles.css'; // Make sure your styles are correctly imported

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
