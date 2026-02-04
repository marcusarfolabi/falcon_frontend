// (auth)/layout.tsx
import { motion } from 'framer-motion';
import { Bird, ShieldCheck, Zap } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showProgress?: boolean;
  currentStep?: number; // Added
  totalSteps?: number;   // Added
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  showProgress = false,
  currentStep = 1,
  totalSteps = 2
}: AuthLayoutProps) => (
  <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 bg-[#edf1f4]">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex bg-blue-600 p-2.5 rounded-2xl mb-6 shadow-xl shadow-blue-200">
          <Bird className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{title}</h1>
        <p className="text-slate-500 font-medium px-4">{subtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentStep} 
        className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100"
      >
        {showProgress && (
          <div className="flex gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${index + 1 <= currentStep ? 'bg-blue-600' : 'bg-slate-100'
                  }`}
              />
            ))}
          </div>
        )}
        {children}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-900" />
          <span className="text-[10px] font-black uppercase tracking-tighter text-blue-950">AES-256 Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-slate-900" />
          <span className="text-[10px] font-black uppercase tracking-tighter text-blue-950">Stalwart Engine</span>
        </div>
      </div>
    </div>
  </div>
);