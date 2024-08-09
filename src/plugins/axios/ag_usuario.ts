import axios from 'axios';

// BASE URL
let baseURL = '';
if (process.env.NODE_ENV === 'local') {
  baseURL = import.meta.env.VITE_BASE_URL_AG_USUARIO_LOCAL;
} else if (process.env.NODE_ENV === 'development') {
  baseURL = import.meta.env.VITE_BASE_URL_AG_USUARIO_DEV;
} else if (process.env.NODE_ENV === 'testing') {
  baseURL = import.meta.env.VITE_BASE_URL_AG_USUARIO_TEST;
} else if (process.env.NODE_ENV === 'production') {
  baseURL = import.meta.env.VITE_BASE_URL_AG_USUARIO_PROD;
} else {
  console.error(`Problemas con el entorno, no existe [${process.env.NODE_ENV}]`);
}

const axiosInstance = axios.create({
  baseURL,
  // Aquí puedes añadir más configuraciones como headers por defecto
});

export default axiosInstance;
