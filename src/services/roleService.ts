import axiosInstance from "@/lib/api";

const ROLE_API_URL = "/roles";

// ✅ Create Role
export const createRole = async (roleData: { name: string }) => {
  try {
    const response = await axiosInstance.post(ROLE_API_URL, roleData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error creating role";
    throw { error: "Failed to create role", message };
  }
};

// ✅ Get All Roles
export const getRoles = async () => {
  try {
    const response = await axiosInstance.get(ROLE_API_URL);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error fetching roles";
    throw { error: "Failed to fetch roles", message };
  }
};

// ✅ Get Role by ID
export const getRoleById = async (roleId: string) => {
  try {
    const response = await axiosInstance.get(`${ROLE_API_URL}/${roleId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error fetching role with ID: ${roleId}`;
    throw { error: "Failed to fetch role", message };
  }
};

// ✅ Update Role by ID
export const updateRole = async (
  roleId: string,
  roleData: { name?: string }
) => {
  try {
    const response = await axiosInstance.patch(
      `${ROLE_API_URL}/${roleId}`,
      roleData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error updating role with ID: ${roleId}`;
    throw { error: "Failed to update role", message };
  }
};

// ✅ Delete Role by ID
export const deleteRole = async (roleId: string) => {
  try {
    const response = await axiosInstance.delete(`${ROLE_API_URL}/${roleId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error deleting role with ID: ${roleId}`;
    throw { error: "Failed to delete role", message };
  }
};
