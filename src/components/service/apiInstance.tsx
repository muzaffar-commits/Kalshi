// src/services/apiInstance.ts

import axios from "axios";

export const basedURLs = "http://192.168.29.218:3000";
// export const basedURLs = "https://api.opinionkings.com";
export const developmentBaseURL = `${basedURLs}/api`;

const apiInstance = axios.create({
  baseURL: developmentBaseURL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
if (typeof window !== "undefined") {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token") || "";
      console.log(token, "token====");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default apiInstance;
