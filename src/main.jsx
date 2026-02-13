import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import App from './App.jsx'
import './index.css'

// Error Trap para que el usuario vea el fallo
window.onerror = function (message, source, lineno, colno, error) {
    const errorContainer = document.createElement('div');
    errorContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; color: red; padding: 20px; z-index: 99999; overflow: auto; font-family: monospace; font-size: 16px;';
    errorContainer.innerHTML = `
    <h1>⚠️ Error Detectado</h1>
    <p><strong>Mensaje:</strong> ${message}</p>
    <p><strong>Archivo:</strong> ${source}:${lineno}:${colno}</p>
    <pre>${error ? error.stack : 'No stack trace'}</pre>
  `;
    document.body.appendChild(errorContainer);
    return false;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Analytics />
        </BrowserRouter>
    </React.StrictMode>,
)
