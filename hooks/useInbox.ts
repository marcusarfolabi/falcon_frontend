import api from "@/lib/axios";
import { formatEmailDate } from "@/util/formatedDate";
import { useQuery } from "@tanstack/react-query";

export function useInbox() {
  return useQuery({
    queryKey: ["inbox"],
    queryFn: async () => { 
      const { data } = await api.get("/mailboxes/inbox");
 
      const emails = (data.emails || []).map((email: any) => ({
        id: email.id, 
        sender:
          email.from?.[0]?.name || email.from?.[0]?.email || "Unknown Sender",
        subject: email.subject || "(No Subject)",
        preview: email.preview || "",
        hasAttachment: email.hasAttachment || false,
        time: formatEmailDate(email.receivedAt), 
        read: email.keywords
          ? Object.prototype.hasOwnProperty.call(email.keywords, "$seen")
          : false,
      }));
 
      const counts = data.counts || {
        inbox: 0,
        sent: 0,
        drafts: 0,
        trash: 0,
        junk: 0,
      };

      return { emails, counts };
    },
  });
}
