"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck, ArrowRight, Server } from "lucide-react";
import { motion } from "framer-motion";
import AuthButton from "@/app/(auth)/components/AuthButton";
import { onboardingStatus } from "@/lib/api/subscription";

export default function SuccessClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pollingRef = useRef<NodeJS.Timeout | null>(null);

    const [status, setStatus] = useState<"loading" | "processing" | "success" | "error">("loading");
    const [message, setMessage] = useState("Verifying your payment...");

    const paymentIntentId = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");

    const checkStatus = useCallback(async () => {
        if (!paymentIntentId) return;

        try {
            const data = await onboardingStatus(paymentIntentId);

            // If the backend says 'active', the server is ready
            if (data.status === "success") {
                setStatus("success");
                setMessage(`Provisioning finalized. Mailbox created for ${data.mailbox}`);
                if (pollingRef.current) clearTimeout(pollingRef.current);
            } else {
                // Keep polling every 5 seconds if still provisioning
                setStatus("processing");
                setMessage("Provisioning your Stalwart cluster... this takes 3–5 minutes.");
                pollingRef.current = setTimeout(checkStatus, 10000);
            }
        } catch (err) {
            console.error("Status check failed", err);
            pollingRef.current = setTimeout(checkStatus, 10000);
        }
    }, [paymentIntentId]);

    useEffect(() => {
        // 1. Immediate URL Validation
        if (!paymentIntentId) {
            setStatus("error");
            setMessage("No payment information found. If you just paid, please check your email.");
            return;
        }

        // 2. Instant Stripe status check (Bypasses initial API delay)
        if (redirectStatus === "succeeded") {
            setStatus("processing");
            setMessage("Payment confirmed! Now spinning up your private server...");
        }

        checkStatus();

        // Cleanup polling on unmount
        return () => {
            if (pollingRef.current) clearTimeout(pollingRef.current);
        };
    }, [paymentIntentId, redirectStatus, checkStatus]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-slate-100"
            >
                {/* Loading / Provisioning State */}
                {(status === "loading" || status === "processing") && (
                    <>
                        <div className="relative w-20 h-20 mx-auto mb-8">
                            <Loader2 className="w-full h-full text-blue-600 animate-spin absolute top-0 left-0" />
                            <Server className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">
                            {status === "loading" ? "Verifying Payment" : "Building Your Server"}
                        </h2>
                        <p className="text-slate-500 font-medium px-4">{message}</p>

                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                Tracking ID: {paymentIntentId?.slice(-8)}
                            </p>
                        </div>
                    </>
                )}

                {/* Success State */}
                {status === "success" && (
                    <>
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">System Online.</h2>
                        <p className="text-slate-500 mb-8 font-medium px-2">
                            Deployment complete. Your sovereign Stalwart instance is firewalled and ready for use.
                        </p>
                        <AuthButton
                            onClick={() => router.push("/account")}
                            icon={ArrowRight}
                            variant="secondary"
                            className="w-full py-4"
                        >
                            Enter Dashboard
                        </AuthButton>
                    </>
                )}

                {/* Error State */}
                {status === "error" && (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Loader2 className="w-10 h-10 opacity-20" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Sync Interrupted</h2>
                        <p className="text-slate-500 mb-8 px-4 leading-relaxed">{message}</p>
                        <AuthButton
                            onClick={() => router.push("/onboarding")}
                            variant="secondary"
                            className="w-full"
                        >
                            Back to Onboarding
                        </AuthButton>
                    </div>
                )}
            </motion.div>
        </div>
    );
}