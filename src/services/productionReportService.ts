import axiosInstance from "@/lib/api";

const PRODUCTION_REPORT_API_URL = "/production-report";

// Create Production Report
export const createProductionReport = async (
  productionReportData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.post(
      PRODUCTION_REPORT_API_URL,
      productionReportData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error creating production report";
    throw { error: "Failed to create production report", message: message };
  }
};

// Get All Production Reports
export const getProductionReports = async () => {
  try {
    const response = await axiosInstance.get(PRODUCTION_REPORT_API_URL);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error fetching production reports";
    throw { error: "Failed to fetch production reports", message: message };
  }
};

// Get Production Report by ID
export const getProductionReportById = async (reportId: string) => {
  try {
    const response = await axiosInstance.get(
      `${PRODUCTION_REPORT_API_URL}/${reportId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error fetching production report with ID: ${reportId}`;
    throw { error: "Failed to fetch production report", message: message };
  }
};

// Update Production Report
export const updateProductionReport = async (
  reportId: string,
  productionReportData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.put(
      `${PRODUCTION_REPORT_API_URL}/${reportId}`,
      productionReportData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error updating production report with ID: ${reportId}`;
    throw { error: "Failed to update production report", message: message };
  }
};

// Delete Production Report
export const deleteProductionReport = async (reportId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${PRODUCTION_REPORT_API_URL}/${reportId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error deleting production report with ID: ${reportId}`;
    throw { error: "Failed to delete production report", message: message };
  }
};
