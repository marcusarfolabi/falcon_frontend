"use client";

import { useInbox } from "@/hooks/useInbox";
import MailList from "@/components/mailbox/MailList";

export default function InboxPage() {
  const { data, isLoading, isError, refetch, isFetching } = useInbox();

  return (
    <MailList
      folderName="Inbox"
      emails={data?.emails || []}
      totalCount={data?.counts?.inbox}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRefetch={refetch}
    />
  );
}
