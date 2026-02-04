"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import AuthButton from '../components/AuthButton';
import { authApi } from '@/lib/api/auth';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function VerifyOTP() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const isVerifying = useRef(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [resending, setResending] = useState(false);

    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // Timer logic remains the same...
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    // Reusable verification function (memoized to prevent recreation)
    const triggerVerification = useCallback(async (finalOtp: string[]) => {
        const fullCode = finalOtp.join('');

        if (fullCode.length !== 6 || isVerifying.current) return;

        isVerifying.current = true;
        setLoading(true);

        try {
            const email = localStorage.getItem('pending_verification_email') || "";
            await authApi.verifyOtp(email, fullCode);

            toast.success("Identity confirmed.");
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('type') === 'password_reset') {
                router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            } else {
                router.push(isAuthenticated ? '/dashboard' : '/login?redirect=/pricing');
            }
        } catch (err) {
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
            isVerifying.current = false;
        } finally {
            setLoading(false);
        }
    }, [router, isAuthenticated]); 

    // SMART FEATURE: Auto-submit
    useEffect(() => {
        const isFilled = otp.every(digit => digit !== '');
        if (isFilled && !isVerifying.current) {
            triggerVerification(otp);
        }
    }, [otp, triggerVerification]);
    // SMART FEATURE: Auto-submit when 6th digit is entered
    useEffect(() => {
        const isFilled = otp.every(digit => digit !== '');
        if (isFilled) {
            triggerVerification(otp);
        }
    }, [otp, triggerVerification]);

    const handleResend = async () => {
        if (!canResend) return;
        setResending(true);
        try {
            const email = localStorage.getItem('pending_verification_email') || "";
            await authApi.requestOtp(email);
            setTimer(60);
            setCanResend(false);
            toast.success("New code sent.");
        } finally {
            setResending(false);
        }
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        if (value.length > 1) value = value.slice(-1);

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');

        if (digits.length > 0) {
            const newOtp = ['', '', '', '', '', ''];
            digits.forEach((digit, i) => { newOtp[i] = digit; });
            setOtp(newOtp);
        }
    };

    return (
        <AuthLayout
            title="Verify Identity"
            subtitle="Enter the 6-digit code sent to your email."
        >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={(el) => { inputRefs.current[idx] = el; }}
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            disabled={loading}
                            maxLength={1}
                            value={digit}
                            onPaste={handlePaste}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            className={`w-11 h-14 md:w-14 md:h-16 text-center text-2xl font-black rounded-xl border-2 transition-all outline-none 
                                ${loading ? 'bg-slate-50 border-slate-100 text-slate-400' : 'bg-slate-200 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 text-slate-700'}`}
                        />
                    ))}
                </div>

                <AuthButton
                    type="button"
                    onClick={() => triggerVerification(otp)}
                    isLoading={loading}
                    icon={ArrowRight}
                    variant="secondary"
                    disabled={otp.some(d => d === '')}
                >
                    {loading ? 'Verifying...' : 'Verify Code'}
                </AuthButton>

                <p className="text-center text-xs text-slate-400 font-bold">
                    Didn't receive the code?
                    {canResend ? (
                        <button type="button" onClick={handleResend} disabled={resending} className="text-blue-600 underline ml-1">
                            {resending ? 'Sending...' : 'Resend'}
                        </button>
                    ) : (
                        <span className="text-slate-300 ml-1">Resend in <span className="text-blue-500">{timer}s</span></span>
                    )}
                </p>
            </form>
        </AuthLayout>
    );
}