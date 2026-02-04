"use client";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsData {
  summary: {
    totalMessages: number;
    unreadCount: number;
    sentMessages: number;
    spamPercentage: string;
  };
  storageEstimate: string;
}

export function useAnalytics() {
  const TWELVE_HOURS_MS = 1000 * 60 * 60 * 12;
  return useQuery({
    queryKey: ["mailbox-analytics"],
    queryFn: async () => { 
      const response = await api.get<{ data: AnalyticsData }>(
        "/api/v1/mail/analytics",
      );
      return response.data.data;
    }, 
    refetchInterval: TWELVE_HOURS_MS, 
    staleTime: TWELVE_HOURS_MS, 
    gcTime: TWELVE_HOURS_MS + 1000 * 60 * 30,
  });
}
