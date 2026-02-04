export interface Organization {
  id: number;
  name: string;
  industry: string;
  location: string;
  stalwart_tenant_id: string;
  mailbox_status: "pending" | "active" | "suspended" | string;
  max_domains: number;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrgOverviewResponse {
  org_details: {
    name: string;
    id: number;
    created_at: string;
  };
  asset_summary: {
    domains: {
      total: number;
      verified: number;
      health_score: number;
    };
    seats: {
      total_capacity: number;
      occupied: number;
      available: number;
    };
    storage: {
      total_gb: number;
      used_mb: number;
      utilization: number;
    };
  };
  status: string;
}