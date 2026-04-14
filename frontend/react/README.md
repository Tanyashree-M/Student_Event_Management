# 🎓 Student Event Manager — TypeScript Version

Full-stack ready React + TypeScript frontend for Faculty Login, Registration, and Dashboard.

## 🚀 Quick Start

```bash
cd student-event-manager-ts
npm install
npm start
```
Opens at **http://localhost:3000**

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── FloatInput.tsx           ← Animated floating-label input
│   ├── GradientButton.tsx       ← Gradient button with loading state
│   ├── Toast.tsx                ← Toast notifications + useToast hook
│   ├── ForgotPasswordModal.tsx  ← Password reset modal
│   └── BrandPanel.tsx           ← Left branding panel
├── pages/
│   ├── Login.tsx                ← Faculty login page
│   ├── Register.tsx             ← Faculty registration page
│   └── FacultyDashboard.tsx     ← Dashboard with CRUD (teammate's file)
├── utils/
│   ├── validate.ts              ← Form validation
│   └── api.ts                   ← REST API helpers
├── types/
│   └── index.ts                 ← All shared TypeScript types
├── App.tsx                      ← Routes
├── index.tsx                    ← Entry point
└── index.css                    ← Tailwind + global styles
```

---

## 🔗 Login → Dashboard Flow

```
User logs in at /login
       ↓
facultyData = { facultyId, facultyName }
       ↓
navigate("/dashboard", { state: { facultyData } })
       ↓
FacultyDashboard reads location.state.facultyData
       ↓
Displays faculty name + filters events by facultyId
```

---

## 🔌 Connect Java Servlet Backend

Update base URL in `src/utils/api.ts`:
```ts
const BASE_URL = "http://localhost:8083";
```

In `Login.tsx`, uncomment the real API block:
```ts
const result = await loginFaculty({ email: form.email, password: form.password });
const facultyData: FacultyData = {
  facultyId:   result.data!.faculty.facultyId,
  facultyName: result.data!.faculty.facultyName,
};
```

---

## 🌐 Routes

| Route        | Page               |
|--------------|--------------------|
| `/login`     | Faculty Login      |
| `/register`  | Faculty Register   |
| `/dashboard` | Faculty Dashboard  |
