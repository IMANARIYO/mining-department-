import axiosInstance from "@/lib/api";

const TUNNEL_COMPONENT_API_URL = "/tunnelComponent";

// Create Tunnel Component (Dynamic Fields)
export const createTunnelComponent = async (
  tunnelComponentData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.post(
      TUNNEL_COMPONENT_API_URL,
      tunnelComponentData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error creating tunnel component";
    throw { error: "Failed to create tunnel component", message: message };
  }
};

// Get All Tunnel Components (Dynamic Fields)
export const getTunnelComponents = async () => {
  try {
    const response = await axiosInstance.get(TUNNEL_COMPONENT_API_URL);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error fetching tunnel components";
    throw { error: "Failed to fetch tunnel components", message: message };
  }
};

// Get Tunnel Component by ID (Dynamic Fields)
export const getTunnelComponentById = async (tunnelComponentId: string) => {
  try {
    const response = await axiosInstance.get(
      `${TUNNEL_COMPONENT_API_URL}/${tunnelComponentId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error fetching tunnel component with ID: ${tunnelComponentId}`;
    throw { error: "Failed to fetch tunnel component", message: message };
  }
};

// Update Tunnel Component (Dynamic Fields)
export const updateTunnelComponent = async (
  tunnelComponentId: string,
  tunnelComponentData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.patch(
      `${TUNNEL_COMPONENT_API_URL}/${tunnelComponentId}`,
      tunnelComponentData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error updating tunnel component with ID: ${tunnelComponentId}`;
    throw { error: "Failed to update tunnel component", message: message };
  }
};

// Delete Tunnel Component (Dynamic Fields)
export const deleteTunnelComponent = async (tunnelComponentId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${TUNNEL_COMPONENT_API_URL}/${tunnelComponentId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error deleting tunnel component with ID: ${tunnelComponentId}`;
    throw { error: "Failed to delete tunnel component", message: message };
  }
};
