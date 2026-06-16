# Implementation Summary: Mock Data Integration

## Project: PAD Platform Testing Setup

**Date**: 2026-06-07
**Status**: ✅ Complete and Ready for Testing

---

## What Was Done

### 1. ✅ Created Mock API Service Layer

**File**: `src/services/mockApiService.js`

Implemented complete mock API that replaces backend calls with:

- **Projects**: Get all, get paginated, get by ID, create, update, delete
- **Users**: Get all, get by ID, update profile
- **Comments**: Get by project ID, post comment, delete comment
- **Simulation**: Network delay (300ms) for realistic testing

**Key Features**:

- Filtering by project type (PAD 1, PAD 2)
- Sorting (newest, oldest)
- Pagination (10 items per page)
- Data persistence during session

### 2. ✅ Updated API Integration Files

**Files Modified**:

- `src/component/Logic/HomeApiData.js` - Now uses mock API
- `src/component/Logic/AccountInfo.js` - Now uses mock API
- `src/services/AuthService.js` - Already using mock (no changes needed)

**What Changed**: All axios backend calls replaced with mock API service calls

### 3. ✅ Enhanced Mock Data

**Files Updated**:

- `src/Mock/users.json` - Expanded from 2 to 6 test users
- `src/Mock/projects.json` - Expanded from 2 to 7 test projects
- `src/Mock/comments.json` - Expanded from 1 to 6 test comments
- `src/Mock/userprojects.json` - Updated with complete relationships

**Test Data Available**:

- 6 test users (including Rainard & Erico)
- 7 test projects (PAD 1, PAD 2, and mixed types)
- 6 sample comments
- Complete user-project relationships

### 4. ✅ Created Configuration System

**File**: `src/config/apiConfig.js`

Enables easy switching between:

- Mock mode (default) - For testing
- Real backend mode - For production

Environment variables supported:

- `VITE_API_MODE` - Set to 'mock' or 'real'
- `VITE_BACKEND_URL` - Real backend URL
- `VITE_MOCK_DELAY` - Mock API delay in ms
- `VITE_LOG_API_CALLS` - Enable API logging

### 5. ✅ Created Page Object Models

**Files Created**:

- `src/test/pages/LoginPage.js` - Login page automation
- `src/test/pages/ProjectsPage.js` - Projects listing automation
- `src/test/pages/ProjectDetailsPage.js` - Project details automation

**POM Features**:

- Reusable selectors
- Encapsulated actions
- Built-in assertions/verifications
- Ready for Cypress/Playwright integration

### 6. ✅ Created BDD Test Scenarios

**Gherkin Feature Files**:

- `src/test/features/login.feature` - 5 login scenarios
- `src/test/features/projects.feature` - 7 project viewing scenarios
- `src/test/features/projectDetails.feature` - 9 detail/interaction scenarios

**Scenarios Cover**:

- Boundary Value Analysis (BVA)
- Equivalence Partitioning (EP)
- Authorization testing
- Data persistence testing

### 7. ✅ Created Step Definitions

**File**: `src/test/steps/loginSteps.js`

Example step definitions showing how to:

- Navigate pages
- Fill forms
- Handle assertions
- Work with local storage
- Manage network delays

### 8. ✅ Created Comprehensive Documentation

#### Testing Guides:

- **TESTING_README.md** - Quick start guide for team
- **TESTING_GUIDE.md** - Detailed testing setup
- **TEST_CASES.md** - Complete test case documentation

#### Test Configuration:

- **src/test/setup.js** - Vitest/Jest configuration

#### Templates & Examples:

- Page Object Model templates (3 pages)
- Step definition examples
- BDD scenario examples
- Bug report template

---

## Architecture Overview

```
Application Flow:
┌─────────────────────────────────────────────────────┐
│         React Components (UI Layer)                 │
│  (Login, Projects, Details, Comments, etc.)         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│    Component Logic Files (API Calls)                │
│  - HomeApiData.js                                   │
│  - AccountInfo.js                                   │
│  - AuthService.js                                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│      Mock API Service Layer                         │
│  (mockApiService.js)                                │
│  ✓ Projects CRUD                                    │
│  ✓ Users CRUD                                       │
│  ✓ Comments CRUD                                    │
│  ✓ Filtering & Pagination                           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│           Mock Data (JSON Files)                    │
│  - projects.json (7 projects)                       │
│  - users.json (6 users)                             │
│  - comments.json (6 comments)                       │
│  - userprojects.json (relationships)                │
└─────────────────────────────────────────────────────┘
```

