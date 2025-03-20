import axiosInstance from "@/lib/api";

// Create Tunnel
export const createTunnel = async (tunnelData: any) => {
  const res = await axiosInstance.post("/tunnel", tunnelData);
  return res.data;
};

// Get All Tunnels
export const getAllTunnels = async () => {
  const res = await axiosInstance.get("/tunnel");
  return res.data;
};

// Get Tunnel by ID
export const getTunnelById = async (id: string) => {
  const res = await axiosInstance.get(`/tunnel/${id}`);
  return res.data;
};

// Update Tunnel by ID
export const updateTunnel = async (id: string, updateData: any) => {
  const res = await axiosInstance.patch(`/tunnel/${id}`, updateData);
  return res.data;
};

// Delete Tunnel by ID
export const deleteTunnel = async (id: string) => {
  const res = await axiosInstance.delete(`/tunnel/${id}`);
  return res.data;
};
