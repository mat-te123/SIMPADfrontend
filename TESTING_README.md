# Testing Setup Instructions

## Quick Start

### 1. Clone and Install Dependencies

```bash
cd /home/denod/PAD1/frontend
npm install
```

### 2. Start Application with Mock Data

```bash
npm run dev
```

The app will now run on `http://localhost:5173` with mock data instead of connecting to a backend.

### 3. Test Accounts

**Account 1 - Rainard (Testing Lead)**

- Email: `rainard@mail.ugm.ac.id`
- Password: (not required)
- Projects: Smart Farming IoT (ID: 2), Learning Management System (ID: 6)

**Account 2 - Erico (Full Stack Developer)**

- Email: `erico@mail.ugm.ac.id`
- Password: (not required)
- Projects: E-Commerce Platform (ID: 3), AI Chatbot (ID: 4), Real Estate Portal (ID: 7)

**Other Accounts:**

- Budi Utomo: `delvianokhayruattahira@mail.ugm.ac.id`
- Ahmad Rizki: `ahmadrizki@mail.ugm.ac.id`
- Nadia Putri: `nadiaputri@mail.ugm.ac.id`

---

## Project Structure for Testing

```
src/
├── services/
│   ├── mockApiService.js        ← Mock API layer
│   └── AuthService.js           ← Already uses mock
├── config/
│   └── apiConfig.js             ← API configuration
├── Mock/
│   ├── users.json               ← Test users
│   ├── projects.json            ← Test projects
│   ├── comments.json            ← Test comments
│   └── userprojects.json        ← User-project relationships
└── test/
    ├── pages/                   ← Page Object Models
    │   ├── LoginPage.js
    │   ├── ProjectsPage.js
    │   └── ProjectDetailsPage.js
    ├── steps/                   ← BDD Step definitions
    │   └── loginSteps.js
    ├── features/                ← Gherkin scenarios
    │   ├── login.feature
    │   ├── projects.feature
    │   └── projectDetails.feature
    └── setup.js                 ← Test configuration
```

---

## Setting Up E2E Testing

### Option 1: Using Cypress

#### Install

```bash
npm install --save-dev cypress
```

#### Open Cypress

```bash
npx cypress open
```

#### Create Test File: `cypress/e2e/login.cy.js`

```javascript
import { LoginPage } from "../../src/test/pages/LoginPage";

describe("Login Flow", () => {
  let loginPage;

  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    loginPage = new LoginPage(cy);
  });

  it("should login with valid UGM email", () => {
    loginPage.login("rainard@mail.ugm.ac.id");
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("should show error for non-UGM email", () => {
    loginPage.login("user@gmail.com");
    cy.get(".error-message").should("be.visible");
  });
});
```

### Option 2: Using Playwright

#### Install

```bash
npm install --save-dev @playwright/test
```

#### Create Test File: `tests/login.spec.js`

```javascript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/test/pages/LoginPage";

test.describe("Login Flow", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    loginPage = new LoginPage(page);
  });

  test("should login with valid email", async ({ page }) => {
    await loginPage.login("rainard@mail.ugm.ac.id");
    expect(page.url()).toBe("http://localhost:5173/");
  });
});
```

#### Run Tests

```bash
npx playwright test
```

---

## Setting Up BDD Testing with Cucumber

### Install

```bash
npm install --save-dev @cucumber/cucumber
```

### Configure: `cucumber.js`

```javascript
module.exports = {
  default: {
    require: ["src/test/steps/*.js"],
    format: ["progress-bar", "html:cucumber-report.html"],
    paths: ["src/test/features/*.feature"],
  },
};
```

### Run Tests

```bash
npx cucumber-js
```

---

## Manual Testing Checklist

### Login Page (✓ 5 tests)

- [ ] Test 1: Login with valid email (rainard@mail.ugm.ac.id)
- [ ] Test 2: Login with another valid email (erico@mail.ugm.ac.id)
- [ ] Test 3: Try login with non-UGM email
- [ ] Test 4: Try login with unregistered email
- [ ] Test 5: Try login with empty email

### Projects Page (✓ 5 tests)

- [ ] Test 1: Load projects page - should show 7 projects
- [ ] Test 2: Filter by PAD 1 type
- [ ] Test 3: Filter by PAD 2 type
- [ ] Test 4: Sort by newest
- [ ] Test 5: Sort by oldest

### Project Details (✓ 5 tests)

- [ ] Test 1: Click on own project - should show edit/delete buttons
- [ ] Test 2: Click on others' project - should NOT show edit/delete
- [ ] Test 3: View team members
- [ ] Test 4: Post a comment
- [ ] Test 5: Verify comment appears

### Additional Pages

- [ ] Test Mahasiswa page (user directory)
- [ ] Test user profile pages
- [ ] Test responsive design

---

## Bug Reporting Template

When you find a bug, report it using this template:

**Title**: [Concise description]
**Severity**: [Critical/High/Medium/Low]
**Test Case**: TC_ID or Feature_Scenario
**Steps to Reproduce**:

1. ...
2. ...

**Expected**: ...
**Actual**: ...
**Environment**: Browser, OS version

---

## API Mock Data Modifications

### Add New Project

Edit `src/Mock/projects.json`:

```json
{
  "project_id": 8,
  "title": "New Project",
  "team_name": "Team Name",
  "description": "Description",
  "project_type": "PAD 1",
  "users": [
    {
      "user_id": 1,
      "username": "Name",
      "pivot": { "role": "Role" }
    }
  ]
}
```

### Add New User

Edit `src/Mock/users.json`:

```json
{
  "user_id": 7,
  "username": "New User",
  "email": "newuser@mail.ugm.ac.id",
  "profile_info": "Description",
  "user_role": "member",
  "angkatan": "2023"
}
```

### Add Comment

Edit `src/Mock/comments.json`:

```json
{
  "comment_id": 7,
  "project_id": 1,
  "user_id": 1,
  "content": "Comment text",
  "created_at": "2026-03-03T10:00:00Z"
}
```

---

## Troubleshooting

### App Not Loading

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Mock Data Not Showing

1. Check browser console for errors
2. Verify JSON files in `src/Mock/` are valid
3. Check that `mockApiService.js` is imported correctly

### Login Not Working

1. Email must end with `@mail.ugm.ac.id`
2. Email must be in `src/Mock/users.json`
3. Check localStorage in DevTools

---

## Team Task Allocation

**Rainard** (Login & Logout Testing):

- [ ] Write login test cases (TC_LOGIN_001-007)
- [ ] Create step definitions for login
- [ ] Test logout functionality
- [ ] Document bugs found

**Erico** (Project Viewing & Comments):

- [ ] Write project listing test cases (TC_PROJ_001-008)
- [ ] Write project details test cases (TC_DETAIL_001-006)
- [ ] Write comment test cases (TC_COMM_001-005)
- [ ] Create Page Object Models

**Additional Members**:

- [ ] E2E flow testing
- [ ] Responsive design testing
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Bug report compilation

---

## Resources

- **Testing Guide**: [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **Test Cases**: [TEST_CASES.md](./TEST_CASES.md)
- **Mock API**: [src/services/mockApiService.js](./src/services/mockApiService.js)
- **Page Objects**: [src/test/pages/](./src/test/pages/)
- **Gherkin Features**: [src/test/features/](./src/test/features/)

---

## Success Criteria

✅ Application runs with mock data
✅ 5+ pages are testable
✅ All test cases are documented
✅ Test code uses Page Object Model
✅ BDD scenarios written in Gherkin
✅ Bug report template created
✅ Team members can independently run tests

---

**Status**: Ready for Testing Phase 🚀
