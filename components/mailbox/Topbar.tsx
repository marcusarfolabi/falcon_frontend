"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Search,
  SlidersHorizontal,
  Settings,
  ShieldCheck,
  LogOut,
  X,
  Link,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleLogout = async () => {
    await logout();
    window.location.href = "https://falconmail.online";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Clear search logic
  const clearSearch = () => {
    setQuery("");
    if (searchParams.has("q")) {
      router.push("/inbox");
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-2 md:gap-4">
      <div className="flex-1 max-w-3xl">
        <form
          onSubmit={handleSearch}
          className="relative group flex items-center"
        >
          <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Search size={20} />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mail"
            className="w-full bg-slate-100/80 border border-transparent rounded-2xl pl-12 pr-12 py-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500/50 transition-all outline-none shadow-sm group-hover:bg-slate-200/50 group-focus-within:shadow-md"
          />

          <div className="absolute right-3 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors hidden sm:block"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-1 lg:gap-3">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="ml-2 outline-none group">
            <div className="w-9 h-9 rounded-full cursor-pointer bg-slate-900 flex  bg-linear-to-tr text-slate-100 items-center justify-center font-bold text-md  transition-all">
              {user?.name?.charAt(0) || "F"}
            </div>
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-3 w-72 origin-top-right rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50 p-2 border border-slate-100">
              <div className="px-4 py-4 text-center border-b border-slate-50">
                <div className="w-14 h-14 rounded-full bg-slate-900 mx-auto mb-3 flex  bg-linear-to-tr text-slate-100 items-center justify-center font-bold text-2xl  transition-all">
                  {user?.name?.charAt(0)}
                </div>
                <p className="text-base font-bold text-slate-900">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.email || "moureen@falconmail.online"}
                </p>
                <button className="mt-4 px-4 py-1.5 border border-slate-200 rounded-full text-xs cursor-pointer font-semibold hover:bg-slate-50 transition-colors">
                  Manage Account
                </button>
              </div>

              <div className="py-2">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/settings/security"
                      className={`${
                        active ? "bg-slate-50 text-blue-600" : "text-slate-700"
                      } cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors`}
                    >
                      <ShieldCheck size={18} />
                      Security & Privacy
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href="/settings"
                      className={`${
                        active ? "bg-slate-50 text-blue-600" : "text-slate-700"
                      } cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors`}
                    >
                      <Settings size={18} />
                      Mail Settings
                    </Link>
                  )}
                </MenuItem>
              </div>

              <div className="pt-2 border-t border-slate-50">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${active ? "bg-red-50 text-red-600" : "text-slate-700"} cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors`}
                    >
                      <LogOut size={18} />
                      Sign out of FalconMail
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
