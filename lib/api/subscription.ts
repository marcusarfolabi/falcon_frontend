import { ApiResponse } from "@/types/domain";
import api from "../axios";

export async function checkDomain(domain: string): Promise<ApiResponse> {
  const response = await api.get<ApiResponse>("/api/v1/onboarding/domain/check", {
    params: { domain },
  });
  return response.data;
}

export async function verifyDomain(token: string) {
  const response = await api.post("/api/v1/onboarding/domain/verify", {
    token,
  });
  return response.data;
}

interface PaymentData {
  email: string;
  domain: string;
  password?: string;
  plan_id: string;
}

export async function preparePayment(
  data: PaymentData
): Promise<{ clientSecret: string }> {
  const response = await api.post<{ clientSecret: string }>(
    "/api/v1/onboarding/payments/setup",
    data
  );
  return response.data;
}

// lib/api/subscription.ts
export async function onboardingStatus(
  paymentIntentId: string
): Promise<{ status: string; mailbox: string }> {
  const response = await api.get<{ status: string; mailbox: string }>(
    `/api/v1/onboarding/payments/status?payment_intent=${paymentIntentId}`
  );
  return response.data;
}
