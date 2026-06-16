/**
 * Page Object Model - Project Details Page
 * Used for E2E testing with Cypress or Playwright
 */

export class ProjectDetailsPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors
  getProjectTitle() {
    return "h1, .project-title";
  }

  getProjectDescription() {
    return '.description, [data-testid="description"]';
  }

  getTeamMembers() {
    return '[data-testid*="team"], .team-member, .user-card';
  }

  getCommentSection() {
    return '[data-testid="comments"], .comments-section';
  }

  getCommentInput() {
    return 'textarea[placeholder*="comment" i], input[placeholder*="comment" i]';
  }

  getCommentButton() {
    return 'button:has-text("Post"), button:has-text("Comment"), button[type="submit"]';
  }

  getComments() {
    return '.comment, [data-testid*="comment"]';
  }

  getEditButton() {
    return 'button:has-text("Edit"), a[href*="edit"]';
  }

  getDeleteButton() {
    return 'button:has-text("Delete"), button.delete-btn';
  }

  getVideoFrame() {
    return 'iframe[src*="youtube"]';
  }

  // Actions
  async navigate(projectId) {
    await this.page.goto(`/Project/${projectId}`);
  }

  async addComment(text) {
    await this.page.fill(this.getCommentInput(), text);
    await this.page.click(this.getCommentButton());
    await this.page.waitForTimeout(300);
  }

  async editProject() {
    await this.page.click(this.getEditButton());
    await this.page.waitForNavigation();
  }

  async deleteProject() {
    await this.page.click(this.getDeleteButton());
    // Handle confirmation dialog if present
    if (await this.page.isVisible('button:has-text("Confirm")')) {
      await this.page.click('button:has-text("Confirm")');
    }
    await this.page.waitForNavigation();
  }

  // Assertions/Verifications
  async isOnProjectDetailsPage(projectId) {
    return this.page.url().includes(`/Project/${projectId}`);
  }

  async getProjectTitle() {
    return await this.page.textContent(this.getProjectTitle());
  }

  async getTeamMembersCount() {
    return await this.page.locator(this.getTeamMembers()).count();
  }

  async hasTeamMembers() {
    return (await this.getTeamMembersCount()) > 0;
  }

  async getCommentCount() {
    return await this.page.locator(this.getComments()).count();
  }

  async hasComments() {
    return (await this.getCommentCount()) > 0;
  }

  async getLatestCommentText() {
    const comments = await this.page.locator(this.getComments());
    const count = await comments.count();
    if (count === 0) return null;
    return await comments.nth(count - 1).textContent();
  }

  async canEdit() {
    return await this.page.isVisible(this.getEditButton());
  }

  async canDelete() {
    return await this.page.isVisible(this.getDeleteButton());
  }

  async hasVideoPlayer() {
    return await this.page.isVisible(this.getVideoFrame());
  }

  async getTeamMemberNames() {
    const members = await this.page.locator(this.getTeamMembers());
    return Promise.all(
      (await members.all()).map((member) => member.textContent()),
    );
  }
}

export default ProjectDetailsPage;
