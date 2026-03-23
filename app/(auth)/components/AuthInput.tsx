"use client";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { useState, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
    rightAddon?: ReactNode;
}

// 1. Define a clear interface for the Strength object
interface PasswordStrength {
    score: number;
    label: string;
    color: string;
    text: string;
    missing: string[];
    checks: { id: string; label: string; met: boolean }[];
}

export const AuthInput = ({
    label,
    icon: Icon,
    type,
    rightAddon,
    className,
    value,
    ...props
}: AuthInputProps) => {
    const pathname = usePathname();
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isLoginRoute = pathname === "/login";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // 2. Updated Strength Logic with consistent return types
    const strength = useMemo((): PasswordStrength => {
        const val = String(value || "");

        // Define checks regardless of value presence
        const checks = [
            { id: 'len', label: '8+ chars', met: val.length >= 8 },
            { id: 'num', label: '1 number', met: /[0-9]/.test(val) },
            { id: 'spec', label: '1 symbol', met: /[^A-Za-z0-9]/.test(val) },
            { id: 'caps', label: '1 uppercase', met: /[A-Z]/.test(val) },
        ];

        if (!val) {
            return {
                score: 0,
                label: "Too Short",
                color: "bg-slate-200",
                text: "text-slate-400",
                missing: [],
                checks
            };
        }

        const score = checks.filter(c => c.met).length;
        const missing = checks.filter(c => !c.met).map(c => c.label);

        const configs: Record<number, { label: string; color: string; text: string }> = {
            1: { label: "Weak", color: "bg-red-500", text: "text-red-500" },
            2: { label: "Fair", color: "bg-orange-500", text: "text-orange-500" },
            3: { label: "Good", color: "bg-blue-500", text: "text-blue-500" },
            4: { label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" },
        };

        const config = configs[score] || { label: "Too Short", color: "bg-slate-300", text: "text-slate-400" };

        return { ...config, score, missing, checks };
    }, [value]);

    return (
        <div className="group">
            <div className="flex justify-between items-center mb-2 px-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors group-focus-within:text-blue-600">
                    {label}  <span className="text-red-500">*</span>
                </label>
                {isPassword && value && !isLoginRoute && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${strength.text}`}>
                        {strength.label}
                    </span>
                )}
            </div>

            <div className="relative">
                <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors pointer-events-none" />

                <input
                    {...props}
                    value={value}
                    type={inputType}
                    autoComplete={isPassword ? (isLoginRoute ? "current-password" : "new-password") : "off"}
                    className={`input pl-12 ${rightAddon ? "pr-40" : "pr-10"} focus:border-blue-600 ${className ?? ""}`}
                />

                {rightAddon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] sm:text-sm font-bold text-slate-400 pointer-events-none">
                        {rightAddon}
                    </div>
                )}

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-300 hover:text-blue-500 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>

            {isPassword && !isLoginRoute && (
                <div className="mt-3 px-2">
                    <div className="flex gap-1.5 h-1">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`h-full flex-1 rounded-full transition-all duration-500 ${strength.score >= step ? strength.color : "bg-slate-100"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                        {strength.checks.map((check) => (
                            <span
                                key={check.id}
                                className={`text-[9px] font-bold transition-colors ${check.met ? "text-emerald-500" : "text-slate-400"
                                    }`}
                            >
                                {check.met ? "✓" : "○"} {check.label}
                            </span>
                        ))}
                    </div>

                    {value && strength.score < 4 && (
                        <p className="text-[8px] text-red-400 mt-1 italic">
                            Missing: {strength.missing.join(", ")}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};