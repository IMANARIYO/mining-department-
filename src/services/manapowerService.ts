import axiosInstance from "@/lib/api";

export const getAllManpower = async (tunnelId?: string) => {
  const url = tunnelId ? `/manpower?tunnelId=${tunnelId}` : "/manpower";
  const res = await axiosInstance.get(url);
  return res.data;
};

export const getManpowerById = async (id: string) => {
  const res = await axiosInstance.get(`/manpower/${id}`);
  return res.data;
};

export const createManpower = async (manpowerData: any) => {
  const res = await axiosInstance.post("/manpower", manpowerData);
  return res.data;
};

export const updateManpower = async (id: string, updateData: any) => {
  const res = await axiosInstance.patch(`/manpower/${id}`, updateData);
  return res.data;
};

export const deleteManpower = async (id: string) => {
  const res = await axiosInstance.delete(`/manpower/${id}`);
  return res.data;
};
