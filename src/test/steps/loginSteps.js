/**
 * Step Definitions for Login Feature
 * Using Cucumber/Playwright or Cypress
 *
 * Install: npm install @cucumber/cucumber @playwright/test
 */

import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

let browser;
let page;
let loginPage;

Before(async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

After(async function () {
  await browser.close();
});

// Background steps
Given("the application is running", async function () {
  await page.goto("http://localhost:5173/login");
});

Given("the database is seeded with test data", async function () {
  // Mock data is loaded by default in mockApiService.js
  console.log("Using mock database");
});

// Scenario 1: Valid Login
Given("I am on the login page", async function () {
  await loginPage.navigate();
  console.assert(await loginPage.isOnLoginPage(), "Not on login page");
});

When("I enter a valid email {string}", async function (email) {
  await loginPage.enterEmail(email);
});

When("I click the login button", async function () {
  await loginPage.clickLogin();
  await loginPage.waitForNavigation();
});

Then("I should be redirected to the home page", async function () {
  console.assert(await loginPage.isOnHomePage(), "Not redirected to home page");
});

Then("I should see the user profile in the navbar", async function () {
  console.assert(await loginPage.isUserLoggedIn(), "User is not logged in");
});

Then("the local storage should contain a token", async function () {
  const token = await page.evaluate(() => localStorage.getItem("token"));
  console.assert(token !== null, "Token not found in localStorage");
});

// Scenario 2: Invalid Domain
When("I enter an invalid email {string}", async function (email) {
  await loginPage.enterEmail(email);
});

Then("I should see an error message", async function () {
  await page.waitForTimeout(300); // Wait for mock API delay
  console.assert(
    await loginPage.isErrorMessageVisible(),
    "Error message not visible",
  );
});

Then("the error message should be {string}", async function (expectedMessage) {
  const actualMessage = await loginPage.getErrorMessageText();
  console.assert(
    actualMessage.includes(expectedMessage),
    `Expected: "${expectedMessage}", Got: "${actualMessage}"`,
  );
});

Then("I should remain on the login page", async function () {
  console.assert(
    await loginPage.isOnLoginPage(),
    "User was redirected from login page",
  );
});

Then("the local storage should not contain a token", async function () {
  const token = await page.evaluate(() => localStorage.getItem("token"));
  console.assert(token === null, "Token found in localStorage");
});

// Scenario 3: Empty Email
When("I leave the email field empty", async function () {
  // Field is already empty
});

// Scenario 4: Unregistered Email
When("I enter an unregistered email {string}", async function (email) {
  await loginPage.enterEmail(email);
});

// Scenario 5: Logout
Given("I am logged in as {string}", async function (email) {
  await loginPage.navigate();
  await loginPage.login(email);
  await loginPage.waitForNavigation();
  console.assert(await loginPage.isOnHomePage(), "Failed to login");
});

When("I click the logout button", async function () {
  // Adjust selector based on your actual button
  await page.click('button:has-text("Logout"), a:has-text("Logout")');
});

Then("the local storage should be cleared", async function () {
  const user = await page.evaluate(() => localStorage.getItem("user"));
  const token = await page.evaluate(() => localStorage.getItem("token"));
  console.assert(user === null && token === null, "Local storage not cleared");
});
