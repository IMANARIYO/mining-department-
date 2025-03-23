import axiosInstance from "@/lib/api";

export const getAllAttendance = async (tunnelId?: string) => {
  const url = tunnelId ? `/attendance?tunnelId=${tunnelId}` : "/attendance";
  const res = await axiosInstance.get(url);
  return res.data;
};

export const getAttendanceById = async (id: string) => {
  const res = await axiosInstance.get(`/attendance/${id}`);
  return res.data;
};

export const createAttendance = async (attendanceData: any) => {
  const res = await axiosInstance.post("/attendance", attendanceData);
  return res.data;
};

export const updateAttendance = async (id: string, updateData: any) => {
  const res = await axiosInstance.patch(`/attendance/${id}`, updateData);
  return res.data;
};

export const deleteAttendance = async (id: string) => {
  const res = await axiosInstance.delete(`/attendance/${id}`);
  return res.data;
};

export const getAttendanceReports = async (
  startDate: string,
  endDate: string,
  type: string = "daily"
) => {
  const url = `/attendance/reports?startDate=${startDate}&endDate=${endDate}&type=${type}`;
  const res = await axiosInstance.get(url);
  return res.data;
};

export const getTodayAttendance = async (manpowerId: string) => {
  const res = await axiosInstance.get(
    `/attendance/today?manpowerId=${manpowerId}`
  );
  return res.data;
};
