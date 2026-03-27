import api from "@/lib/axios";

/**
 * Pages API methods
 */
export const PagesApi = { 

  contactMail: async (data: any) => {
    return api.post("/contact/mail", { ...data });
  },
};
