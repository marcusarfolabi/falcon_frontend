"use client";
import { Loader2, LucideIcon } from 'lucide-react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    icon?: LucideIcon;
    variant?: 'primary' | 'secondary';
}

export default function AuthButton({
    children,
    isLoading,
    icon: Icon,
    variant = 'primary',
    ...props
}: AuthButtonProps) {

    const variants = {
        primary: "bg-blue-600 shadow-blue-100 hover:bg-slate-900",
        secondary: "bg-slate-900 shadow-slate-200 hover:bg-blue-600"
    };

    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={`
        w-full py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm 
        flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer
        hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
        text-white ${variants[variant]} ${props.className || ''}
      `}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    {children}
                    {Icon && <Icon className="w-5 h-5" />}
                </>
            )}
        </button>
    );
}