---

## File Structure Changes

```
src/
├── services/
│   ├── mockApiService.js (NEW) ✨
│   ├── AuthService.js (UPDATED)
│   └── AuthContext.jsx
├── component/
│   └── Logic/
│       ├── HomeApiData.js (UPDATED)
│       └── AccountInfo.js (UPDATED)
├── config/
│   └── apiConfig.js (NEW) ✨
├── Mock/
│   ├── users.json (ENHANCED)
│   ├── projects.json (ENHANCED)
│   ├── comments.json (ENHANCED)
│   └── userprojects.json (ENHANCED)
└── test/ (NEW) ✨
    ├── pages/
    │   ├── LoginPage.js
    │   ├── ProjectsPage.js
    │   └── ProjectDetailsPage.js
    ├── steps/
    │   └── loginSteps.js
    ├── features/
    │   ├── login.feature
    │   ├── projects.feature
    │   └── projectDetails.feature
    └── setup.js

Documentation/ (NEW) ✨
├── TESTING_README.md
├── TESTING_GUIDE.md
├── TEST_CASES.md
└── Implementation Summary (this file)
```

---

## Available Test Users

### 1. Rainard

- **Email**: rainard@mail.ugm.ac.id
- **Role**: Testing Lead & QA Specialist
- **Projects**: Smart Farming IoT (ID: 2), Learning Management System (ID: 6)
- **User ID**: 3

### 2. Erico

- **Email**: erico@mail.ugm.ac.id
- **Role**: Full Stack Developer & UI/UX Designer
- **Projects**: E-Commerce (ID: 3), AI Chatbot (ID: 4), Real Estate (ID: 7)
- **User ID**: 4

### 3. Budi Utomo

- **Email**: delvianokhayruattahira@mail.ugm.ac.id
- **Role**: Frontend Developer
- **Projects**: SimPAD (ID: 1), LMS (ID: 6), Real Estate (ID: 7)
- **User ID**: 1

### Other Users

- Siti Aminah (Admin) - siti.aminah@mail.ugm.ac.id
- Ahmad Rizki - ahmadrizki@mail.ugm.ac.id
- Nadia Putri - nadiaputri@mail.ugm.ac.id

---

## Available Test Projects

| ID  | Title                      | Type      | Users         |
| --- | -------------------------- | --------- | ------------- |
| 1   | SimPAD Project Tracking    | PAD 2     | Budi, Siti    |
| 2   | Smart Farming IoT          | PAD 1 & 2 | Rainard       |
| 3   | E-Commerce Platform        | PAD 1     | Erico, Ahmad  |
| 4   | AI Chatbot                 | PAD 2     | Erico, Nadia  |
| 5   | Mobile Health Tracker      | PAD 1     | Nadia, Ahmad  |
| 6   | Learning Management System | PAD 1 & 2 | Budi, Rainard |
| 7   | Real Estate Portal         | PAD 2     | Erico, Budi   |

---

## Testing Features Available

### ✅ Login Testing

- Valid UGM email login
- Invalid domain rejection
- Unregistered email handling
- Token generation
- Logout functionality

### ✅ Project Browsing

- View all projects
- Filter by type (PAD 1, PAD 2)
- Sort by date (newest, oldest)
- Pagination
- Search functionality

### ✅ Project Details

- View project information
- See team members
- Display comments
- Post comments
- Edit own projects
- Delete own projects

### ✅ User Profile

- View user information
- Update profile
- View user's projects
- Change profile picture (mock)

---

## How to Run

### 1. Start Development Server

```bash
cd /home/denod/PAD1/frontend
npm run dev
```

Application will run at: `http://localhost:5173`

### 2. Access Login Page

```
http://localhost:5173/login
```

### 3. Login with Test Account

- Email: `rainard@mail.ugm.ac.id` (or any test email)
- Password: Not required

### 4. Navigate Features

- **Home** (`/`) - Browse all projects
- **Projects** (`/Project`) - Filter and sort projects
- **Project Details** (`/Project/:id`) - View project information
- **User Profile** (`/Mahasiswa/:id`) - View user information
- **Create Project** - Add new project to mock data

