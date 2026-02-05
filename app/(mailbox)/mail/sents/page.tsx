"use client";

import { useSent } from "@/hooks/useSent";
import MailList from "@/components/mailbox/MailList";

export default function SentPage() {
  const { data: emails, isLoading, isError, refetch, isFetching } = useSent();

  return (
    <MailList
      folderName="Sents"
      emptyTitle="No sent messages"
      emptyMessage="You haven't sent any emails yet."
      emails={emails || []}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRefetch={refetch}
    />
  );
}
