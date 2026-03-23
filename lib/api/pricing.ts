import { ApiResponse } from "@/types/plans";
import api from "../axios";

export async function listPlans(): Promise<{ data: ApiResponse }> {
    const response = await api.get('/plans');
    return response;
}

export async function createCheckoutSession(price_id: string): Promise<{ data: { url: string } }> {
    const response = await api.post('/checkout/create-session', { price_id });
    return response;
}