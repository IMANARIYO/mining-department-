import axiosInstance from "@/lib/api";

const BLAST_API_URL = "/blast";

// Create Blast Log
export const createBlastLog = async (blastData: {
  tunnelId: string;
  dateTime?: string;
  blastLocation: string;
  blastId: string;
  rockType: string;
  groundStability: string;
  waterPresence: string;
  groundTemperature: number;
  numberOfHoles: number;
  holeDepth: number;
  holeDiameter: number;
  holeCondition: string;
  ventilationPlan?: boolean; // Optional, defaults to false
  areaEvacuated?: boolean; // Optional, defaults to false
  personnelAccounted?: boolean; // Optional, defaults to false
  equipmentRemoved?: boolean; // Optional, defaults to false
  teamLeadSignature?: string; // Optional
  teamMembers?: string[]; // Optional, defaults to []
}) => {
  try {
    const response = await axiosInstance.post(BLAST_API_URL, {
      ...blastData,
      ventilationPlan: blastData.ventilationPlan ?? false,
      areaEvacuated: blastData.areaEvacuated ?? false,
      personnelAccounted: blastData.personnelAccounted ?? false,
      equipmentRemoved: blastData.equipmentRemoved ?? false,
      teamMembers: blastData.teamMembers ?? []
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error creating blast log";
    throw { error: "Failed to create blast log", message };
  }
};


// Get All Blast Logs
export const getBlastLogs = async () => {
  try {
    const response = await axiosInstance.get(BLAST_API_URL);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error fetching blast logs";
    throw { error: "Failed to fetch blast logs", message };
  }
};

// Get Blast Log by ID
export const getBlastLogById = async (blastId: string) => {
  try {
    const response = await axiosInstance.get(`${BLAST_API_URL}/${blastId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error fetching blast log with ID: ${blastId}`;
    throw { error: "Failed to fetch blast log", message };
  }
};

// Update Blast Log by ID
export const updateBlastLog = async (
  blastId: string,
  blastData: Partial<{
    tunnelId: string;
    dateTime: string;
    blastLocation: string;
    rockType: string;
    groundStability: string;
    waterPresence: string;
    groundTemperature: number;
    numberOfHoles: number;
    holeDepth: number;
    holeDiameter: number;
    holeCondition: string;
    ventilationPlan: boolean;
    areaEvacuated: boolean;
    personnelAccounted: boolean;
    equipmentRemoved: boolean;
    teamLeadSignature?: string;
    teamMembers?: string[];
  }>
) => {
  try {
    const response = await axiosInstance.patch(
      `${BLAST_API_URL}/${blastId}`,
      blastData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error updating blast log with ID: ${blastId}`;
    throw { error: "Failed to update blast log", message };
  }
};

// Delete Blast Log by ID
export const deleteBlastLog = async (blastId: string) => {
  try {
    const response = await axiosInstance.delete(`${BLAST_API_URL}/${blastId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error deleting blast log with ID: ${blastId}`;
    throw { error: "Failed to delete blast log", message };
  }
};
