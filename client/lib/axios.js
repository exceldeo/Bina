import axios from 'axios';

const axiosClient = axios.create();

// axiosClient.defaults.baseURL = 'https://api.bina.id/api/v1';
axiosClient.defaults.baseURL = 'http://localhost:8000/api/v1';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = false;

export default axiosClient;
