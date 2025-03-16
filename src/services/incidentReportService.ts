import axiosInstance from "@/lib/api";

// Create a new Incident Report
export const createIncidentReport = async (incidentData: any) => {
  const res = await axiosInstance.post("/incidentReport", incidentData);
  return res.data;
};

// Get all Incident Reports
export const getAllIncidentReports = async () => {
  const res = await axiosInstance.get("/incidentReport");
  return res.data;
};

// Get an Incident Report by ID
export const getIncidentReportById = async (id: string) => {
  const res = await axiosInstance.get(`/incidentReport/${id}`);
  return res.data;
};

// Update an Incident Report by ID
export const updateIncidentReport = async (id: string, updateData: any) => {
  const res = await axiosInstance.patch(`/incidentReport/${id}`, updateData);
  return res.data;
};

// Delete an Incident Report by ID
export const deleteIncidentReport = async (id: string) => {
  const res = await axiosInstance.delete(`/incidentReport/${id}`);
  return res.data;
};
