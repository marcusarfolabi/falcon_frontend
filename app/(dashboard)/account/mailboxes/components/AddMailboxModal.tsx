"use client";
import { useEffect, useState } from "react";
import {
  Plus, 
  Key,
  Mail,
  User,
  RefreshCw,
  Copy,
  Check,
  Shield, 
  AlertCircle,
  Globe,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/common/Modal";
import { addMailBox, CreateMailboxPayload } from "@/lib/api/mailboxes";
import { toast } from "react-hot-toast";
import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import { listOrgDomains } from "@/lib/api/domain";
import { OrgDomain } from "@/types/domain"; 
import { AuthInput } from "@/app/(auth)/components/AuthInput";
import AuthButton from "@/app/(auth)/components/AuthButton";
import { AuthSelect } from "@/app/(auth)/components/AuthSelect";

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
    mode: "onChange", 
    defaultValues: {
      domain_id: domainId,
      alternative_email: "",
      display_name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      listOrgDomains()
        .then((res: any) => {
          const domainList = res?.domains || [];
          setDomains(domainList);
          console.log(domainList)

          const current = domainList.find(
            (d: OrgDomain) => String(d.id) === String(domainId),
          );

          if (current) {
            const syncData = { id: current.id, name: current.domain_name };
            setSelectedDomain(syncData);
            setValue("domain_id", current.id, { shouldValidate: true });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load domains");
        });
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

  const onSubmit = async (data: CreateMailboxPayload) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        <input type="hidden" {...register("domain_id", { required: true })} />

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="text-[11px] font-bold">Please correct the highlighted fields below.</p>
          </div>
        )}

        <div className="space-y-1">
          <AuthInput
            label="Staff Name"
            icon={User}
            placeholder="e.g. Kayode Abraham"
            {...register("display_name", { required: "Name is required" })}
            className={errors.display_name ? "border-red-300" : "border-slate-100"}
          />
          {errors.display_name && (
            <p className="text-red-500 text-[10px] font-bold ml-2">{errors.display_name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-end">
            <div className="flex-3">
              <AuthInput
                label="Email Address"
                icon={Mail}
                placeholder="username"
                {...register("email", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+$/,
                    message: "No spaces or special characters allowed"
                  },
                })}
                className={`rounded-r-none border-r-0 ${errors.email ? "border-red-300" : "border-slate-100"}`}
              />
            </div>

            <div className="flex-1 min-w-50">
              <AuthSelect
                label="" 
                icon={Globe}
                value={`@${selectedDomain.name}`}
                options={domains.map((d) => `@${d.domain_name}`)}
                onChange={(val) => {
                  const pureName = val.replace("@", "");
                  const domain = domains.find((d) => d.domain_name === pureName);
                  if (domain && domain.id !== undefined) {
                    onDomainChange({
                      id: domain.id,
                      name: domain.domain_name
                    });
                  }
                }}
              />
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold ml-2">{errors.email.message}</p>
          )}
        </div>

        <AuthInput
          label="Recovery Email (Optional)"
          icon={Shield}
          type="email"
          placeholder="personal@gmail.com"
          {...register("alternative_email")}
        />

        <div className="space-y-1">
          <div className="relative">
            <div className="absolute right-18 top-0 flex items-center gap-1 z-10">
              <button
                type="button"
                aria-label="copy password"
                onClick={() => copyToClipboard(watch("password"))}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                title="Copy password"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                aria-label="generate password"
                onClick={handleGenerate}
                className="text-blue-500 hover:text-blue-700 transition-colors p-1 border-l border-slate-100 pl-3"
                title="Generate secure password"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <AuthInput
              label="Access Password"
              icon={Key}
              type="password"
              value={watch("password")}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-[10px] font-bold ml-2 -mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <AuthButton
            type="submit"
            isLoading={isSubmitting}
            variant="secondary"
            icon={Plus}
          >
            Provision Mailbox
          </AuthButton>
        </div>
      </form>
    </Modal>
  );
}
