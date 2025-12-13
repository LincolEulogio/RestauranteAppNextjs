import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface WaiterAuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useWaiterAuthStore = create<WaiterAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "waiter-auth-storage-v2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/*
 * Helper to ensure we only render when store is hydrated.
 * This prevents the flickering/redirect issue on reload.
 */
export const useWaiterAuthStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinish = useWaiterAuthStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    setHydrated(useWaiterAuthStore.persist.hasHydrated());
    return () => unsubFinish();
  }, []);

  return hydrated;
};
