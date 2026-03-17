import { ApiResponse } from "@/types/domain";
import api from "../axios";

const FORM_HEADER = { "Content-Type": "application/x-www-form-urlencoded" };

/**
 * Helper to convert objects to URLSearchParams for FORM_HEADER requests
 */
const toFormData = (obj: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params;
};

export async function checkDomain(domain: string): Promise<ApiResponse> {
  const data = toFormData({ domain });
  const response = await api.post<ApiResponse>(
    "/onboarding/check-domain",
    data,
    {
      headers: FORM_HEADER,
    },
  );
  return response.data;
}

export async function verifyDomain(): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post("/onboarding/verify-domain", null, {
    headers: FORM_HEADER,
  });
  return response.data;
}

interface PaymentData {
  plan_id: string;
  domain: string;
  name: string;
  email: string; // Prefix eg 'admin'
  password: string;
  alternative_email: string;
}

export async function preparePayment(
  data: PaymentData,
): Promise<{ clientSecret: string; paymentIntentId: string; status: string }> {
  const formData = toFormData(data);

  const response = await api.post<{
    clientSecret: string;
    paymentIntentId: string;
    status: string;
  }>("/onboarding/prepare-payment", formData, { headers: FORM_HEADER });
  return response.data;
}

export async function verifyPaymentStatus(
  paymentIntentId: string,
): Promise<{ status: string; mailbox?: string; message?: string }> {
  const data = toFormData({ payment_intent: paymentIntentId });

  const response = await api.post<{
    status: string;
    mailbox?: string;
    message?: string;
  }>("/onboarding/verify-payment-status", data, { headers: FORM_HEADER });
  return response.data;
}
