import api from '@/lib/axios';
import { formatEmailDate } from '@/util/formatedDate';
import { useQuery } from '@tanstack/react-query';

export function useInbox() {
  return useQuery({
    queryKey: ['inbox'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/mail/inbox');

      // 1. Process Emails for the main list
      const emails = data.emails.map((email: any) => ({
        id: email.id,
        sender: email.from[0]?.name || email.from[0]?.email || "Unknown Sender",
        subject: email.subject || "(No Subject)",
        preview: email.preview,
        hasAttachment: email.hasAttachment || false,
        time: formatEmailDate(email.receivedAt), 
        read: email.keywords ? email.keywords.hasOwnProperty('$seen') : false,
      }));

      // 2. Process Mailbox counts for the sidebar 
      const mailboxes = data.mailboxes || [];
      const counts = {
        inbox: mailboxes.find((m: any) => m.role === 'inbox')?.unreadEmails || 0,
        sent: mailboxes.find((m: any) => m.role === 'sent')?.totalEmails || 0,
        drafts: mailboxes.find((m: any) => m.role === 'drafts')?.totalEmails || 0,
        trash: mailboxes.find((m: any) => m.role === 'trash')?.totalEmails || 0,
        junk: mailboxes.find((m: any) => m.role === 'junk')?.totalEmails || 0,
      };

      return { emails, counts };
    }
  });
}