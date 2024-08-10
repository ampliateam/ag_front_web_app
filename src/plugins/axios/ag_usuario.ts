import axios from 'axios';

// BASE URL
let baseURL = import.meta.env.VITE_BASE_URL_AG_USUARIO;

const axiosInstance = axios.create({
  baseURL,
  // Aquí puedes añadir más configuraciones como headers por defecto
});

export default axiosInstance;
