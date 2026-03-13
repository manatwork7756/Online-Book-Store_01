import axiosInstance from '../api/axiosConfig';

const accessService = {
  recordAccess: (userId, bookId) =>
    axiosInstance.post('/api/access/record', { userId, bookId }),

  getHistory: (userId) =>
    axiosInstance.get(`/api/access/history/${userId}`),

  updatePage: (userId, bookId, page) =>
    axiosInstance.put('/api/access/page', { userId, bookId, page }),
};

export default accessService;
