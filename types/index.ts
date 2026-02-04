export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
