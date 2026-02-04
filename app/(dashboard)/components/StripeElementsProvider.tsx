"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode, useEffect } from "react";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeElementsProvider({
    clientSecret,
    prevStep,
    children,
}: {
    clientSecret: string;
    prevStep: any;
    children: ReactNode;
}) {
    useEffect(() => {
        // console.log("Stripe Provider Mounted");
        // console.log("Client Secret Length:", clientSecret?.length);
        // console.log("Publishable Key Check:", !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

        if (!clientSecret) {
            console.error("Your subscription is active. You can go back to change your subscription package");
        }

    }, [clientSecret]);

    if (!clientSecret) return
    <>
        <div className="p-4 text-red-500 font-bold border-2 border-dashed border-red-200">System Error: Payment configuration missing.
            <button
                onClick={prevStep}
                className="flex cursor-pointer items-center text-xs font-bold text-slate-400 mb-4 hover:text-blue-600 transition-colors"
            />
        </div>;
    </>
    return (
        <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
        >
            {children}
        </Elements>
    );
}
