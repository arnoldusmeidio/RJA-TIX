import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => {
        // Check for the token in cookies instead of localStorage
        const token = Cookies.get("accessToken");
        if (token) {
          set({ isLoggedIn: true });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        // Clear the cookie
        Cookies.remove("accessToken");
      },
    }),
    {
      name: "userLoginStatus", // The name for the localStorage key
    }
  )
);

export default useAuthStore;
