import api from "../axios"; 

/**
 * Profile API methods
 */
export const profileApi = { 
  getAuthUser: async () => { 
    return api.get("/auth/me");
  },
};
