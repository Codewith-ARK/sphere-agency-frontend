import { create } from "zustand";
import axiosClient from "@/utils/axiosClient";
import { toast } from "sonner";

export const useCampaignStore = create((set, get) => ({
  loading: false,
  error: null,
  campaignForm: {},
  financeData: null,
  contractData: null,

  campaignData: null,
  clientData: null,
  contractClauses: null,
  contractTask: null,
  contractFeedback: null,

  setCampaignForm: (form) => set({ campaignForm: form }),
  setFinanceData: (data) => set({ financeData: data }),
  setContractData: (data) => set({ contractData: data }),
  setCampaignData: (data) => set({ campaignData: data }),
  setClientData: (data) => set({ clientData: data }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      loading: false,
      error: null,
      campaignForm: {},
      financeData: null,
      contractData: null,
      campaignData: null,
      clientData: null,
      contractClauses: null,
      contractTask: null,
      contractFeedback: null,
    }),

  getQuote: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.post(
        "/api/clients/intake/predict/",
        formData
      );
      set({ financeData: data, campaignForm: formData });
      toast.success("Quote generated.");
      return data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Prediction failed";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return { success: false, error: err };
    } finally {
      set({ loading: false });
    }
  },

  submitCampaign: async () => {
    set({ loading: true, error: null });
    const { campaignForm, financeData, reset } = get();
    try {
      const { data } = await axiosClient.post("/api/clients/intake/", {
        campaignData: campaignForm,
        financeData,
      });
      toast.success("Campaign submitted.");
      return { success: true, data };
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Contract generation failed";
      set({ error: errorMsg });
      return { success: false, error: err };
    } finally {
      set({ loading: false });
      reset();
    }
  },

  // ⬇️ NEW GET METHODS

  fetchContractData: async (contractId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(
        `/api/contracts/${contractId}/get/`
      );
      set({ contractData: data.contract });
      return data;
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to fetch contract";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchCampaignData: async (campaignId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(
        `/api/clients/intake/${campaignId}/`
      );
      set({ campaignData: data.campaign });
      return data;
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to fetch campaign";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchContractClauses: async (contractId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(
        `/api/contracts/${contractId}/clauses/`
      );
      set({ contractClauses: data });
      return data;
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to fetch clauses";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchContractTasks: async (campaignId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(`/api/tasks/${campaignId}/get/`);
      set({ contractTask: data.tasks });
      console.log(data);
      return data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to fetch tasks";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchContractFeedback: async (contractId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(
        `/api/contracts/${contractId}/feedback/`
      );
      set({ contractFeedback: data });
      return data;
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Failed to fetch feedback";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchClientData: async (campaignId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosClient.get(`/api/clients/${campaignId}/`);
      set({ clientData: data });
      return data;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to fetch user";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  deleteCampaign: async (campaignId) => {
    set({ loading: true, err: null });
    try {
      const { data } = await axiosClient.delete(
        `/api/clients/intake/${campaignId}/delete/`
      );
      return { success: true, data };
    } catch (e) {
      const errorMsg =
        err?.response?.data?.message || "Failed to delete campaign";
      set({ error: errorMsg });
      toast.error("Error", { description: errorMsg });
      return { success: false, error: e };
    } finally {
      set({ loading: false });
    }
  },
}));
