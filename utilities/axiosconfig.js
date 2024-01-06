import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cussospizza.vercel.app',
});

export default axiosInstance;