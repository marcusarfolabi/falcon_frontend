"use client";
import { Fragment } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { Check, ChevronDown, LucideIcon } from 'lucide-react';

interface AuthSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    icon: LucideIcon;
    placeholder?: string;
    required?: boolean;
}

export function AuthSelect({
    label,
    value,
    onChange,
    options,
    icon: Icon,
    placeholder = "Select an option",
    required = false
}: AuthSelectProps) {
    return (
        <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors group-focus-within:text-blue-600">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <Listbox value={value} onChange={onChange}>
                <div className="relative">
                    <ListboxButton className="input relative w-full text-left focus:outline-none focus:ring-0">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                            <Icon className="h-4 w-4" />
                        </span>

                        <span className="block truncate">
                            {value ? (
                                <span className="text-slate-900">{value}</span>
                            ) : (
                                <span className="text-slate-400">{placeholder}</span>
                            )}
                        </span>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </span>
                    </ListboxButton>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <ListboxOptions className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-xl   focus:outline-none sm:text-sm">
                            {options.map((option, index) => (
                                <ListboxOption
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${active ? 'bg-blue-50 text-blue-900' : 'text-slate-700'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                                                {option}
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                    <Check className="h-4 w-4" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}