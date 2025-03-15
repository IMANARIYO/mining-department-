import axiosInstance from "@/lib/api";

const SITE_API_URL = "/sites";

export const createSite = async (siteData: {
  name: string;
  location: string;
  projectManager: string;
  startDate: string;
  endDate?: string;
}) => {
  try {
    const response = await axiosInstance.post(SITE_API_URL, siteData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error creating site";
    throw { error: "Failed to create site", message: message };
  }
};

export const getSites = async () => {
  try {
    const response = await axiosInstance.get(SITE_API_URL);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error fetching sites";
    throw { error: "Failed to fetch sites", message: message };
  }
};

export const getSiteById = async (siteId: string) => {
  try {
    const response = await axiosInstance.get(`${SITE_API_URL}/${siteId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error fetching site with ID: ${siteId}`;
    throw { error: "Failed to fetch site", message: message };
  }
};

export const updateSite = async (
  siteId: string,
  siteData: {
    name?: string;
    location?: string;
    projectManager?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  try {
    const response = await axiosInstance.put(
      `${SITE_API_URL}/${siteId}`,
      siteData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error updating site with ID: ${siteId}`;
    throw { error: "Failed to update site", message: message };
  }
};

export const deleteSite = async (siteId: string) => {
  try {
    const response = await axiosInstance.delete(`${SITE_API_URL}/${siteId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error deleting site with ID: ${siteId}`;
    throw { error: "Failed to delete site", message: message };
  }
};
