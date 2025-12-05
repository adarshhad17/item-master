import { create } from "zustand";

export const useAuth = create((set) => ({
  token: sessionStorage.getItem("token"), 
  user: null,

  login: (token) => {
    sessionStorage.setItem("token", token); 
    set({ token });
  },

  logout: () => {
    sessionStorage.removeItem("token"); 
    set({ token: null, user: null });
  },
}));
