import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';
import { dismissBootSplash } from './bootSplash.js';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

requestAnimationFrame(() => {
  dismissBootSplash();
});
