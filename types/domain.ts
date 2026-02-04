export interface ApiResponse {
  domain: string;
  available: boolean;
  status: "registered" | "unregistered";
  hint: string;
}

// Optional: If your Laravel API wraps the response in a standard data object
export interface DomainCheckResponse {
  data: ApiResponse;
  message?: string;
}

export interface OrgDomain {
  id: number;
  org_id: string;
  domain_name: string;
  is_verified: boolean;
  dns_verification_token: string;
  domain_verified_at: string;
  plan_id: number;
  max_storage: number;
  max_seats: number;
}


export interface DomainOverviewResponse {
  domains: DomainEntry[];
  summary: {
    total_domains: number;
    verified_domains: number;
  };
  pagination: {
    total: number;
    offset: number;
    limit: number;
    has_more: boolean;
  };
}

export interface DomainEntry {
  id: number;
  name: string;
  verification: {
    is_verified: boolean;
    token: string;
    verified_at: string | null;
  };
  plan: {
    id: string;
    label: string;
    seats: number;
    storage_gb: number;
  };
  dates: {
    added: string;
    last_sync: string;
  };
  status: "protected" | "pending_dns";
}