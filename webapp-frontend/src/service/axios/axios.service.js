import axiosService from 'axios';

const instance = axiosService.create({
    baseURL: 'http://localhost:9100',
    timeout: 5000,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
      }
  });

export default instance;