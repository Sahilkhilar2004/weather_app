import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// If you're using Tailwind CDN via index.html, no need for index.css
// Otherwise, uncomment the line below if you have a Tailwind setup with CSS
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
