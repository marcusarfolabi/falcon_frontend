"use client";

import { useRouter } from "next/navigation"; // Import this
import AuthButton from "@/app/(auth)/components/AuthButton";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

export default function StripeCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter(); // Initialize router
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);

        // 1. Trigger the confirmation
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: `${window.location.origin}/account/onboarding/success`,
            },
        });

        // 2. Handle immediate errors (declined cards, etc.)
        if (error) {
            setErrorMessage(error.message ?? "An unknown error occurred");
            toast.error(error.message || "Payment failed");
            setIsProcessing(false);
            return;
        }

        // 3. Handle Success / Processing
        if (paymentIntent) {
            toast.success("Payment Received! Initializing server...");
            document.cookie = "onboarding_complete=true; path=/; max-age=31536000";
            router.push(
                `/account/onboarding/success?payment_intent=${paymentIntent.id}&redirect_status=${paymentIntent.status}`
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <PaymentElement />
            </div>

            {errorMessage && (
                <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 italic">
                    {errorMessage}
                </p>
            )}

            <AuthButton
                type="submit"
                disabled={!stripe || isProcessing}
                isLoading={isProcessing}
                variant="secondary"
                className="w-full"
            >
                Confirm & Initialize Node
            </AuthButton>
        </form>
    );
}