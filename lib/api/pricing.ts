import { ApiResponse } from "@/types/plans";
import api from "../axios";

export async function listPlans(): Promise<{ data: ApiResponse }> {
    const response = await api.get('/api/v1/plans');
    return response;
}

export async function createCheckoutSession(price_id: string): Promise<{ data: { url: string } }> {
    const response = await api.post('/api/v1/checkout/create-session', { price_id });
    return response;
}