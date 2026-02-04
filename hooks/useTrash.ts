import api from "@/lib/axios";
import { formatEmailDate } from "@/util/formatedDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTrash() {
  return useQuery({
    queryKey: ["trash"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/mail/trash");

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
export function useDeleted() {
  return useQuery({
    queryKey: ["deleted"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/mail/deleted");

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

export function useDeleteForever() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      await api.delete(`/api/v1/mail/message/${messageId}/permanent`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash"] });
    },
  });
}