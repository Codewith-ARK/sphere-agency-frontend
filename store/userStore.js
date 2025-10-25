import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import axiosClient from "@/lib/axiosClient";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null, // { id, name, email, ... }
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      login: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.post(`/user/login/`, data);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return response;
        } catch (err) {
          set({
            error: err,
            loading: false,
          });
          return err;
        }
      },

      logout: () => {
        // Optionally call your API to invalidate the token
        // await axios.post(`${API_BASE_URL}/auth/logout`, {}, { headers: { Authorization: `Bearer ${get().token}` } });
        try {
          set({ user: null, token: null, isAuthenticated: false });
          return true;
        } catch (err) {
          return false;
        }
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: "user-storage", // key in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
