import { create } from "zustand";

export const useAuth = create((set) => ({
  token: sessionStorage.getItem("token"), // read token only for this tab
  user: null,

  login: (token) => {
    sessionStorage.setItem("token", token); // store for this session only
    set({ token });
  },

  logout: () => {
    sessionStorage.removeItem("token"); // remove on logout
    set({ token: null, user: null });
  },
}));
