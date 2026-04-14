// src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatInput from "../../components/FloatInput";
import GradientButton from "../../components/GradientButton";
import BrandPanel from "../../components/BrandPanel";
import { ToastContainer, useToast } from "../../components/Toast";
import { validateRegister, getPasswordStrength } from "../../utils/validate";
import type { RegisterForm, Department } from "../../types";

const DEPARTMENTS: Department[] = [
  { value: "CSE",   label: "Computer Science & Engineering" },
  { value: "ECE",   label: "Electronics & Communication" },
  { value: "MECH",  label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" },
  { value: "IT",    label: "Information Technology" },
  { value: "EEE",   label: "Electrical & Electronics" },
  { value: "MBA",   label: "Business Administration" },
  { value: "MCA",   label: "Computer Applications" },
  { value: "OTHER", label: "Other" },
];

export default function Register() {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  const [form, setForm] = useState<RegisterForm>({
  facultyId: "",   
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  department: "",
});
  const [errors, setErrors]   = useState<Partial<RegisterForm>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (field: keyof RegisterForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const pwdStrength = form.password ? getPasswordStrength(form.password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errs = validateRegister(form);
  if (Object.keys(errs).length) {
    setErrors(errs);
    addToast("Please fix the errors below.", "error");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:8083/faculty/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facultyId: form.facultyId, 
        facultyName: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      addToast(errorText || "Registration failed", "error");
      setLoading(false);
      return;
    }

    const data = await res.json();

    // ✅ Use backend response (IMPORTANT)
    const facultyData = {
      facultyId: data.facultyId,   
      facultyName: data.facultyName,
    };

    localStorage.setItem("faculty", JSON.stringify(facultyData));

    addToast("Account created! Taking you to dashboard…", "success");

    setTimeout(() => {
      navigate("/faculty/dashboard", { state: { facultyData } });
    }, 1500);

  } catch (err) {
    addToast("Server error. Try again.", "error");
  }

  setLoading(false);
};

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen bg-[#0f0a1e] flex">
        <div className="lg:w-5/12 xl:w-1/2 bg-mesh"><BrandPanel /></div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-white text-sm">Student Event Manager</span>
            </div>

            {/* Header */}
            <div className="mb-8 animate-slide-up anim-hidden">
              <h2 className="font-display text-3xl font-bold text-white">Create account</h2>
              <p className="text-white/40 mt-1.5 text-sm">Join as a faculty member to get started.</p>
            </div>

            {/* Form card */}
            <form onSubmit={handleSubmit}
              className="glass rounded-2xl border border-white/8 p-8 space-y-5 shadow-card animate-slide-up anim-hidden delay-100"
              noValidate>

              <FloatInput
                label="Faculty ID"
                type="text"
                value={form.facultyId}
                onChange={handleChange("facultyId")}
                error={errors.facultyId}
                name="facultyId"
                required
              />

              <FloatInput label="Full Name" type="text" value={form.name}
                onChange={handleChange("name")} error={errors.name}
                name="name" autoComplete="name" required
              />

              <FloatInput label="Email Address" type="email" value={form.email}
                onChange={handleChange("email")} error={errors.email}
                name="email" autoComplete="email" required
              />

              {/* Password + strength meter */}
              <div className="space-y-1.5">
                <FloatInput label="Password" type="password" value={form.password}
                  onChange={handleChange("password")} error={errors.password}
                  name="password" autoComplete="new-password" required
                />
                {pwdStrength && (
                  <div className="px-1">
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i}
                          className={`flex-1 rounded-full transition-all duration-300 ${i <= pwdStrength.level ? pwdStrength.color : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-white/40 mt-1">
                      Strength: <span className="text-white/70">{pwdStrength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              <FloatInput label="Confirm Password" type="password" value={form.confirmPassword}
                onChange={handleChange("confirmPassword")} error={errors.confirmPassword}
                name="confirmPassword" autoComplete="new-password" required
              />

              <FloatInput label="Department" type="select" value={form.department}
                onChange={handleChange("department")} error={errors.department}
                name="department" options={DEPARTMENTS} required
              />

              <GradientButton type="submit" loading={loading} className="w-full mt-2">
                {loading ? "Creating account…" : "Create Account"}
              </GradientButton>
            </form>

            <p className="text-center text-sm text-white/40 mt-6 animate-fade-in delay-300">
              Already have an account?{" "}
              <Link to="/faculty/login" className="text-violet-400 hover:text-violet-200 transition-colors font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
