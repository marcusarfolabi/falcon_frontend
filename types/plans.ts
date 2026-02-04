export interface PlanPrice {
  id: string;
  amount: number;
  total_annual?: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  highlight: boolean;
  prices: {
    monthly: PlanPrice;
    annual: PlanPrice;
  };
}

export interface ApiResponse {
  plans: Plan[];
  meta: {
    currency: string;
    enterprise_contact: string;
  };
}
