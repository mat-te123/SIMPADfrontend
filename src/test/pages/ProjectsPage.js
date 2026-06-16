/**
 * Page Object Model - Projects Page
 * Used for E2E testing with Cypress or Playwright
 */

export class ProjectsPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors
  getProjectCard() {
    return '[data-testid*="project"], .project-card, article';
  }

  getProjectTitle() {
    return "h2, h3, .project-title";
  }

  getProjectDescription() {
    return ".description, p";
  }

  getFilterButton(type) {
    return `button:has-text("${type}"), [data-filter="${type}"]`;
  }

  getSortButton(sort) {
    return `button:has-text("${sort}"), [data-sort="${sort}"]`;
  }

  getProjectLink(projectId) {
    return `a[href*="/Project/${projectId}"]`;
  }

  getPaginationNext() {
    return 'button:has-text("Next"), .pagination-next';
  }

  // Actions
  async navigate() {
    await this.page.goto("/Project");
  }

  async filterByType(type) {
    await this.page.click(this.getFilterButton(type));
    await this.page.waitForTimeout(300); // Wait for mock API delay
  }

  async sortBy(sort) {
    await this.page.click(this.getSortButton(sort));
    await this.page.waitForTimeout(300);
  }

  async clickProjectCard(projectId) {
    await this.page.click(this.getProjectLink(projectId));
    await this.page.waitForNavigation();
  }

  async getProjectCount() {
    return await this.page.locator(this.getProjectCard()).count();
  }

  async scrollToNextPage() {
    await this.page.click(this.getPaginationNext());
    await this.page.waitForTimeout(300);
  }

  // Assertions/Verifications
  async isOnProjectsPage() {
    return this.page.url().includes("/Project");
  }

  async hasProjects() {
    return (await this.getProjectCount()) > 0;
  }

  async getProjectTitles() {
    return await this.page.locator(this.getProjectTitle()).allTextContents();
  }

  async isProjectVisible(projectTitle) {
    const titles = await this.getProjectTitles();
    return titles.some((title) => title.includes(projectTitle));
  }

  async getVisibleProjectTypes() {
    const elements = await this.page.locator("[data-project-type]").all();
    return Promise.all(
      elements.map((el) => el.getAttribute("data-project-type")),
    );
  }
}

export default ProjectsPage;
