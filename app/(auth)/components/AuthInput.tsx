"use client";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { useState, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation"; // 1. Import the hook

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
    rightAddon?: ReactNode;
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
    const pathname = usePathname(); // 2. Get the current route
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isLoginRoute = pathname === "/login"; // 3. Define the check
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // Password Strength Logic
    const strength = useMemo(() => {
        const val = String(value || "");
        if (!val) return { score: 0, label: "", color: "bg-slate-200" };

        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        switch (score) {
            case 1: return { score: 1, label: "Weak", color: "bg-red-500", text: "text-red-500" };
            case 2: return { score: 2, label: "Fair", color: "bg-orange-500", text: "text-orange-500" };
            case 3: return { score: 3, label: "Good", color: "bg-blue-500", text: "text-blue-500" };
            case 4: return { score: 4, label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" };
            default: return { score: 0, label: "Too Short", color: "bg-slate-300", text: "text-slate-400" };
        }
    }, [value]);

    return (
        <div className="group">
            <div className="flex justify-between items-center mb-2 px-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors group-focus-within:text-blue-600">
                    {label}  <span className="text-red-500">*</span>
                </label>
                {/* 4. Only show label if not on login route */}
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
                    // Disable "new-password" suggest on login
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

            {/* 5. Password Strength Meter - Hidden on Login Route */}
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
                    <p className="text-[9px] text-slate-400 mt-2 italic leading-relaxed">
                        Use 8+ characters with a mix of letters, numbers & symbols.
                    </p>
                </div>
            )}
        </div>
    );
};