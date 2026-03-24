import api from "@/lib/axios";
import { formatEmailDate } from "@/util/formatedDate";
import { useQuery } from "@tanstack/react-query";

export function useDrafts() {
  return useQuery({
    queryKey: ["drafts"],
    queryFn: async () => {
      const { data } = await api.get("/mailboxes/drafts");

      return data.map((email: any) => ({
        id: email.id,
        recipient:
          email.to?.[0]?.name || email.to?.[0]?.email || "(No recipient)",
        subject: email.subject || "(No Subject)",
        preview: email.preview || "",
        time: formatEmailDate(email.receivedAt),
        isDraft: true,
      }));
    },
  });
}
