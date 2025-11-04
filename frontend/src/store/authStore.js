import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import API from "../services/api"

const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5000/api" : "/";

const useAuthStore = create((set, get) => ({
    authUser: null,
    profileData : null,
    loading: false,
    error: null,

    // Signup method
    signup: async (formData) => {
        set({ loading: true, error: null });
        try {
            const res = await API.post("/auth/signup", {
                fullName: formData.name,
                email: formData.email,
                password: formData.password,
                profilePic: formData.profilePic || null
            },
                { withCredentials: true }
            );

            console.log("is this run......");
            set({ authUser: res.data });
            toast.success("Account Created Successfully");

        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    // Login method
    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await API.post("/auth/login", { email, password }, { withCredentials: true });
            set({ authUser: res.data });

        } catch (err) {
            console.error(err);
            set({
                error:
                    err.response?.data?.message ||
                    "Login failed. Please try again later.",
            });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    // Logout method
    logout: async () => {
    try {
        await API.post(
            "/auth/logout",
            {}, // body
            { withCredentials: true } // send cookies
        );
        set({ authUser: null });
    } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
    }
},


    // Load user from localStorage on app init
    loadUser: async () => {
        set({ loading: true });
        try {
            const res = await API.get("/auth/check", { withCredentials: true });
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({ authUser: null });
        } finally {
            set({ loading: false });
        }
    },

    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const res = await API.get("/users/profile", {
                withCredentials: true, // if you use cookies for auth
            });

            set({ profileData: res.data, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || err.message, loading: false });
        }
    },

}));

export default useAuthStore;
