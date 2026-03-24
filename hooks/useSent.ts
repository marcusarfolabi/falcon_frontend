import api from '@/lib/axios';
import { formatEmailDate } from '@/util/formatedDate';
import { useQuery } from '@tanstack/react-query';

export function useSent() {
  return useQuery({
    queryKey: ['sent'],
    queryFn: async () => {
      const { data } = await api.get('/mailboxes/sent');
      
      return data.map((email: any) => ({
        id: email.id,
        recipient: email.to?.[0]?.name || email.to?.[0]?.email || "Unknown Recipient",
        subject: email.subject || "(No Subject)",
        preview: email.preview || "",
        hasAttachment: email.hasAttachment || false,
        time: formatEmailDate(email.receivedAt), 
        starred: email.keywords?.['$flagged'] || false,
      }));
    },
    staleTime: 30000, // Consider data fresh for 30 seconds
  });
}