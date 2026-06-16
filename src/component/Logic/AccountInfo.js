/**
 * Account Info Service
 * Now using Mock API Service for testing
 * Can be switched to real backend by changing import
 */

import mockApiService from "../../services/mockApiService";

// Get all users with optional filtering
async function getAllUser(angkatan, sort) {
  try {
    const response = await mockApiService.getAllUsers(angkatan, sort);
    return response.status === "error" ? [] : response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Get user by ID
async function getUserById(id) {
  try {
    const response = await mockApiService.getUserById(id);
    return response.status === "error" ? null : response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

// Update user profile
async function updateUser(id, updatedData) {
  try {
    const response = await mockApiService.updateUserProfile(id, updatedData);
    return response.status === "error" ? null : response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

// Create new project
async function CreateProject(id, projectData) {
  try {
    const response = await mockApiService.createProject(projectData);
    return response.status === "error" ? null : response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Update existing project
async function UpdateProject(id, projectData) {
  try {
    const response = await mockApiService.updateProject(id, projectData);
    return response.status === "error" ? null : response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    return null;
  }
}

// Delete project
async function DeleteProject(id) {
  try {
    const response = await mockApiService.deleteProject(id);
    return response.status === "error" ? null : response;
  } catch (error) {
    console.error("Error deleting project:", error);
    return null;
  }
}

// Get project by ID
async function ShowProjectById(id) {
  try {
    const response = await mockApiService.getProjectById(id);
    return response.status === "error" ? null : response.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

// Post comment on project
async function PostComment(projectId, data) {
  try {
    const userId = data.user_id || 1; // Default to user 1 if not provided
    const content = data.content || data.comment || "";

    const response = await mockApiService.postComment(
      projectId,
      userId,
      content,
    );
    return response.status === "error" ? null : response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    return null;
  }
}

// Get comments for project
async function ShowComments(projectId) {
  try {
    const response = await mockApiService.getCommentsByProjectId(projectId);
    return response.status === "error" ? [] : response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

// Delete comment
async function DeleteComment(commentId) {
  try {
    // Mock deletion - in a real app this would call an API
    return {
      status: "success",
      message: "Comment deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  }
}

// Get users without project
async function getUsersWithoutProject(projectType) {
  try {
    // Return all users for assignment purposes
    const response = await mockApiService.getAllUsers();
    return response.status === "error" ? [] : response.data;
  } catch (error) {
    console.error("Error fetching available users:", error);
    return [];
  }
}

// Get user's projects
async function getUserProjects(userId) {
  try {
    const response = await mockApiService.getUserProjects(userId);
    return response.status === "error" ? [] : response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return [];
  }
}

export default {
  getAllUser,
  getUserById,
  updateUser,
  CreateProject,
  DeleteProject,
  ShowProjectById,
  PostComment,
  ShowComments,
  DeleteComment,
  UpdateProject,
  getUsersWithoutProject,
  getUserProjects,
};
