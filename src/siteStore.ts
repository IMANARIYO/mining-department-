import { create } from "zustand";
import { getSites } from "@/services/siteService";
import { type Site } from "./types/site";



interface SiteStore {
  mineSites: Site[];
  loading: boolean;
  fetchSitesData: () => Promise<void>;
}

export const useSiteStore = create<SiteStore>((set) => ({
  mineSites: [],
  loading: true,

  fetchSitesData: async () => {
    set({ loading: true });
    try {
      const response = await getSites();
      set({ mineSites: response.data || [] });
    } catch (error) {
      console.error("Error fetching sites:", error);
    } finally {
      set({ loading: false });
    }
  }
}));
