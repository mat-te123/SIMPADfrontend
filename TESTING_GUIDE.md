# Testing Setup Guide - Mock Data Integration

## Overview

The application has been configured to work with mock data for testing purposes. This allows you to test all features without needing a backend server.

## Current Architecture

### Mock API Service

- **Location**: `src/services/mockApiService.js`
- **Purpose**: Provides mock implementations of all backend API endpoints
- **Features**:
  - Simulates network delays (300ms by default)
  - Full CRUD operations for projects, users, and comments
  - Filtering and pagination support
  - Data persistence during session

### Mock Data Files

Located in `src/Mock/`:

- `users.json` - 6 test users including Rainard (ID: 3) and Erico (ID: 4)
- `projects.json` - 7 test projects across PAD 1 and PAD 2
- `comments.json` - Sample comments for testing
- `userprojects.json` - User-project relationships

### Integration Points

The following files now use the mock API service:

- `src/component/Logic/HomeApiData.js` - Project data fetching
- `src/component/Logic/AccountInfo.js` - User and project management
- `src/services/AuthService.js` - Already using mock authentication

## User Workflow for Testing

### Test Users Available

1. **Rainard** (ID: 3)
   - Email: `rainard@mail.ugm.ac.id`
   - Role: Testing Lead & QA Specialist
   - Projects: Smart Farming IoT System (ID: 2), Learning Management System (ID: 6)

2. **Erico** (ID: 4)
   - Email: `erico@mail.ugm.ac.id`
   - Role: Full Stack Developer & UI/UX Designer
   - Projects: E-Commerce Platform (ID: 3), AI Chatbot (ID: 4), Real Estate Portal (ID: 7)

3. **Other Users**:
   - Budi Utomo (ID: 1)
   - Siti Aminah (ID: 2) - Admin
   - Ahmad Rizki (ID: 5)
   - Nadia Putri (ID: 6)

## Testing the User Flow

### 1. Login Flow (Rainard)

```javascript
Email: rainard@mail.ugm.ac.id
// Uses mock authentication - no password required
// Returns: Mock JWT token and user data
```

### 2. View Dashboard

- Shows user's projects
- Displays projects across PAD 1 and PAD 2 types
- Supports filtering and sorting

### 3. Create Project

```javascript
// New projects are added to projects.json mock data
// Data includes:
// - Title, description
// - Team members and roles
// - Project type (PAD 1, PAD 2, or both)
// - YouTube video URL
```

### 4. View Own Project

- Each project shows team members
- Comments are loaded from mock data
- Edit/Delete buttons available for project owner

### 5. View Other Projects

- Browse all projects from other users
- Filter by project type (PAD 1, PAD 2)
- View project details and team composition
- Read comments from other users

### 6. Edit Project

- Update project details
- Changes are reflected in mock data
- Can be reverted by refreshing

### 7. Change Profile Picture

- Update user profile
- Mock implementation stores changes temporarily

### 8. Logout (Rainard)

- Clears authentication context
- Returns to login screen

## Environment Configuration

### Using Mock Data (Default)

```bash
# The app uses mock data by default
# No environment variables needed
npm run dev
```

### Switching to Real Backend (Future)

Create a `.env` file:

```env
VITE_API_MODE=real
VITE_BACKEND_URL=http://localhost:8000/api
```

## Mock Data Limitations

1. **Data Persistence**: Mock data resets on page refresh
2. **No Real Authentication**: All @mail.ugm.ac.id emails are accepted
3. **No File Uploads**: Profile pictures use mock URLs
4. **No Real-time Updates**: No WebSocket support

## Pages to Test (5+ pages requirement)

1. **Login Page** (`/login`)
   - Test with different emails
   - Test @mail.ugm.ac.id requirement

2. **Home Page** (`/`)
   - Project listing with pagination
   - Project filtering

3. **Projects Page** (`/Project`)
   - Browse all projects
   - Filter by project type
   - Sort by date

4. **Project Details** (`/Project/:id`)
   - View project information
   - View team members
   - View comments

5. **User Dashboard** (`/admin/dashboard`)
   - View user's projects
   - Project management options

6. **User Profile** (`/Mahasiswa/:id`)
   - View user information
   - Edit profile (optional)

7. **Edit Project** (`/Mahasiswa/:id/editProject/new`)
   - Create/Edit project
   - Manage team members

## BDD Test Structure (Cucumber/Gherkin)

### Example Feature: Login Flow

```gherkin
Feature: User Authentication
  Background:
    Given the user is on the login page

  Scenario: Successful login with valid UGM email
    When the user enters "rainard@mail.ugm.ac.id"
    And the user clicks the login button
    Then the user should be redirected to the home page
    And the user should see their profile information

  Scenario: Failed login with invalid email domain
    When the user enters "user@gmail.com"
    And the user clicks the login button
    Then the user should see an error message
    And the user should remain on the login page
```

### Example Feature: Project Viewing

```gherkin
Feature: View Projects
  Background:
    Given the user is logged in as "erico@mail.ugm.ac.id"

  Scenario: User views their own projects
    When the user navigates to the dashboard
    Then the user should see projects they are assigned to
    And the user should see edit and delete options

  Scenario: User views other projects
    When the user navigates to the projects page
    Then the user should see all available projects
    And the user should see project details
    And the user should NOT see edit or delete options
```

## Testing Commands

### Run Application with Mock Data

```bash
npm run dev
```

### Build for Testing

```bash
npm run build
```

### Run Linter

```bash
npm run lint
```

## Integration Steps

1. **Install Test Framework**

   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```

2. **Configure Vitest** (add to `vite.config.js`)

   ```javascript
   export default defineConfig({
     test: {
       globals: true,
       environment: "jsdom",
       setupFiles: "./src/test/setup.js",
     },
   });
   ```

3. **Write Tests** using POM pattern:

   ```javascript
   // pages/LoginPage.js (Page Object Model)
   export class LoginPage {
     constructor(page) {
       this.page = page;
     }

     async login(email) {
       await this.page.fill('input[name="email"]', email);
       await this.page.click('button[type="submit"]');
     }

     async isOnHomePage() {
       return await this.page.url().includes("/");
     }
   }
   ```

## Next Steps

1. Set up Cypress or Playwright for E2E testing
2. Create test cases using BVA and Equivalence Partitioning
3. Implement Page Object Model for maintainability
4. Write Gherkin scenarios
5. Generate automated bug reports

## Contact & Support

For issues with mock data:

1. Check `src/services/mockApiService.js` for available endpoints
2. Review mock data files in `src/Mock/`
3. Check browser console for API logs (enabled by default)
