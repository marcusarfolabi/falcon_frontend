/**
 * Represents the usage and limits of the organization's domain
 */
export interface MailboxInventory {
  domain_name: string;
  plan_id: string;
  max_seats: number;
  used_seats: number;
  remaining_seats: number;
  utilization_percent: number;
  max_storage: number; // In GB
  is_verified: boolean;
}

/**
 * Represents the storage details for an individual mailbox
 */
export interface IndividualMailboxStorage {
  used: number; // In MB
  limit: number; // In MB
  percent: number; // 0-100
}

/**
 * Represents a single mailbox record
 */
export interface MailboxEntry {
  id: number;
  address: string;
  display_name: string;
  domain: string;
  alternative_email: string | null;
  password: string;
  storage: IndividualMailboxStorage;
  status: "active" | "suspended" | "pending" | "maintenance";
  created_at: string; // Formatted as "Jan 16, 2026"
  updated_at: string;
}

/**
 * Pagination metadata for the Gmail-style navigation
 */
export interface MailboxPagination {
  total: number;
  offset: number;
  limit: number;
  has_more: boolean;
}

/**
 * The complete response from /api/v1/account-mailbox
 */
export interface MailboxOverviewResponse {
  inventory: MailboxInventory;
  mailboxes: MailboxEntry[];
  pagination: MailboxPagination;
}
