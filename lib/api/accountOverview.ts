import { AccountOverviewResponse } from "@/types/overview";
import api from "../axios";
import { BillingOverviewResponse } from "@/types/billing";

/**
 * Fetches dashboard overview stats
 */
export async function getAccountOverview(): Promise<AccountOverviewResponse> {
  const response = await api.get<AccountOverviewResponse>(
    "/account/overview"
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
    `/account/billing?limit=${limit}`
  );
  return response.data;
}

