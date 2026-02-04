"use client";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/user"; 
import { useAuthStore } from "@/stores/useUserStore";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 1. Hook into Zustand store
  const { user, setAuth, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // const login = async (credentials: any) => {
  //     const res = await authApi.login(credentials);
  //     const { user: userData, token } = res.data;

  //     // 1. Set Zustand first
  //     setAuth(token, userData);

  //     // 2. Set Cookies manually for the Middleware
  //     const cookieConfig = "path=/; SameSite=Lax; Secure";
  //     document.cookie = `auth_token=${token}; ${cookieConfig}`;
  //     document.cookie = `onboarding_completed=${userData?.onboarding_completed}; ${cookieConfig}`;

  //     // 3. Navigation
  //     const hasDomain = userData.organization?.domains?.length > 0;
  //     const isDone = hasDomain && userData.onboarding_completed;

  //     if (!isDone) {
  //         router.push('/account/onboarding');
  //     } else {
  //         router.push('/account');
  //     }
  // };

  const login = async (credentials: any) => {
    const res = await authApi.login(credentials);
    const { user: userData, token } = res.data;

    setAuth(token, userData);

    const cookieConfig =
      "path=/; SameSite=Lax; Secure; domain=.falconmail.online";
    document.cookie = `auth_token=${token}; ${cookieConfig}`;
    document.cookie = `user_role=${userData.role}; ${cookieConfig}`; // Store the role for the middleware
    document.cookie = `onboarding_completed=${userData?.onboarding_completed}; ${cookieConfig}`;

    const isUser = userData.role === "user";
    const isAdmin = userData.role === "admin";
    const isSuperAdmin = userData.role === "superadmin";

    if (isUser) {
      window.location.href = "/inbox";
      // window.location.href = "https://app.falconmail.online/inbox";
    } else if (isAdmin) {
      router.push("/account");
    } else if (isSuperAdmin) {
      router.push("/admin/dashboard");
    }
  };

  const logout = async () => {
    try {
      await authApi.logout().catch(() => {});
      clearAuth();
      router.push("/");
    } finally {
      clearAuth();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
