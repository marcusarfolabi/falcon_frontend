import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/useUserStore";
import { setupCache } from "axios-cache-interceptor";

// 1. Create the base instance
const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.falconmail.online",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
  xsrfHeaderName: "X-XSRF-TOKEN",
  xsrfCookieName: "XSRF-TOKEN",
});

const api = setupCache(baseApi);

// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.cache = false;

//     return config;
//   },
//   (error) => Promise.reject(error),
// );
// Inside your request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // FIX: If we are downloading a file, remove the JSON-only headers
    if (config.responseType === 'blob') {
      config.headers['Accept'] = '*/*'; 
      config.cache = false; // Definitely don't cache blobs
    }

    return config;
  },
  (error) => Promise.reject(error),
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        useAuthStore.getState().clearAuth();
        toast.error(error.response?.data?.message || "Session expired");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
