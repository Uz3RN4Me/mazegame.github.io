console.log('[index.tsx] Script start');
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('[index.tsx] Imports loaded.');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[index.tsx] Root element #root NOT FOUND.');
  const errorDisplay = document.getElementById('error-display-fallback');
  if (errorDisplay) {
      errorDisplay.textContent = 'ERROR: Root element #root NOT FOUND in HTML. Cannot mount React app.';
      errorDisplay.style.display = 'block';
  }
  throw new Error("Could not find root element to mount to");
}
console.log('[index.tsx] Root element #root found.');

const root = ReactDOM.createRoot(rootElement);
console.log('[index.tsx] React root created.');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('[index.tsx] App rendered to root.');
