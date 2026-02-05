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
  
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const cookieBase = `path=/; SameSite=Lax; Secure`; 
    let domain = "";
    if (!isLocal) {
      if (hostname.includes("falconmail.online")) {
        domain = "; domain=.falconmail.online";
      } else if (hostname.includes("iluvmypearls.org")) {
        domain = "; domain=.iluvmypearls.org";
      }
    }
    const cookieConfig = `${cookieBase}${domain}`;

    document.cookie = `auth_token=${token}; ${cookieConfig}`;
    document.cookie = `user_role=${userData.role}; ${cookieConfig}`;
    document.cookie = `onboarding_completed=${String(userData.onboarding_completed)}; ${cookieConfig}`;

    if (userData.role === "superadmin") {
      window.location.href = "/admin/dashboard";
    } else if (userData.role === "admin") {
      window.location.href = userData.onboarding_completed
        ? "/account"
        : "/account/onboarding";
    } else {
      window.location.href = "/mail/inbox";
    }
  };

 const logout = async () => {
  try {
    await authApi.logout().catch(() => {});
  } finally {
    clearAuth();

    localStorage.removeItem("auth-storage"); 
    localStorage.clear();  

    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    
    let domainAttr = "";
    if (!isLocal) {
      if (hostname.includes("falconmail.online")) {
        domainAttr = "domain=.falconmail.online;";
      } else if (hostname.includes("iluvmypearls.org")) {
        domainAttr = "domain=.iluvmypearls.org;";
      }
    }

    const cookiesToClear = ["auth_token", "user_role", "onboarding_completed"];
    const expireString = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; ${expireString} ${domainAttr}`;
      document.cookie = `${name}=; ${expireString}`;
    });

    window.location.href = "/";
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
