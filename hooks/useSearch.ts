import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

export function useSearch(searchTerm: string) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce the search term to wait 300ms after last keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm) return [];
      const { data } = await api.get(`/mailboxes/search?q=${debouncedTerm}`);
      
      return data.map((email: any) => ({
        id: email.id,
        sender: email.from?.[0]?.name || email.from?.[0]?.email || "Unknown",
        subject: email.subject || "(No Subject)",
        preview: email.preview || "",
        time: format(new Date(email.receivedAt), 'MMM d'),
        // Highlight logic can be added here later
      }));
    },
    enabled: debouncedTerm.length > 5, // Only search if 5+ characters typed
  });
}