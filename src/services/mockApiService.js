/**
 * Mock API Service
 * Menggantikan panggilan backend API dengan data mock yang persis dengan struktur Laravel.
 * Menggunakan LocalStorage agar operasi CRUD (Create, Read, Update, Delete) persis seperti DB nyata.
 */

import projectsData from "../Mock/projects.json";
import usersData from "../Mock/users.json";
import commentsData from "../Mock/comments.json";

// Simulasi delay jaringan (dalam milidetik) agar transisi UI terasa nyata
const MOCK_DELAY = 300; 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// LOCAL STORAGE HELPERS (PERSISTENCE LAYER)
// ==========================================

const getLocalProjects = () => {
  const local = localStorage.getItem("mock_projects");
  if (!local) {
    localStorage.setItem("mock_projects", JSON.stringify(projectsData));
    return projectsData;
  }
  return JSON.parse(local);
};

const saveLocalProjects = (data) => {
  localStorage.setItem("mock_projects", JSON.stringify(data));
};

const getLocalUsers = () => {
  const local = localStorage.getItem("mock_users");
  if (!local) {
    localStorage.setItem("mock_users", JSON.stringify(usersData));
    return usersData;
  }
  return JSON.parse(local);
};

const saveLocalUsers = (data) => {
  localStorage.setItem("mock_users", JSON.stringify(data));
};

const getLocalComments = () => {
  const local = localStorage.getItem("mock_comments");
  if (!local) {
    localStorage.setItem("mock_comments", JSON.stringify(commentsData));
    return commentsData;
  }
  return JSON.parse(local);
};

const saveLocalComments = (data) => {
  localStorage.setItem("mock_comments", JSON.stringify(data));
};

// Helper untuk mengekstrak FormData (dari React) menjadi Object JSON biasa
const parseFormData = (formData) => {
  let dataObj = {};
  if (formData instanceof FormData) {
    for (let [key, value] of formData.entries()) {
      // Abaikan array students bertingkat dulu, akan diparsing manual di fungsi create
      if (!key.includes("[")) {
        dataObj[key] = value;
      }
    }
  } else {
    dataObj = formData;
  }
  return dataObj;
};

// ==========================================
// CRUD - PROJECTS SECTION
// ==========================================

export async function getProjects() {
  await delay(MOCK_DELAY);
  return {
    status: "success",
    data: getLocalProjects(),
  };
}

