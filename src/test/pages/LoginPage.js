/**
 * Page Object Model - Login Page
 * Used for E2E testing with Cypress or Playwright
 */

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors (adapt to your actual HTML)
  getEmailInput() {
    return 'input[type="email"], input[placeholder*="email" i], input[name*="email" i]';
  }

  getLoginButton() {
    return 'button:has-text("Login"), button:has-text("Sign in"), button[type="submit"]';
  }

  getErrorMessage() {
    return '.error-message, [role="alert"], .alert-danger';
  }

  getNavbar() {
    return "nav, header";
  }

  // Actions
  async navigate() {
    await this.page.goto("/login");
  }

  async enterEmail(email) {
    await this.page.fill(this.getEmailInput(), email);
  }

  async clickLogin() {
    await this.page.click(this.getLoginButton());
  }

  async login(email) {
    await this.enterEmail(email);
    await this.clickLogin();
  }

  // Assertions/Verifications
  async isOnLoginPage() {
    return this.page.url().includes("/login");
  }

  async isOnHomePage() {
    return (
      this.page.url() === this.page.url().split("/").slice(0, 3).join("/") + "/"
    );
  }

  async getErrorMessageText() {
    return await this.page.textContent(this.getErrorMessage());
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.getErrorMessage());
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.getNavbar());
  }

  async waitForNavigation() {
    await this.page.waitForNavigation();
  }
}

export default LoginPage;
