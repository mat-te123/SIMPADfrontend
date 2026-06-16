/**
 * Home API Data
 * Now using Mock API Service for testing
 * Can be switched to real backend by changing import
 */

import mockApiService from "../../services/mockApiService";

// Take Company Data from Mock API
export async function CompanyData() {
  try {
    const response = await mockApiService.getCompanies();
    return response.status === "error" ? [] : response.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    return []; // Return empty array on error
  }
}

// Take Project Data from Mock API
export async function ProjectData() {
  try {
    const response = await mockApiService.getProjects();
    return response.status === "error" ? [] : response.data;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return []; // Return empty array on error
  }
}

// Get Paginated Projects with Filtering and Sorting
async function Pagination(page, type = "PAD 1", Sort) {
  try {
    const response = await mockApiService.getPaginatedProjects(
      page,
      type,
      Sort,
    );
    return response;
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    return null;
  }
}

export default { CompanyData, ProjectData, Pagination };
