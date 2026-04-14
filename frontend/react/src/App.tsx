// src/App.tsx
/*import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login            from "./pages/faculty/Login";
import Register         from "./pages/faculty/Register";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Navigate to="/login" replace />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<FacultyDashboard />} />
        <Route path="*"          element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}*/

// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Common
import Welcome from "./pages/Welcome";

// Student
import StudentRegister from "./pages/student/Register";
import StudentLogin from "./pages/student/Login";
import Events from "./pages/student/Events";

// Faculty
import FacultyLogin from "./pages/faculty/Login";
import FacultyRegister from "./pages/faculty/Register";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Common Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Student Routes */}
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/events" element={<Events />} />

        {/* Faculty Routes */}
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route path="/faculty/register" element={<FacultyRegister />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
