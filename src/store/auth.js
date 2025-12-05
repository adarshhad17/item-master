import { create } from "zustand";

export const useAuth = create((set) => ({
  token: localStorage.getItem("token"),  // 👈 FIXED
  user: null,

  login: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
