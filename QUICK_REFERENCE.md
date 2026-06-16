# Quick Reference Card - Testing Setup

## 🚀 Getting Started (2 minutes)

```bash
# 1. Navigate to project
cd /home/denod/PAD1/frontend

# 2. Install dependencies (first time only)
npm install

# 3. Start application
npm run dev

# 4. Open browser
http://localhost:5173/login
```

---

## 👥 Test User Credentials

| Name        | Email                                   | Role      | Projects |
| ----------- | --------------------------------------- | --------- | -------- |
| **Rainard** | `rainard@mail.ugm.ac.id`                | QA Lead   | 2, 6     |
| **Erico**   | `erico@mail.ugm.ac.id`                  | Developer | 3, 4, 7  |
| **Budi**    | `delvianokhayruattahira@mail.ugm.ac.id` | Frontend  | 1, 6, 7  |

All emails need `@mail.ugm.ac.id` domain!

---

## 📄 Pages to Test (5+)

1. ✅ **Login** → `/login` - Test authentication
2. ✅ **Home** → `/` - Browse all projects
3. ✅ **Projects** → `/Project` - Filter & sort
4. ✅ **Details** → `/Project/:id` - View project info
5. ✅ **User Profile** → `/Mahasiswa/:id` - User info
6. ✅ **Dashboard** → `/admin/dashboard` - User dashboard
7. ✅ **Edit Project** → `/Mahasiswa/:id/editProject/new` - Create/edit

---

## 🧪 Test Scenarios

### Login (TC_LOGIN_001-007)

- ✓ Valid email → Login success
- ✓ Invalid domain → Error message
- ✓ Unregistered email → "Not registered" error
- ✓ Empty email → Validation error

### Projects (TC_PROJ_001-008)

- ✓ View all projects → 7 projects shown
- ✓ Filter PAD 1 → 3 projects shown
- ✓ Filter PAD 2 → 3 projects shown
- ✓ Sort newest → Latest first
- ✓ Sort oldest → Oldest first

### Details (TC_DETAIL_001-006)

- ✓ View own project → Edit/Delete buttons visible
- ✓ View others' project → No Edit/Delete buttons
- ✓ Team members → Display all correctly
- ✓ Comments → Post and view comments
- ✓ YouTube → Video player shown

---

## 🐛 Bug Report Template

```markdown
**Bug ID**: #[increment]
**Title**: [Brief description]
**Severity**: [Critical|High|Medium|Low]
**Component**: [Login|Projects|Comments|etc]

## Steps to Reproduce:

1. ...
2. ...

## Expected: ...

## Actual: ...

## Environment: [Browser, OS]
```

---

## 📊 Test Metrics

| Metric        | Target | Progress |
| ------------- | ------ | -------- |
| Test Users    | 6+     | ✅ 6     |
| Test Projects | 7+     | ✅ 7     |
| Test Cases    | 28+    | ⏳ 0     |
| Pages Covered | 5+     | ✅ 7     |
| BDD Scenarios | 20+    | ✅ 21    |
| Code Coverage | 70%+   | ⏳ TBD   |

---

## 📚 Documentation Files

- `TESTING_README.md` - Start here!
- `TESTING_GUIDE.md` - Detailed setup
- `TEST_CASES.md` - All test cases
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

## 🔧 Common Commands

```bash
# Start app
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests (after setup)
npm run test

# Clear cache
npm run dev -- --reload
```

---

## 📁 Mock Data Locations

```
src/Mock/
├── users.json          # 6 test users
├── projects.json       # 7 test projects
├── comments.json       # 6 test comments
└── userprojects.json   # User-project links
```

---

## 🧠 Key Concepts

### BVA (Boundary Value Analysis)

- Test at boundaries: empty, minimum, maximum
- Example: Empty email field, very long comment

### Equivalence Partitioning

- Group similar inputs
- Example: UGM emails vs non-UGM emails

### Page Object Model

- Reusable page components
- Encapsulate selectors
- Location: `src/test/pages/`

### BDD (Behavior-Driven Development)

- Write in Gherkin (Given/When/Then)
- Location: `src/test/features/`

---

## ❌ Troubleshooting

| Issue            | Solution                              |
| ---------------- | ------------------------------------- |
| Login fails      | Email must end with `@mail.ugm.ac.id` |
| Mock data empty  | Refresh browser, check console errors |
| App won't start  | Run `npm install` again               |
| Port 5173 in use | Kill other npm processes              |

---

## ✅ Daily Testing Checklist

- [ ] Start app: `npm run dev`
- [ ] Login test: Try all 3 test users
- [ ] Projects page: Filter, sort, paginate
- [ ] Details page: View, comment, verify
- [ ] Profile page: Check user info
- [ ] Record results: Document findings
- [ ] Report bugs: Use bug template

---

## 🎯 Team Responsibilities

**Rainard**: Login & Logout (TC_LOGIN_001-007)
**Erico**: Projects & Comments (TC_PROJ_001-008, TC_COMM_001-005)
**Other**: Details & E2E flows (TC_DETAIL_001-006, E2E)

---

## 📞 Need Help?

1. Check console: DevTools → Console tab
2. Review logs: Browser console shows API calls
3. Check mock data: `src/Mock/` JSON files
4. Read guides: TESTING_GUIDE.md

---

**Last Updated**: 2026-06-07
**Version**: 1.0 Quick Reference
**Difficulty**: Beginner Friendly ✅
