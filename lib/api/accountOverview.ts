import { AccountOverviewResponse } from "@/types/overview";
import api from "../axios";
import { BillingOverviewResponse } from "@/types/billing";
import { MailboxOverviewResponse } from "@/types/mailbox";

/**
 * Fetches dashboard overview stats
 */
export async function getAccountOverview(): Promise<AccountOverviewResponse> {
  const response = await api.get<AccountOverviewResponse>(
    "/api/v1/account/overview"
  );
  return response.data;
}

/**
 * Fetches local subscription data and Stripe invoice history
 */
export async function getBillingOverview(
  limit: number
): Promise<BillingOverviewResponse> {
  const response = await api.get<BillingOverviewResponse>(
    `/api/v1/account/billing?limit=${limit}`
  );
  return response.data;
}

