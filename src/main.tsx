import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'

// Remove post Dev Build
if(import.meta.env.VITE_AXIOS_URL)
{
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_URL;
  axios.defaults.withCredentials = true;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
