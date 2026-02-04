import api from "../axios";


/**
 * Authentication API methods
 */
export const authApi = {
  ensureCsrf: async () => { 
    return await api.get("/sanctum/csrf-cookie");
  },
  
  // 1. Request OTP (Forgot Password)
  requestOtp: async (email: string) => {
    return api.post("/api/v1/auth/request-otp", { email });
  },

  // 2. Verify OTP (Validation step)
  verifyOtp: async (email: string, otp: string) => {
    return api.post("/api/v1/auth/verify-otp", { email, otp });
  },

  // 3. Register (Initialize Instance)
  register: async (data: any) => {
    return api.post("/api/v1/auth/register", data);
  },

  // 4. Login (Access Instance)
  login: async (credentials: any) => {
    await authApi.ensureCsrf();
    return api.post("/api/v1/auth/login", credentials);
  },

  // 5. Reset Password (Finalizing Recovery)
  resetPassword: async (data: any) => {
    return api.post("/api/v1/auth/reset-password", data);
  },

  // Logout
  logout: async () => {
    await authApi.ensureCsrf();
    return api.post("/api/v1/logout");
  },
};
