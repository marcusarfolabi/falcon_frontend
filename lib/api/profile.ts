import api from "../axios";
import { authApi } from "./auth";

/**
 * Profile API methods
 */
export const profileApi = {
  ensureCsrf: async () => {
    return await api.get("/sanctum/csrf-cookie");
  },

  getAuthUser: async () => {
    await authApi.ensureCsrf();
    return api.get("/api/v1/user");
  },
};
