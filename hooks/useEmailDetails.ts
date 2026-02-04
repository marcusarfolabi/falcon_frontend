import api from "@/lib/axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export function useEmailDetails(emailId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["email", emailId],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/mail/messages/${emailId}`);
      queryClient.invalidateQueries({ queryKey: ["inbox"] });

      const formatName = (person: any) => {
        if (!person) return "";
        if (person.name && person.name.trim() !== "") return person.name;
        const prefix = person.email.split('@')[0];
        return prefix
          .split(/[._-]/) 
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

      return {
        ...data,
        from: { ...data.from, name: formatName(data.from) },
        to: (data.to || []).map((p: any) => ({ ...p, name: formatName(p) })),
        cc: (data.cc || []).map((p: any) => ({ ...p, name: formatName(p) })),
        bcc: (data.bcc || []).map((p: any) => ({ ...p, name: formatName(p) })),
        attachments: data.attachments || []
      };
    },
    enabled: !!emailId,
  });
}