import api from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useEmailAction() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string;
      action: "trash" | "delete" | "restore";
    }) => {
      // Mapping actions to endpoints
      const endpoints: Record<string, string> = {
        delete: `/mailboxes/messages/${id}`,
        trash: `/mailboxes/messages/${id}/trash`,
        restore: `/mailboxes/messages/${id}/restore`,
      };

      const method = action === "delete" ? "delete" : "post";
      return await api[method](endpoints[action]);
    },
    onSuccess: (_, variables) => {
      // Dynamic Toast messages
      const messages = {
        delete: "Message deleted permanently",
        trash: "Moved to trash",
        restore: "Message restored to inbox",
      };

      toast.success(messages[variables.action]);

      // Refresh all views
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      queryClient.invalidateQueries({ queryKey: ["sent"] });

      // Only go back if we are in the detail view
      if (window.location.pathname.includes(variables.id)) {
        router.back();
      }
    },
    onError: (error: any) => {
      console.error("Action failed:", error);
      toast.error("Action failed. Please try again.");
    },
  });
}