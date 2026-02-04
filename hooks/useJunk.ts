import api from "@/lib/axios";
import { formatEmailDate } from "@/util/formatedDate";
import { useQuery } from "@tanstack/react-query";

export function useJunk() {
  return useQuery({
    queryKey: ["junk"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/mail/junk");
      const list = Array.isArray(data) ? data : [];

      return list.map((email: any) => ({
        id: email.id,
        sender: email.from?.[0]?.name || email.from?.[0]?.email || "Unknown",
        subject: email.subject || "(No Subject)",
        preview: email.preview || "",
        time: formatEmailDate(email.receivedAt),
        read: true, 
        hasAttachments: !!(email.attachments && email.attachments.length > 0),
      }));
    },
  });
} 