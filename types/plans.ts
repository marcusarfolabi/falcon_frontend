export interface PlanPrice {
  id: string;
  amount: number;
  total_annual?: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthly_amount: number;
  annual_amount: number;
  currency: string;
  features: string[];
  is_highlighted: boolean;
  max_seats: number;
  max_storage: number;
  monthly_price_id: string;
  annual_price_id: string;
}

export interface ApiResponse {
  plans: Plan[];
  meta: {
    currency: string;
    enterprise_contact: string;
  };
}
