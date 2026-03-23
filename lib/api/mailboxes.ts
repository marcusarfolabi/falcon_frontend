import api from "../axios";
import { MailboxInventory, MailboxOverviewResponse } from "@/types/mailbox";

// Interface matching your Laravel $request->validate()
export interface CreateMailboxPayload {
  display_name: string;
  address: string; // the prefix e.g. 'john'
  domain_id: string | number;
  password: string;
  alternative_email?: string;
}

// Interface for the specific response from provisionMailBox
export interface CreateMailboxResponse {
  status: "success";
  message: string;
  data: MailboxInventory;
}

/**
 * Fetches Mailbox Inventory, Stats, and Paginated List
 */
export async function getMailboxOverview(
  limit: number,
  offset: number,
): Promise<MailboxOverviewResponse> {
  const response = await api.get<MailboxOverviewResponse>(
    `/mailboxes?limit=${limit}&offset=${offset}`,
  );
  return response.data;
}

/**
 * Provisions a new mailbox on Stalwart via Laravel
 */
export async function addMailBox(
  payload: CreateMailboxPayload,
): Promise<CreateMailboxResponse> {
  const response = await api.post<CreateMailboxResponse>(
    "/mail/provision",
    payload,
  );
  return response.data;
}
