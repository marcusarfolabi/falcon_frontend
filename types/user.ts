import { Organization } from "./organization";

export interface User {
  id: number;
  org_id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: "user" | "admin" | string;
  pending_domain: string | null;
  onboarding_completed: boolean;
  status: "active" | "inactive" | string;
  created_at: string;
  updated_at: string;

  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;

  organization: Organization;
}
