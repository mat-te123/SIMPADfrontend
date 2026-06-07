# Test Case Documentation

## Software Testing Practicum Final Project

### Project: PAD Platform (Student Project Management)

**Test Scope**: Login → View Projects → View Project Details → Comment → Manage Projects

---

## 1. LOGIN FUNCTIONALITY TEST CASES

### Test Technique: Boundary Value Analysis (BVA) + Equivalence Partitioning

#### Equivalence Classes:

- **EC1**: Valid UGM email (registered user)
- **EC2**: Valid UGM email (unregistered user)
- **EC3**: Invalid domain email
- **EC4**: Invalid email format
- **EC5**: Empty email field

#### Test Cases:

| Test ID      | Equivalence Class        | Test Data                | Expected Result                             | Test Type      | Status     |
| ------------ | ------------------------ | ------------------------ | ------------------------------------------- | -------------- | ---------- |
| TC_LOGIN_001 | EC1 - Valid/Registered   | `rainard@mail.ugm.ac.id` | Login successful, redirected to home        | BVA - Valid    | ⏳ Pending |
| TC_LOGIN_002 | EC1 - Valid/Registered   | `erico@mail.ugm.ac.id`   | Login successful, redirected to home        | BVA - Valid    | ⏳ Pending |
| TC_LOGIN_003 | EC2 - Valid/Unregistered | `unknown@mail.ugm.ac.id` | Error: "not registered"                     | BVA - Boundary | ⏳ Pending |
| TC_LOGIN_004 | EC3 - Invalid Domain     | `user@gmail.com`         | Error: "only available for @mail.ugm.ac.id" | Equivalence    | ⏳ Pending |
| TC_LOGIN_005 | EC3 - Invalid Domain     | `user@yahoo.com`         | Error: "only available for @mail.ugm.ac.id" | Equivalence    | ⏳ Pending |
| TC_LOGIN_006 | EC4 - Invalid Format     | `notanemail`             | Error message shown                         | Equivalence    | ⏳ Pending |
| TC_LOGIN_007 | EC5 - Empty Field        | ``                       | Error or no action                          | BVA - Boundary | ⏳ Pending |

---

## 2. PROJECT LISTING TEST CASES

### Test Technique: Equivalence Partitioning + Boundary Value Analysis

#### Equivalence Classes:

- **EC1**: Filtering by project type (PAD 1)
- **EC2**: Filtering by project type (PAD 2)
- **EC3**: Sorting by newest
- **EC4**: Sorting by oldest
- **EC5**: Pagination (first page)
- **EC6**: Pagination (middle page)
- **EC7**: Combined filters

#### Test Cases:

| Test ID     | Scenario             | Action                | Expected Result                         | Test Type      | Status     |
| ----------- | -------------------- | --------------------- | --------------------------------------- | -------------- | ---------- |
| TC_PROJ_001 | Display all projects | Load /Project         | Display 7 projects                      | Baseline       | ⏳ Pending |
| TC_PROJ_002 | Filter PAD 1         | Select "PAD 1" filter | Show 3 PAD 1 projects                   | Equivalence    | ⏳ Pending |
| TC_PROJ_003 | Filter PAD 2         | Select "PAD 2" filter | Show 3 PAD 2 projects                   | Equivalence    | ⏳ Pending |
| TC_PROJ_004 | Sort newest          | Click "Newest"        | Projects sorted by creation date (desc) | BVA            | ⏳ Pending |
| TC_PROJ_005 | Sort oldest          | Click "Oldest"        | Projects sorted by creation date (asc)  | BVA            | ⏳ Pending |
| TC_PROJ_006 | Pagination - First   | Load page 1           | Show projects 1-10                      | BVA - Boundary | ⏳ Pending |
| TC_PROJ_007 | Pagination - Next    | Click "Next"          | Show projects 11-20                     | BVA - Boundary | ⏳ Pending |
| TC_PROJ_008 | Combine filters      | PAD1 + Newest         | Show PAD1 projects sorted newest        | Equivalence    | ⏳ Pending |

---

## 3. PROJECT DETAILS TEST CASES

### Test Technique: Equivalence Partitioning + Boundary Value Analysis

#### Equivalence Classes:

- **EC1**: View own project (as owner)
- **EC2**: View others' project (as member)
- **EC3**: View any project (as logged in user)
- **EC4**: Team members display (1 member)
- **EC5**: Team members display (multiple members)

#### Test Cases:

