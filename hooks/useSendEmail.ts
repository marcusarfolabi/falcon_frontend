import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface SendEmailData {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  // This matches the Laravel validation: attachments.*.blobId, etc.
  attachments?: {
    blobId: string;
    name: string;
    type: string;
    size: number;
  }[];
}

export function useSendEmail() {
  const queryClient = useQueryClient();

  const sendMutation = useMutation({
    mutationFn: async (data: SendEmailData) => {

      const response = await api.post('/api/v1/mail/send', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Email message sent!');
      queryClient.invalidateQueries({ queryKey: ['sent'] });
      queryClient.invalidateQueries({ queryKey: ['outbox'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to send email';
      toast.error(errorMessage);
      console.error('Send Error:', error.response?.data);
    },
  });

  return { sendMutation };
}