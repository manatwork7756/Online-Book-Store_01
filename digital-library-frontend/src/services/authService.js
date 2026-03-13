import axiosInstance from '../api/axiosConfig';

const authService = {
  register: (data) => axiosInstance.post('/api/auth/register', data),
  login: (data) => axiosInstance.post('/api/auth/login', data),
};

export default authService;
