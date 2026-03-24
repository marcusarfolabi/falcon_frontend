"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Loader2,
  Key,
  Mail,
  User,
  RefreshCw,
  Copy,
  Check,
  Shield,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/common/Modal";
import { addMailBox, CreateMailboxPayload } from "@/lib/api/mailboxes";
import { toast } from "react-hot-toast";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import { listOrgDomains } from "@/lib/api/domain";
import { OrgDomain } from "@/types/domain";
import {
  Listbox,
  ListboxButton,
  Transition,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  domainName: string;
  domainId: number | string;
}

export function AddMailboxModal({
  isOpen,
  onClose,
  onSuccess,
  domainName,
  domainId,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [domains, setDomains] = useState<OrgDomain[]>([]);
  const { copied, generatePassword, copyToClipboard } = usePasswordGenerator();

  // 1. Unified Selection State
  const [selectedDomain, setSelectedDomain] = useState({
    id: domainId,
    name: domainName,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateMailboxPayload>({
    mode: "onChange", // Validate as they type
    defaultValues: {
      domain_id: domainId,
      alternative_email: "",
      display_name: "",
      address: "",
      password: "",
    },
  });

  // 2. Fetch & Sync Logic
  useEffect(() => {
    if (isOpen) {
      listOrgDomains()
        .then((res: any) => {
          const domainList = Array.isArray(res) ? res : res.data || [];
          setDomains(domainList);

          // Ensure we find the domain even if types differ (string vs number)
          const current = domainList.find(
            (d: OrgDomain) => String(d.id) === String(domainId),
          );
          if (current) {
            const syncData = { id: current.id, name: current.domain_name };
            setSelectedDomain(syncData);
            setValue("domain_id", current.id, { shouldValidate: true });
          }
        })
        .catch(() => toast.error("Failed to load domains"));
    }
  }, [isOpen, domainId, setValue]);

  const currentPassword = watch("password");

  const onDomainChange = (selection: { id: number | string; name: string }) => {
    setSelectedDomain(selection);
    setValue("domain_id", selection.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleGenerate = () => {
    const newPass = generatePassword(16);
    setValue("password", newPass, { shouldValidate: true, shouldDirty: true });
    toast.success("Strong password generated");
  };

  // 3. Robust Submit Handler
  const onSubmit = async (data: CreateMailboxPayload) => {
    // Final safety check on domain_id
    if (!data.domain_id) {
      toast.error("Please select a domain");
      return;
    }

    setIsSubmitting(true);
    try {
      await addMailBox(data);
      toast.success("Mailbox provisioned successfully!");
      reset();
      onSuccess();
      onClose();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create mailbox";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Provision New Mailbox"
      subtitle={`Configure account for ${selectedDomain.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
        {/* Hidden Input with explicit registration */}
        <input
          type="hidden"
          {...register("domain_id", { required: "Domain is required" })}
        />

        {/* Global Error Alert (Production helper: shows if any validation fails) */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-[11px] font-bold">
              Please correct the highlighted fields below.
            </p>
          </div>
        )}

        {/* Staff Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
            Staff Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              {...register("display_name", { required: "Name is required" })}
              className={`w-full input  border ${errors.display_name ? "border-red-300" : "border-slate-100"} rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="e.g. Sarah Connor"
            />
          </div>
          {errors.display_name && (
            <p className="text-red-500 text-[10px] font-bold ml-1">
              {errors.display_name.message}
            </p>
          )}
        </div>

        {/* Email Address + Domain Picker */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
            Email Address
          </label>
          <div className="relative flex items-stretch">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register("address", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+$/,
                    message: "Invalid characters",
                  },
                })}
                className={`w-full input border ${errors.address ? "border-red-300" : "border-slate-100"} rounded-l-2xl py-3.5 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                placeholder="username"
              />
            </div>

            <div className="relative min-w-[150px]">
              <Listbox value={selectedDomain} onChange={onDomainChange}>
                <ListboxButton className="h-full w-full flex items-center justify-between gap-2 bg-slate-100 border border-l-0 border-slate-100 rounded-r-2xl px-4 text-sm font-black text-slate-600 hover:bg-slate-200 transition-colors">
                  <span className="truncate">@{selectedDomain.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </ListboxButton>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-white p-1 shadow-xl border border-slate-100 focus:outline-none">
                    {domains.map((domain) => (
                      <ListboxOption
                        key={domain.id}
                        value={{ id: domain.id, name: domain.domain_name }}
                        className={({ focus }) =>
                          `group flex w-full items-center gap-2 rounded-lg py-2.5 px-3 cursor-pointer transition-colors ${focus ? "bg-blue-50 text-blue-700" : "text-slate-700"}`
                        }
                      >
                        <span className="text-xs font-bold">
                          @{domain.domain_name}
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </Listbox>
            </div>
          </div>
          {errors.address && (
            <p className="text-red-500 text-[10px] font-bold ml-1">
              {errors.address.message}
            </p>
          )}
        </div>
        {/* Recovery Email */}

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
            Recovery Email (Optional)
          </label>

          <div className="relative">
            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              {...register("alternative_email")}
              type="email"
              placeholder="personal@gmail.com"
              className="w-full input border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Access Password
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => copyToClipboard(currentPassword)}
                disabled={!currentPassword}
                className="text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-opacity disabled:opacity-30"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? (
                  <span className="text-emerald-500">Copied</span>
                ) : (
                  "Copy"
                )}
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Generate
              </button>
            </div>
          </div>
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
              type="text"
              className={`w-full input border ${errors.password ? "border-red-300" : "border-slate-100"} rounded-2xl py-3.5 pl-11 pr-4 text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="••••••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-[10px] font-bold ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 cursor-pointer text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Plus className="w-4 h-4" /> Provision Mailbox
            </>
          )}
        </button>
      </form>
    </Modal>
  );
}
