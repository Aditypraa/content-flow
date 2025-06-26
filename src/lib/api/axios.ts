// src/lib/axios.ts

import axios from 'axios';
import Cookies from 'js-cookie';

// Membuat instance axios baru
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Menambahkan request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Mengambil token dari cookies sebelum request dikirim
    const token = Cookies.get('token');

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Mengembalikan konfigurasi yang sudah diubah
  },
  (error) => {
    // Lakukan sesuatu jika terjadi error pada request
    return Promise.reject(error);
  },
);

export default axiosInstance;
