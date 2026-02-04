"use client";

import { useTrash } from "@/hooks/useTrash";  
import MailList from "@/components/mailbox/MailList";

export default function TrashPage() {
  const { data: emails, isLoading, isError, refetch, isFetching } = useTrash();

  return (
    <MailList
      folderName="Trash"
      emails={emails || []}
      totalCount={emails?.length || 0}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRefetch={refetch}
    />
  );
}