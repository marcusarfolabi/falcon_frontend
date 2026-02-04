"use client";

interface StepProgressProps {
    currentStep: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
    const steps = [
        'Domain',
        'TXT Checker',
        'Pricing',
        'Admin',
        'Payment',
        'Deploy'
    ];

    return (
        <div className="mb-12">
            {/* Horizontal Progress Bars */}
            <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ease-out ${currentStep >= i ? 'bg-blue-600' : 'bg-slate-100'
                            }`}
                    />
                ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between px-1">
                {steps.map((label, i) => {
                    const stepNumber = i + 1;
                    return (
                        <span
                            key={i}
                            className={`text-[10px] font-bold tracking-tighter transition-all duration-300 ${currentStep === stepNumber
                                    ? 'opacity-100 text-blue-600 translate-y-0'
                                    : currentStep > stepNumber
                                        ? 'opacity-0' // Hide labels for completed steps as per your original logic
                                        : 'opacity-40 text-slate-900'
                                }`}
                        >
                            {label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}