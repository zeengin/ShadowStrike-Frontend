import axios from "axios";
import { baseurl } from "../apis";

const axiosWithHeaders = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosWithHeaders.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithHeaders.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosWithHeaders;