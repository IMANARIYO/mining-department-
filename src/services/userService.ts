import axiosInstance from "@/lib/api";

const USER_API_URL = "/user";

// ✅ Create User
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error creating user";
    throw { error: "Failed to create user", message };
  }
};

// ✅ Get All Users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(USER_API_URL);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error fetching users";
    throw { error: "Failed to fetch users", message };
  }
};

// ✅ Get User by ID
export const getUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${USER_API_URL}/${userId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error fetching user with ID: ${userId}`;
    throw { error: "Failed to fetch user", message };
  }
};

// ✅ Update User by ID
export const updateUser = async (
  userId: string,
  userData: { name?: string; email?: string; password?: string }
) => {
  try {
    const response = await axiosInstance.patch(
      `${USER_API_URL}/${userId}`,
      userData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error updating user with ID: ${userId}`;
    throw { error: "Failed to update user", message };
  }
};

// ✅ Delete User by ID
export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`${USER_API_URL}/${userId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error deleting user with ID: ${userId}`;
    throw { error: "Failed to delete user", message };
  }
};

// ✅ Check Users by Role ID
export const getUsersWithRoleId = async (roleId: string) => {
  try {
    const response = await axiosInstance.get(`/role/${roleId}`);
    return response.data;  // This will be the list of users with the specified role
  } catch (error: any) {
    const message = error.response?.data?.message || "Error checking users by role";
    throw { error: "Failed to check users by role", message };
  }
};
// ✅ Get User Roles by ID (New)
export const getRolesForUserId = async (userId: string) => {
  console.log("getting roles  for this  user",userId)
  try {
    const response = await axiosInstance.get(`${USER_API_URL}/${userId}/role`);
    console.log("the roles  for this  user",response.data)
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || `Error fetching roles for user with ID: ${userId}`;
    throw { error: "Failed to fetch user roles", message };
  }
};


// ✅ Add Roles to User
export const addRolesToUser = async (userId: string, roleIds: string[]) => {
  try {
    const response = await axiosInstance.post("/user/role", {
      userId,
      roleIds
    });
    console.log("the rolke  to add  are  the---------------------------------------------------------------",response.data)
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error adding roles to user";
    throw { error: "Failed to add roles to user", message };
  }
};

// ✅ Remove Roles from User
export const removeRolesFromUser = async (userId: string, roleIds: string[]) => {
  try {
    const response = await axiosInstance.delete("/user/role", {
      data: {
        userId,
        roleIds
      }
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error removing roles from user";
    throw { error: "Failed to remove roles from user", message };
  }
};

// ✅ Update Roles for User
export const updateUserRoles = async (userId: string, newRoleIds: string[]) => {
  try {
    const response = await axiosInstance.patch("/user/role", {
      userId,
      newRoleIds
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error updating roles for user";
    throw { error: "Failed to update roles for user", message };
  }
};