 

import axios from "axios";

 
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

 
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

 
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");  

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
       
      console.error("Unauthorized access - perhaps token expired");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
