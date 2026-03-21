import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/useUserStore";
import { setupCache } from "axios-cache-interceptor";

const baseApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://core.falconmail.online/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const api = setupCache(baseApi);

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.responseType === "blob") {
      config.headers["Accept"] = "*/*";
      config.cache = false;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API error:", error);
    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Something went wrong";

    if (error?.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        useAuthStore.getState().clearAuth();
        toast.error("Session expired");
        window.location.href = "/login"; // Force back to login
      }
    } else if (error?.response?.status === 422) {
      toast.error("Check your input data");
    } else {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  },
);

export default api;
