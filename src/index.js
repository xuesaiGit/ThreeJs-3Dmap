import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>----------->严格模式下开发环境会render两次
    <App />
  // </React.StrictMode>
);
reportWebVitals();
