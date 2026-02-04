"use client"; 

import { useDrafts } from "@/hooks/useDrafts";
import MailList from "@/components/mailbox/MailList";

export default function DraftsPage() {
  const { data: drafts, isLoading, isError, refetch, isFetching } = useDrafts();

  return (
    <MailList
      folderName="Drafts"
      emails={drafts || []}
      totalCount={drafts?.counts?.drafts}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRefetch={refetch}
    />
  );
}