import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4503';

axios.interceptors.response.use(
	(response) => response,
	(error) => {

		if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INTERNET_DISCONNECTED') {
			// reportMessage({ tipo: "failure", titulo: "Error", mensaje: "No se pudo conectar con el servidor" });
      console.log("No se pudo conectar con el servidor")
			return Promise.reject(error);
		}

		if (error.response.status === 401) {
			localStorage.removeItem("user-token")
			window.location = '/login';
		}

		if (error.response.status === 404) {
			// reportMessage({ tipo: "failure", titulo: "Error", mensaje: error.response.data.message });
		}

		if (error.response.status === 500) {
			// reportMessage({ tipo: "failure", titulo: "Error", mensaje: error.response.data.errores });
		}

		return Promise.reject(error);
	},
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,

)
