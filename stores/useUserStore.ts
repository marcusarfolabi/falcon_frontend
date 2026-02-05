import { User } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  user: User | null;
  _hasHydrated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      _hasHydrated: false,

      setAuth: (token, user) => set({ token, user }),

      clearAuth: () => {
        // 1. Reset the Zustand State
        set({ token: null, user: null });

        // 2. Clear Cookies with Domain Awareness
        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;
          const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
          
          // Determine the domain suffix
          let domainAttr = "";
          if (!isLocal) {
            if (hostname.includes("falconmail.online")) domainAttr = "; domain=.falconmail.online";
            else if (hostname.includes("iluvmypearls.org")) domainAttr = "; domain=.iluvmypearls.org";
          }

          const expireBase = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          const cookieNames = ["auth_token", "user_role", "onboarding_completed"];

          cookieNames.forEach((name) => {
            // Wipe with domain AND without (to be safe)
            document.cookie = `${name}=; ${expireBase}${domainAttr}`;
            document.cookie = `${name}=; ${expireBase}`;
          });

          // 3. Clear Storage 
          sessionStorage.clear();
        }
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      updateUser: (userUpdate) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userUpdate } : (userUpdate as User),
        })),
    }),
    {
      name: "auth-storage", // Changed from "auth_token" to avoid name collision with the cookie
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);