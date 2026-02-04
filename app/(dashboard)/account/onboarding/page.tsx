"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// API Imports
import { checkDomain, preparePayment, verifyDomain } from '@/lib/api/subscription';
import { listPlans } from '@/lib/api/pricing';
import { profileApi } from '@/lib/api/profile';

// Types
import { Plan } from '@/types/plans';

// Sub-Components
import StepProgress from './components/StepProgress';
import DomainStep from './components/DomainStep';
import DNSVerifyStep from './components/DNSVerifyStep';
import PricingStep from './components/PricingStep';
import AdminStep from './components/AdminStep';
import PaymentStep from './components/PaymentStep';
import DeployStep from './components/DeployStep';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';


export default function OnboardingForm() {
    const router = useRouter();

    // --- STATE ---
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [isProvisioning, setIsProvisioning] = useState(false);
    const [isAutoChecking, setIsAutoChecking] = useState(false);

    const [verificationToken, setVerificationToken] = useState<string>();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [isLoadingPlans, setIsLoadingPlans] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        domain: user?.pending_domain ?? '',
        password: '',
        plan_id: '',
        alternative_email: '',
    });

    // --- EFFECTS ---
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await profileApi.getAuthUser();
                const userData = response.data;
                const domains = userData.organization?.domains || [];
                const pendingDomainName = userData.pending_domain;

                // 1. Find the specific domain object in the array
                const matchingDomain = domains.find(
                    (d: any) => d.domain_name === pendingDomainName
                );

                // 2. Extract the token if found
                if (matchingDomain) {
                    setVerificationToken(matchingDomain.dns_verification_token);

                    // Optional: Update formData with the domain name if it wasn't set
                    setFormData(prev => ({
                        ...prev,
                        domain: matchingDomain.domain_name
                    }));
                } else {
                    console.warn("No matching domain found for:", pendingDomainName);
                    toast.error("No matching domain found for:", pendingDomainName)
                }

            } catch (err) {
                console.error("Failed to fetch user data", err);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (step !== 3 || plans.length > 0) return;

        const fetchPlans = async () => {
            setIsLoadingPlans(true);
            try {
                const res = await listPlans();
                setPlans(res.data.plans);
            } catch (err) {
                setError("Failed to load pricing plans.");
            } finally {
                setIsLoadingPlans(false);
            }
        };
        fetchPlans();
    }, [step, plans.length]);

    // --- HANDLERS ---
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const validateDomain = async () => {
        setError("");
        let clean = formData.domain.toLowerCase().trim()
            .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

        setFormData(prev => ({ ...prev, domain: clean }));
        if (!clean) return setError("Please enter a domain name.");

        setIsValidating(true);
        try {
            const result = await checkDomain(clean);
            if (result.available) nextStep();
            else setError(result.hint);
        } catch (err) {
            setError("Technical check failed. Ensure domain is active.");
        } finally {
            setIsValidating(false);
        }
    };

    const handleVerifyDNS = async (isManual = true) => {
        setError("");
        setIsValidating(true);

        if (!verificationToken) {
            setError("Verification token not available.");
            setIsValidating(false);
            return;
        }

        try {
            const result = await verifyDomain(verificationToken);
            if (result.success) {
                setIsAutoChecking(false);
                nextStep();
            } else {
                if (isManual) setError("DNS record not found yet. Auto-checking enabled...");
                setIsAutoChecking(true);
                setTimeout(() => handleVerifyDNS(false), 60000);
            }
        } catch (err) {
            setIsAutoChecking(false);
            setError("Failed to verify DNS record.");
        } finally {
            setIsValidating(false);
        }
    };

    const initializePayment = async () => {
        setIsProvisioning(true);
        try {
            const data = await preparePayment(formData);
            // console.log(data);
            setClientSecret(data.clientSecret);
            nextStep();
        } catch (err) {
            setError("Failed to initialize secure payment.");
        } finally {
            setIsProvisioning(false);
        }
    };

    return (
        <div className="w-full mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 mt-24 mb-12 relative overflow-hidden">

            <StepProgress currentStep={step} />

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <DomainStep
                        domain={formData.domain}
                        error={error}
                        isValidating={isValidating}
                        setFormData={setFormData}
                        setError={setError}
                        onValidate={validateDomain}
                    />
                )}

                {step === 2 && (
                    <DNSVerifyStep
                        domain={formData.domain}
                        verificationToken={verificationToken}
                        isAutoChecking={isAutoChecking}
                        isValidating={isValidating}
                        onVerify={handleVerifyDNS}
                        prevStep={prevStep}
                    />
                )}

                {step === 3 && (
                    <PricingStep
                        plans={plans}
                        selectedPlanId={formData.plan_id}
                        billingCycle={billingCycle}
                        isLoading={isLoadingPlans}
                        setBillingCycle={setBillingCycle}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {step === 4 && (
                    <AdminStep
                        formData={formData}
                        isProvisioning={isProvisioning}
                        setFormData={setFormData}
                        prevStep={prevStep}
                        onInitializePayment={initializePayment}
                    />
                )}

                {step === 5 && (
                    <PaymentStep
                        clientSecret={clientSecret}
                        domain={formData.domain}
                        prevStep={prevStep}

                    />
                )}

                {step === 6 && (
                    <DeployStep domain={formData.domain} />
                )}
            </AnimatePresence>
        </div>
    );
}