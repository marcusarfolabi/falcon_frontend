export interface Invoice {
    id: string;
    date: string;
    total: string;
    status: 'paid' | 'open' | 'void' | 'uncollectible';
    pdf_url: string;
}

export interface PaymentMethod {
    brand: string | null;
    last4: string | null;
}

export interface SubscriptionStatus {
    status: string;
    plan_id: string;
    next_billing: string;
}

export interface BillingOverviewResponse {
    subscription: SubscriptionStatus;
    payment_method: PaymentMethod;
    invoices: Invoice[];
    has_more: boolean;
    total_count:number;
}