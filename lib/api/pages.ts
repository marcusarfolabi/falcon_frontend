import api from "@/lib/axios";

/**
 * Pages API methods
 */
export const PagesApi = {
  ensureCsrf: async () => {
    return await api.get("/sanctum/csrf-cookie");
  },

  // Contact Mail (General Inquiries)
  contactMail: async (data: any) => {
    return api.post("/api/v1/contact/mail", { ...data });
  },
};
