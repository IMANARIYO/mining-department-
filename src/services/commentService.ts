import axiosInstance from "@/lib/api";

const COMMENT_API_URL = "/comment";

// Create Comment
export const createComment = async (commentData: Record<string, any>) => {
  try {
    const response = await axiosInstance.post(COMMENT_API_URL, commentData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error creating comment";
    throw { error: "Failed to create comment", message };
  }
};

// Get All Comments
export const getComments = async () => {
  try {
    const response = await axiosInstance.get(COMMENT_API_URL);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error fetching comments";
    throw { error: "Failed to fetch comments", message };
  }
};

// Get Comment by ID
export const getCommentById = async (commentId: string) => {
  try {
    const response = await axiosInstance.get(`${COMMENT_API_URL}/${commentId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error fetching comment with ID: ${commentId}`;
    throw { error: "Failed to fetch comment", message };
  }
};

// Update Comment
export const updateComment = async (
  commentId: string,
  commentData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.put(
      `${COMMENT_API_URL}/${commentId}`,
      commentData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error updating comment with ID: ${commentId}`;
    throw { error: "Failed to update comment", message };
  }
};

// Delete Comment
export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${COMMENT_API_URL}/${commentId}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      `Error deleting comment with ID: ${commentId}`;
    throw { error: "Failed to delete comment", message };
  }
};
