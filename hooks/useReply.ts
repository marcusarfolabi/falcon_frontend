// hooks/useReply.ts
import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface ReplyData {
  to: string[];
  subject: string;
  body: string;
  threadMessageId: string;
  // Add support for attachments
  attachments?: {
    blobId: string;
    name: string;
    size: number;
    type: string;
  }[];
}

export function useReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReplyData) => {
      const response = await api.post('/mail/reply', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] });
      // We'll handle the success toast in the component to avoid double toasts
    },
    onError: (error: any) => {
      console.error('Reply Error:', error);
      toast.error(error.response?.data?.message || 'Failed to send reply.');
    },
  });
}