export async function getPaginatedProjects(page = 1, project_type = "PAD 1", sort = "New") {
  await delay(MOCK_DELAY);
  const currentProjects = getLocalProjects();

  // Filter berdasarkan tipe project
  let filtered = currentProjects;
  if (project_type && project_type !== "all") {
    filtered = currentProjects.filter((p) => p.project_type.includes(project_type));
  }

  // Sorting data
  const sorted = [...filtered];
  if (sort === "New" || sort === "new") {
    sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (sort === "Old" || sort === "old") {
    sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  // Pagination (10 data per halaman)
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sorted.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    current_page: page,
    next_page_url: endIndex < sorted.length ? `/api/projects?page=${page + 1}` : null,
    last_page: Math.ceil(sorted.length / itemsPerPage),
  };
}

export async function getProjectById(id) {
  await delay(MOCK_DELAY);
  const currentProjects = getLocalProjects();
  const project = currentProjects.find((p) => p.project_id === parseInt(id));

  if (!project) {
    return {
      status: "error",
      message: "Project not found",
    };
  }

  return {
    status: "success",
    data: project,
  };
}

export async function createProject(projectData) {
  await delay(MOCK_DELAY);
  const currentProjects = getLocalProjects();
  const projectDataObj = parseFormData(projectData);

  // Parsing array data mahasiswa/tim jika dikirim lewat FormData
  const users = [];
  if (projectData instanceof FormData) {
    const studentsMap = {};
    for (let [key, value] of projectData.entries()) {
      if (key.includes("students")) {
        const match = key.match(/students\[(\d+)\]\[(\w+)\]/);
        if (match) {
          const index = match[1];
          const field = match[2];
          if (!studentsMap[index]) studentsMap[index] = {};
          studentsMap[index][field] = value;
        }
      }
    }
    Object.values(studentsMap).forEach((student) => {
      if (student.user_id && student.role) {
        users.push({
          user_id: parseInt(student.user_id),
          username: `User${student.user_id}`,
          pivot: { role: student.role },
        });
      }
    });
  }

  const newProject = {
    project_id: Math.max(...currentProjects.map((p) => p.project_id), 0) + 1,
    title: projectDataObj.title || "",
    description: projectDataObj.description || "",
    cover_image_url: projectDataObj.cover_image_url || "",
    youtube_video_url: projectDataObj.youtube_video_url || "",
    team_name: projectDataObj.team_name || "New Team",
    project_year: parseInt(projectDataObj.project_year) || new Date().getFullYear(),
    project_type: projectDataObj.project_type || "PAD 1",
    users: users.length > 0 ? users : [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  currentProjects.push(newProject);
  saveLocalProjects(currentProjects);

  return {
    status: "success",
    message: "Project created successfully",
    data: newProject,
  };
}

export async function updateProject(id, projectData) {
  await delay(MOCK_DELAY);
  const currentProjects = getLocalProjects();
  const projectIndex = currentProjects.findIndex((p) => p.project_id === parseInt(id));

  if (projectIndex === -1) {
    return {
      status: "error",
      message: "Project not found",
    };
  }

  // FIX: Ekstrak FormData menjadi objek datar sebelum digabungkan
  const projectDataObj = parseFormData(projectData);

  currentProjects[projectIndex] = {
    ...currentProjects[projectIndex],
    ...projectDataObj, 
    updated_at: new Date().toISOString(),
  };

  saveLocalProjects(currentProjects);

  return {
    status: "success",
    message: "Project updated successfully",
    data: currentProjects[projectIndex],
  };
}

export async function deleteProject(id) {
  await delay(MOCK_DELAY);
  const currentProjects = getLocalProjects();
  const projectIndex = currentProjects.findIndex((p) => p.project_id === parseInt(id));

  if (projectIndex === -1) {
    return {
      status: "error",
      message: "Project not found",
    };
  }

  currentProjects.splice(projectIndex, 1);
  saveLocalProjects(currentProjects);

  return {
    status: "success",
    message: "Project deleted successfully",
  };
}

// ==========================================
// CRUD - USERS SECTION
// ==========================================

export async function getAllUsers(angkatan = null, sort = null) {
  await delay(MOCK_DELAY);
  let filtered = [...getLocalUsers()];

  if (angkatan) {
    filtered = filtered.filter((u) => u.angkatan === angkatan);
  }

  if (sort) {
    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
  }

  return {
    status: "success",
    data: filtered,
  };
}

export async function getUserById(id) {
  await delay(MOCK_DELAY);
  const currentUsers = getLocalUsers();
  const user = currentUsers.find((u) => u.user_id === parseInt(id));

  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  return {
    status: "success",
    data: user,
  };
}

export async function updateUserProfile(id, updatedData) {
  await delay(MOCK_DELAY);
  const currentUsers = getLocalUsers();
  const userIndex = currentUsers.findIndex((u) => u.user_id === parseInt(id));

  if (userIndex === -1) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  const parsedData = parseFormData(updatedData);

  currentUsers[userIndex] = {
    ...currentUsers[userIndex],
    ...parsedData,
    updated_at: new Date().toISOString(),
  };

  saveLocalUsers(currentUsers);

  return {
    status: "success",
    message: "Profile updated successfully",
    data: currentUsers[userIndex],
  };
}

// ==========================================
// CRUD - COMMENTS SECTION
// ==========================================

export async function getCommentsByProjectId(projectId) {
  await delay(MOCK_DELAY);
  const currentComments = getLocalComments();
  const currentUsers = getLocalUsers();

  const projectComments = currentComments.filter(
    (c) => c.project_id === parseInt(projectId)
  );

  // Gabungkan data komentar dengan profil user yang mengomentari
  const enrichedComments = projectComments.map((comment) => {
    const user = currentUsers.find((u) => u.user_id === comment.user_id);
    return {
      ...comment,
      user: user || {
        username: "Unknown User",
        profile_picture: "/mock-avatar-default.png",
      },
    };
  });

  return {
    status: "success",
    data: enrichedComments,
  };
}

export async function postComment(projectId, userId, content) {
  await delay(MOCK_DELAY);
  const currentComments = getLocalComments();
  const currentUsers = getLocalUsers();

  const newComment = {
    comment_id: Math.max(...currentComments.map((c) => c.comment_id), 0) + 1,
    project_id: parseInt(projectId),
    user_id: parseInt(userId),
    content: content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  currentComments.push(newComment);
  saveLocalComments(currentComments);

  const user = currentUsers.find((u) => u.user_id === userId);

  return {
    status: "success",
    message: "Comment posted successfully",
    data: {
      ...newComment,
      user: user || {
        username: "Unknown User",
        profile_picture: "/mock-avatar-default.png",
      },
    },
  };
}

// ==========================================
// OTHER SERVICES / AUXILIARY
// ==========================================

export async function getCompanies() {
  await delay(MOCK_DELAY);
  return {
    status: "success",
    data: [],
  };
}

export async function getUserProjects(userId) {
  await delay(MOCK_DELAY);
  const currentProjects = getLocalProjects();

  const userProjects = currentProjects.filter((p) => {
    return p.users && p.users.some((u) => u.user_id === parseInt(userId));
  });

  return {
    status: "success",
    data: userProjects,
  };
}

// ==========================================
// EXPORTS
// ==========================================

const mockApiService = {
  getProjects,
  getPaginatedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAllUsers,
  getUserById,
  updateUserProfile,
  getCommentsByProjectId,
  postComment,
  getCompanies,
  getUserProjects,
};

export default mockApiService;