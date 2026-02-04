export interface SeatStats {
  used: number;
  total: number;
  available: number;
  percentage: number;
}

export interface StorageStats {
  limit_readable: string;
  allocated_readable: string;
  percentage: number;
}

export interface RecentActivity {
  event: string;
  time: string;
  device: string;
}

export interface SubscriptionData {
  plan_name: string;
  status: string;
  next_billing_date: string | null;
  is_cancelled: boolean;
  card_last_four: string | null;
  seats: SeatStats;
}

export interface InfrastructureData {
  domains_count: number;
  storage: StorageStats;
  mailbox_status: "active" | "provisioning" | "error" | "healthy";
}

export interface AccountOverviewResponse {
  subscription: SubscriptionData;
  infrastructure: InfrastructureData;
  security_score: number;
  recent_activity: RecentActivity[];
}
