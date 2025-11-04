import { create } from "zustand";
import axios from "axios";
import API from "../services/api";

const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5000/api" : "/";
 
const useReviewStore = create((set) => ({
  loading: false,
  error: null,

  // ✅ Delete a review by ID
  deleteReview: async (reviewId) => {
    try {
      set({ loading: true, error: null });

      await API.delete(`/reviews/delete-review/${reviewId}`, {
        withCredentials: true, // ensure JWT cookies are sent if you’re using auth
      });

      set({ loading: false });
      return true;
    } catch (error) {
      console.error("Error deleting review:", error);
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete review",
      });
      return false;
    }
  },

   updateReview: async (id, data) => {
    try {
      const res = await API.put(`/reviews/update-review/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error("Update error:", err);
    }
  },

}));

export default useReviewStore;