---

## Testing Framework Integration

### For Cypress Testing

```bash
npm install --save-dev cypress
npx cypress open
```

### For Playwright Testing

```bash
npm install --save-dev @playwright/test
npx playwright test
```

### For BDD with Cucumber

```bash
npm install --save-dev @cucumber/cucumber
npx cucumber-js
```

### For Unit Testing (Vitest)

```bash
npm install --save-dev vitest @testing-library/react
npm run test
```

---

## Test Case Metrics

| Category           | Count  | Status     |
| ------------------ | ------ | ---------- |
| Login Test Cases   | 7      | ⏳ Pending |
| Project Test Cases | 8      | ⏳ Pending |
| Details Test Cases | 6      | ⏳ Pending |
| Comment Test Cases | 5      | ⏳ Pending |
| E2E Workflows      | 2      | ⏳ Pending |
| **TOTAL**          | **28** | ⏳ Pending |

---

## Testing Techniques Used

### 1. Boundary Value Analysis (BVA)

- Empty field testing
- Valid/invalid boundaries
- First/last page navigation
- Character limits for comments

### 2. Equivalence Partitioning (EP)

- Valid vs invalid email domains
- Project type filtering
- Sort order variations
- Team member counts

### 3. Page Object Model (POM)

- Reusable page components
- Encapsulation of selectors
- Shared action methods
- Maintainable test code

### 4. BDD with Gherkin

- Human-readable scenarios
- Stakeholder involvement
- Clear test documentation
- Feature coverage mapping

---

## Success Criteria ✅

- [x] Application runs without backend connection
- [x] Mock data is comprehensive and realistic
- [x] 5+ web pages available for testing
- [x] Test users and projects defined
- [x] Page Object Models created
- [x] BDD scenarios written (Gherkin)
- [x] Test case documentation complete
- [x] Bug report template created
- [x] Team can independently run tests
- [x] Testing framework integration ready

---

## Next Steps for Team

### Week 1: Setup & Familiarization

- [ ] Clone repository and run `npm install`
- [ ] Start app with `npm run dev`
- [ ] Test login with different accounts
- [ ] Explore 5+ pages
- [ ] Report any issues

### Week 2: Manual Testing

- [ ] Execute all 28 test cases manually
- [ ] Document results in TEST_CASES.md
- [ ] File bugs using bug report template
- [ ] Verify fixes

### Week 3: Automated Testing

- [ ] Set up test framework (Cypress/Playwright)
- [ ] Implement login tests
- [ ] Implement project tests
- [ ] Execute automated test suite

### Week 4: BDD & Documentation

- [ ] Convert manual tests to Gherkin scenarios
- [ ] Implement step definitions
- [ ] Create Cucumber test report
- [ ] Finalize bug report list

---

## Key Files Location

| File                             | Purpose                  |
| -------------------------------- | ------------------------ |
| `src/services/mockApiService.js` | Mock API implementation  |
| `src/config/apiConfig.js`        | API configuration        |
| `src/Mock/*.json`                | Test data                |
| `src/test/pages/*.js`            | Page Object Models       |
| `src/test/steps/*.js`            | BDD step definitions     |
| `src/test/features/*.feature`    | Gherkin scenarios        |
| `TESTING_README.md`              | Quick start guide        |
| `TESTING_GUIDE.md`               | Detailed documentation   |
| `TEST_CASES.md`                  | Test case specifications |

---

## Support & Troubleshooting

### Issue: "Cannot find module mockApiService"

```bash
# Clear cache
npm run dev
# Refresh browser
```

### Issue: Login not working

- Verify email ends with `@mail.ugm.ac.id`
- Check if email exists in `src/Mock/users.json`
- Open DevTools → Console to check errors

### Issue: Mock data not showing

1. Check `src/Mock/` JSON files are valid
2. Verify `mockApiService.js` is imported
3. Check browser console for errors

### Issue: Tests won't run

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

---

## Project Status

✅ **READY FOR TESTING PHASE**

All required components are in place:

- Mock data integration
- API service layer
- Test infrastructure
- Documentation
- Team resource allocation templates

The application is now completely decoupled from the backend and ready for comprehensive testing with mock data.

---

**Last Updated**: 2026-06-07
**Version**: 1.0
**Status**: Complete ✅
