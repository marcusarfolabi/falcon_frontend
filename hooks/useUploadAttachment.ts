import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

interface UploadResponse {
  blobId: string;
}

export function useUploadAttachment() {
  return useMutation({
    mutationFn: async ({ file, onProgress }: { file: File; onProgress: (p: number) => void }) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<UploadResponse>('/mailboxes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          if (total > 0) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
            onProgress(percentCompleted);
          }
        },
      });

      return response.data;
    },
  });
}