import api from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAccountSettings() {
  const queryClient = useQueryClient();

    // 1. Fetch Account Identity
  const identityQuery = useQuery({
    queryKey: ["account-identity"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/mail/settings/identity");
      return data;
    },
  });

    // 2. Update Identity Name
  const updateIdentity = useMutation({
    mutationFn: async (newName: string) => {
      const { data } = await api.patch("/api/v1/mail/settings/identity", {
        name: newName,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-identity"] });
    },
  });

  // 3. Update Signature
  const updateSignature = useMutation({
    mutationFn: async ({ text, html }: { text: string; html: string }) => {
      const { data } = await api.post("/api/v1/mail/settings/signature", {
        text_signature: text,
        html_signature: html,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-identity"] });
    },
  });

  return {
    identity: identityQuery.data,
    isLoading: identityQuery.isLoading,
    isError: identityQuery.isError,
    updateIdentity,
    updateSignature,
  };
}
