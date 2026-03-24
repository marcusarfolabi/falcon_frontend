"use client";
import React, { useEffect, useState, Fragment } from "react";
import {
  Users,
  Plus,
  Mail,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  Zap,
  Loader2,
  Trash,
  ShieldAlert,
} from "lucide-react";
import { getMailboxOverview } from "@/lib/api/mailboxes";
import {
  Menu,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Modal } from "@/components/common/Modal";
import { AddMailboxModal } from "./components/AddMailboxModal";

export default function MailboxPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 100;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<
    "sync" | "config" | "aliases" | "status" | "delete" | null
  >(null);
  const [selectedBox, setSelectedBox] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const openTool = (
    box: any,
    view: "sync" | "config" | "aliases" | "status" | "delete" | null,
  ) => {
    setSelectedBox(box);
    setActiveView(view);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    let isMounted = true;

    const fetchMailboxes = async () => {
      try {
        setLoading(true);
        const res = await getMailboxOverview(LIMIT, offset);

        if (isMounted) {
          console.log("Stalwart API Data:", res);
          setData(res);
        }
      } catch (err) {
        console.error("API Fetch Failed:", err);
      } finally {
        if (isMounted) {
          setLoading(true); 
          setLoading(false);
        }
      }
    };

    fetchMailboxes();

    return () => {
      isMounted = false;
    };
  }, [offset]);

  const refreshData = () => {
    setLoading(true);
    getMailboxOverview(LIMIT, offset)
      .then(setData)
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    refreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium font-mono">
          Accessing Mail Servers...
        </p>
      </div>
    );
  }

  const {
    inventory = {},
    mailboxes = [],
    pagination = { total: 0, has_more: false }
  } = data ?? {};
  console.log(mailboxes)
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-4xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded inline-block mb-4">
                Seat Utilization
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-slate-900 tracking-tighter">
                  {inventory.used_seats}
                </span>
                <span className="text-2xl font-bold text-slate-300">
                  / {inventory.max_seats}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium mt-2">
                Currently managing{" "}
                <span className="text-slate-900 font-bold">
                  {inventory.domain_name}
                </span>
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs bg-emerald-50 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4" /> VERIFIED
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                style={{ width: `${inventory.utilization_percent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <span>{inventory.remaining_seats} Seats Available</span>
              <span>{inventory.utilization_percent}% Capacity</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-4xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <Zap className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold mb-2">Provision User</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ready to expand? Create a new mailbox for {inventory.domain_name}{" "}
              instantly.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            disabled={inventory.remaining_seats === 0}
            className="relative cursor-pointer z-10 mt-6 w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {inventory.remaining_seats > 0 ? (
              <span className="flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Mailbox
              </span>
            ) : (
              "Plan Limit Reached"
            )}
          </button>
          <Users className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12" />
        </div>
      </div>

      {/* --- BOX LIST --- */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3 ml-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <h3 className="font-bold text-slate-900 text-sm">
              Active Directories
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-slate-500 tabular-nums">
              {offset + 1}-{Math.min(offset + LIMIT, pagination.total)} of{" "}
              {pagination.total}
            </span>
            <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => setOffset((prev) => Math.max(0, prev - LIMIT))}
                disabled={offset === 0 || loading}
                className="p-2 hover:bg-slate-50 disabled:opacity-20 transition-colors border-r border-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOffset((prev) => prev + LIMIT)}
                disabled={!pagination.has_more || loading}
                className="p-2 hover:bg-slate-50 disabled:opacity-20 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 sticky top-0 z-20">
              <tr>
                <th className="px-8 py-4">Identity</th>
                <th className="px-6 py-4">Disk Usage</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Assigned On</th>
                <th className="px-8 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mailboxes.map((box: any) => (
                <tr
                  key={box.id}
                  className="group hover:bg-blue-50/20 transition-all"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                        {box.display_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">
                          {box.display_name}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400 font-mono tracking-tighter">
                          {box.address}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-32 space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                        <span>{box.storage.used} MB Used</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-900 transition-all duration-500"
                          style={{
                            width: `${Math.max(box.storage.percent, 2)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                      {box.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-500">
                      {box.created_at}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-right relative z-50">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="p-2 cursor-pointer bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all focus:outline-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 top-full mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-100">
                          {" "}
                          <div className="p-1">
                            {/* NEW: Aliases - Stalwart allows multiple addresses for one mailbox */}
                            {/* <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => openTool(box, "aliases")}
                                  className={`${active ? "bg-slate-100" : ""} group flex w-full items-center rounded-xl px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700`}
                                >
                                  <Users className="mr-3 h-4 w-4 text-indigo-600" />
                                  Manage Aliases
                                </button>
                              )}
                            </MenuItem> */}

                            {/* NEW: Account Status - Stalwart supports Suspend/Active */}
                            {/* <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => openTool(box, "status")}
                                  className={`${active ? "bg-slate-100" : ""} group flex w-full items-center rounded-xl px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700`}
                                >
                                  <ShieldAlert className="mr-3 h-4 w-4 text-amber-500" />
                                  Suspend Account
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => openTool(box, "delete")}
                                  className={`${active ? "bg-red-50 text-red-600" : "text-red-500"} group flex w-full items-center rounded-xl px-3 py-3 text-[10px] font-black uppercase tracking-wider`}
                                >
                                  <Trash className="mr-3 h-4 w-4" />
                                  Remove Staff
                                </button>
                              )}
                            </MenuItem> */}

                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => openTool(box, "config")}
                                  className={`${active ? "bg-slate-100" : ""} group flex w-full items-center rounded-xl px-3 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700`}
                                >
                                  <ShieldCheck className="mr-3 h-4 w-4 text-slate-400" />
                                  Server Config
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          activeView === "sync"
            ? "Device Sync"
            : activeView === "config"
              ? "Server Config"
              : "Confirm Delete"
        }
        subtitle={selectedBox?.address}
        footer={
          activeView === "delete" ? (
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 text-xs font-black uppercase bg-slate-100 rounded-2xl"
              >
                Cancel
              </button>
              <button
                // onClick={confirmDeleteAction}
                className="flex-1 py-4 text-xs font-black uppercase bg-red-600 text-white rounded-2xl"
              >
                Delete
              </button>
            </div>
          ) : null
        }
      >
        {/* Content Logic */}
        {activeView === "delete" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-slate-600">
              Are you sure? This will permanently delete the mailbox and all
              stored emails for this staff member.
            </p>
          </div>
        )}
        {activeView === "config" && (
          <div className="space-y-3">
            {[
              {
                label: "Incoming IMAP",
                val: `imap.${inventory.domain_name}`,
                port: "993",
              },
              {
                label: "Outgoing SMTP",
                val: `smtp.${inventory.domain_name}`,
                port: "465",
              },
              {
                label: "Login User",
                val: selectedBox?.address,
                port: "SSL",
              },
              {
                label: "Login Password",
                val: selectedBox?.password,
                port: "Password",
                isPassword: true,
              },
            ].map((row, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors"
              >
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {row.label}
                </p>
                <div className="flex justify-between items-center">
                  <code className="text-xs font-bold text-slate-900 truncate mr-2">
                    {row.isPassword
                      ? showPassword
                        ? row.val
                        : "••••••••••••"
                      : row.val}
                  </code>

                  <div className="flex items-center gap-2">
                    {row.isPassword && (
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
                        type="button"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9.88 9.88L14.12 14.12" />
                            <path d="M2 2L22 22" />
                            <path d="M10.37 4.37A11 11 0 0 1 22 12a10.91 10.91 0 0 1-2.9 4.5" />
                            <path d="M14 18a11 11 0 0 1-12-6 10.91 10.91 0 0 1 2.9-4.5" />
                            <path d="M12 8a2 2 0 0 1 2 2" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    )}
                    <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {row.port}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeView === "aliases" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-medium">
              Extra addresses pointing to this mailbox:
            </p>
            <div className="flex flex-wrap gap-2">
              {["support@", "billing@"].map((alias) => (
                <span
                  key={alias}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold border border-indigo-100"
                >
                  {alias}
                  {inventory.domain_name}
                </span>
              ))}
              <button className="px-3 py-1 border-2 border-dashed border-slate-200 text-slate-400 rounded-full text-[10px] font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                + Add Alias
              </button>
            </div>
          </div>
        )}{" "}
        {activeView === "status" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900">Suspend Access?</h4>
            <p className="text-xs text-slate-500 mt-2 px-6">
              The staff member will be unable to send or receive emails, but
              their existing data will be preserved.
            </p>
          </div>
        )}{" "}
      </Modal>
      {/* 4. Add the Modal component at the bottom of the JSX */}
      <AddMailboxModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refreshData}
        domainName={inventory.domain_name}
        domainId={inventory.domain_id} // Ensure your API returns this in the inventory object
      />
    </div>
  );
}
