import api from "../axios";

/**
 * Helper to convert objects to URLSearchParams for FastAPI Form(...) fields
 */
const toFormData = (data: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params;
};

const FORM_HEADER = { "Content-Type": "application/x-www-form-urlencoded" };

export const authApi = {
  /**
   * Request OTP
   * Backend expects: Query Parameter (?email=...)
   */
  requestOtp: (email: string) => {
    return api.post("/auth/forgot-password", null, {
      params: { email },
    });
  },

  /**
   * Verify OTP
   * Backend expects: Form Data (email, otp)
   */
  verifyOtp: (email: string, otp: string) => {
    const data = toFormData({ email, otp });
    return api.post("/auth/verify-otp", data, { headers: FORM_HEADER });
  },

  /**
   * Register
   * Backend expects: Form Data (name, email, password, org_name, org_industry, org_domain)
   */
  register: (formData: any) => {
    const data = toFormData(formData);
    return api.post("/auth/register", data, { headers: FORM_HEADER });
  },

  /**
   * Login
   * Backend expects: Form Data (username, password)
   */
  login: (credentials: any) => {
    const data = new URLSearchParams();
    data.append("username", credentials.email);
    data.append("password", credentials.password);

    return api.post("/auth/login", data, { headers: FORM_HEADER });
  },

  /**
   * Reset Password
   * Backend expects: Form Data (email, new_password)
   */
  resetPassword: (data: { email: string; new_password: string }) => {
    const formData = toFormData(data);
    return api.post("/auth/reset-password", formData, { headers: FORM_HEADER });
  },

  /**
   * Logout
   * Backend expects: Standard POST
   */
  logout: () => {
    return api.post("/auth/logout");
  },

  /**
   * Get Current User Profile
   * Backend expects: Bearer Token in Header (handled by axios interceptor)
   */
  me: () => {
    return api.get("/auth/me");
  },
};