| Test ID       | Scenario                | Action                       | Expected Result                         | Test Type      | Status     |
| ------------- | ----------------------- | ---------------------------- | --------------------------------------- | -------------- | ---------- |
| TC_DETAIL_001 | View own project        | Click project owned by user  | Show full details + Edit/Delete buttons | EC1 - Valid    | ⏳ Pending |
| TC_DETAIL_002 | View other's project    | Click project not owned      | Show details, NO Edit/Delete buttons    | EC2 - Valid    | ⏳ Pending |
| TC_DETAIL_003 | Display project info    | Open project                 | Show title, description, team, comments | Baseline       | ⏳ Pending |
| TC_DETAIL_004 | Team members - Single   | View project with 1 member   | Display 1 team member correctly         | BVA - Boundary | ⏳ Pending |
| TC_DETAIL_005 | Team members - Multiple | View project with 2+ members | Display all members with roles          | Equivalence    | ⏳ Pending |
| TC_DETAIL_006 | YouTube player          | Project with youtube_url     | Display embedded YouTube player         | Content        | ⏳ Pending |

---

## 4. COMMENTS TEST CASES

### Test Technique: Boundary Value Analysis

#### Equivalence Classes:

- **EC1**: Valid comment (50 chars)
- **EC2**: Very long comment (500 chars)
- **EC3**: Empty comment
- **EC4**: Special characters

#### Test Cases:

| Test ID     | Comment Text        | Expected Result               | Test Type      | Status     |
| ----------- | ------------------- | ----------------------------- | -------------- | ---------- |
| TC_COMM_001 | "Great project!"    | Comment posted successfully   | BVA - Valid    | ⏳ Pending |
| TC_COMM_002 | 500-char message    | Comment posted successfully   | BVA - Long     | ⏳ Pending |
| TC_COMM_003 | "" (empty)          | Error: "Comment required"     | BVA - Boundary | ⏳ Pending |
| TC_COMM_004 | "Nice! 🎉 <script>" | Comment posted with text only | Security       | ⏳ Pending |
| TC_COMM_005 | Whitespace only     | Error: "Invalid comment"      | BVA - Boundary | ⏳ Pending |

---

## 5. COMPLETE USER FLOW TEST CASES

### End-to-End Scenarios

#### User Flow 1: Rainard (Login & Create Project)

```gherkin
Scenario: Rainard completes full workflow
  1. Login with rainard@mail.ugm.ac.id
  2. View existing projects
  3. Create new project
  4. View created project
  5. Post comment on own project
  6. Logout
```

#### User Flow 2: Erico (View & Filter Projects)

```gherkin
Scenario: Erico views and comments on projects
  1. Login with erico@mail.ugm.ac.id
  2. Filter projects by PAD 1
  3. Click on project details
  4. View team members
  5. Post comment
  6. View own projects
  7. Logout
```

---

## Test Execution Strategy

### Phase 1: Unit Testing (Mock Data Validation)

- Verify mock data structure
- Test data retrieval functions
- Validate API service layer

### Phase 2: Integration Testing (Page Object Model)

- Test page interactions
- Verify data flow
- Test component integration

### Phase 3: E2E Testing (Cucumber/BDD)

- Execute Gherkin scenarios
- Test complete user flows
- Validate business requirements

---

## Test Data

### Test Users:

1. **Rainard** (rainard@mail.ugm.ac.id) - Projects: 2, 6
2. **Erico** (erico@mail.ugm.ac.id) - Projects: 3, 4, 7
3. **Budi Utomo** (delvianokhayruattahira@mail.ugm.ac.id) - Projects: 1, 6, 7
4. **Unregistered** (unknown@mail.ugm.ac.id) - Should fail login

### Test Projects:

1. SimPAD Project Tracking (PAD 2)
2. Smart Farming IoT (PAD 1 & 2)
3. E-Commerce Redesign (PAD 1)
4. AI Chatbot (PAD 2)
5. Mobile Health Tracker (PAD 1)
6. Learning Management System (PAD 1 & 2)
7. Real Estate Portal (PAD 2)

---

## Bug Report Template

```markdown
# Bug Report #[ID]

**Title**: [Brief description]
**Severity**: [Critical | High | Medium | Low]
**Component**: [Login | Projects | Comments | etc]
**Environment**: [Browser, Version, OS]

## Steps to Reproduce:

1. ...
2. ...
3. ...

## Expected Result:

...

## Actual Result:

...

## Attachments:

[Screenshots, Videos, Logs]

## Root Cause:

...

## Suggested Fix:

...
```

---

## Test Coverage Target

- **Functional Coverage**: 100%
- **Code Coverage**: 70%+
- **Page Coverage**: 5+ pages ✓
- **User Flows**: 2+ flows
- **Test Cases**: 20+
- **Features Tested**: Login, View Projects, Details, Comments, Management

---

## Test Execution Summary

| Module    | Test Cases | Passed | Failed | Status     |
| --------- | ---------- | ------ | ------ | ---------- |
| Login     | 7          | 0      | 0      | ⏳ Pending |
| Projects  | 8          | 0      | 0      | ⏳ Pending |
| Details   | 6          | 0      | 0      | ⏳ Pending |
| Comments  | 5          | 0      | 0      | ⏳ Pending |
| E2E Flows | 2          | 0      | 0      | ⏳ Pending |
| **TOTAL** | **28**     | **0**  | **0**  | ⏳ Pending |
