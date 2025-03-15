
import axiosInstance from "@/lib/api";

const TUNNEL_ADVANCEMENT_API_URL = "/tunnel-advancements";

// Create Tunnel Advancement
export const createTunnelAdvancement = async (advancementData: {
  tunnelId: string;
  crosscutId?: string;
  lengthAdvanced: number;
  processType: string;
  faceVideoUrl?: string;
  gradePercentage: number;
  note?: string;
}) => {
  try {
    const response = await axiosInstance.post(
      TUNNEL_ADVANCEMENT_API_URL,
      advancementData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error creating tunnel advancement";
    throw { error: "Failed to create tunnel advancement", message: message };
  }
};

// Get all Tunnel Advancements
export const getTunnelAdvancements = async () => {
  try {
    const response = await axiosInstance.get(TUNNEL_ADVANCEMENT_API_URL);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error fetching tunnel advancements";
    throw { error: "Failed to fetch tunnel advancements", message: message };
  }
};

// Get Tunnel Advancement by ID
export const getTunnelAdvancementById = async (advancementId: string) => {
  try {
    const response = await axiosInstance.get(
      `${TUNNEL_ADVANCEMENT_API_URL}/${advancementId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error fetching tunnel advancement with ID: ${advancementId}`;
    throw { error: "Failed to fetch tunnel advancement", message: message };
  }
};

// Update Tunnel Advancement by ID
export const updateTunnelAdvancement = async (
  advancementId: string,
  advancementData: {
    crosscutId?: string;
    lengthAdvanced?: number;
    processType?: string;
    faceVideoUrl?: string;
    gradePercentage?: number;
    note?: string;
  }
) => {
  try {
    const response = await axiosInstance.patch(
      `${TUNNEL_ADVANCEMENT_API_URL}/${advancementId}`,
      advancementData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error updating tunnel advancement with ID: ${advancementId}`;
    throw { error: "Failed to update tunnel advancement", message: message };
  }
};

// Delete Tunnel Advancement by ID
export const deleteTunnelAdvancement = async (advancementId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${TUNNEL_ADVANCEMENT_API_URL}/${advancementId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error deleting tunnel advancement with ID: ${advancementId}`;
    throw { error: "Failed to delete tunnel advancement", message: message };
  }
};
