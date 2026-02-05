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
  const { user, setAuth, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
 
 const login = async (credentials: any) => {
  const res = await authApi.login(credentials);
  const { user: userData, token } = res.data;

  setAuth(token, userData);

  // If we are on localhost, don't set the domain attribute or it will fail
  const isLocal = window.location.hostname === "localhost";
  const cookieBase = `path=/; SameSite=Lax; Secure`;
  const domain = isLocal ? "" : "; domain=.falconmail.online";
  const cookieConfig = `${cookieBase}${domain}`;


  document.cookie = `auth_token=${token}; ${cookieConfig}`;
  document.cookie = `user_role=${userData.role}; ${cookieConfig}`; 
  document.cookie = `onboarding_completed=${String(userData.onboarding_completed)}; ${cookieConfig}`;

  if (userData.role === "superadmin") {
    window.location.href = "/admin/dashboard";
  } else if (userData.role === "admin") {
    window.location.href = userData.onboarding_completed ? "/account" : "/account/onboarding";
  } else {
    window.location.href = "/mailer/inbox";
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
