// src/services/apiInstance.ts

import axios from "axios";

const developmentBaseURL = "http://192.168.29.218:3000/api";

const apiInstance = axios.create({
  baseURL: developmentBaseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
if (typeof window !== "undefined") {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default apiInstance;
