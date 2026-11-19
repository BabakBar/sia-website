import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './globals.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing application root');
}

const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, application);
} else {
  createRoot(root).render(application);
}
