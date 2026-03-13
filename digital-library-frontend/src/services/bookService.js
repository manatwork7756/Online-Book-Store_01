import axiosInstance from '../api/axiosConfig';

const bookService = {
  getAllBooks: () => axiosInstance.get('/api/books'),
  getBookById: (id) => axiosInstance.get(`/api/books/${id}`),
  searchBooks: (keyword) => axiosInstance.get(`/api/books/search?keyword=${keyword}`),
  getByCategory: (category) => axiosInstance.get(`/api/books/category/${category}`),

  // Admin
  addBook: (data) => axiosInstance.post('/api/admin/books', data),
  updateBook: (id, data) => axiosInstance.put(`/api/admin/books/${id}`, data),
  deleteBook: (id) => axiosInstance.delete(`/api/admin/books/${id}`),
};

export default bookService;
