import axiosInstance from "@/lib/api";


export const createTunnelDimension = async (dimensionData: any) => {
  const res = await axiosInstance.post("/tunnelDimension", dimensionData);
  return res.data;
};

export const getAllTunnelDimensions = async () => {
  const res = await axiosInstance.get("/tunnelDimension");
  return res.data;
};

export const updateTunnelDimension = async (id: string, updateData: any) => {
  const res = await axiosInstance.patch(`/tunnelDimension/${id}`, updateData);
  return res.data;
};

export const deleteTunnelDimension = async (id: string) => {
  const res = await axiosInstance.delete(`/tunnelDimension/${id}`);
  return res.data;
};
