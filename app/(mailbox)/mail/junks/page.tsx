"use client";

import MailList from "@/components/mailbox/MailList";
import { useJunk } from "@/hooks/useJunk";

export default function JunkPage() {
  const { data: emails, isLoading, isError, refetch, isFetching } = useJunk();

  return (
    <MailList
      folderName="Junks"
      emails={emails || []}
      totalCount={emails?.length || 0}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRefetch={refetch} 
    />
  );
}