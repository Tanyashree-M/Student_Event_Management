// src/pages/Login.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatInput from "../../components/FloatInput";
import GradientButton from "../../components/GradientButton";
import BrandPanel from "../../components/BrandPanel";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { ToastContainer, useToast } from "../../components/Toast";
import { validateLogin } from "../../utils/validate";
import type { LoginForm, FacultyData } from "../../types";

export default function Login() {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  const [form, setForm]             = useState<LoginForm>({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors]         = useState<Partial<LoginForm & { general: string }>>({});
  const [loading, setLoading]       = useState<boolean>(false);
  const [showModal, setShowModal]   = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("sem_remember");
    if (saved) setForm((f) => ({ ...f, email: saved }));
  }, []);

  const handleChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errs = validateLogin(form);
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:8083/faculty/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      setErrors({ general: "Invalid email or password" });
      addToast("Invalid credentials", "error");
      return;
    }

    const data = await res.json();

    // ✅ Backend returns full FacultyModel
    const facultyData: FacultyData = {
      facultyId: data.facultyId,
      facultyName: data.facultyName,
    };

    // Save login session
    localStorage.setItem("faculty", JSON.stringify(facultyData));

    if (rememberMe) {
      localStorage.setItem("sem_remember", form.email);
    } else {
      localStorage.removeItem("sem_remember");
    }

    addToast("Welcome back! Loading dashboard…", "success");

    setTimeout(() => {
      navigate("/faculty/dashboard", { state: { facultyData } });
    }, 1200);

  } catch (err) {
    setErrors({ general: "Server error. Try again." });
    addToast("Server error", "error");
  }

  setLoading(false);
};

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <ForgotPasswordModal isOpen={showModal} onClose={() => setShowModal(false)}
        onSubmit={(email) => addToast(`Reset link sent to ${email}`, "success")} />

      <div className="min-h-screen bg-[#0f0a1e] flex">
        <div className="lg:w-5/12 xl:w-1/2 bg-mesh"><BrandPanel /></div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">

            <div className="flex items-center gap-2 mb-8 lg:hidden animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-white text-sm">Student Event Manager</span>
            </div>

            <div className="mb-8 animate-slide-up anim-hidden">
              <h2 className="font-display text-3xl font-bold text-white">Welcome back</h2>
              <p className="text-white/40 mt-1.5 text-sm">Sign in to your faculty account.</p>
            </div>

            <form onSubmit={handleSubmit}
              className="glass rounded-2xl border border-white/8 p-8 space-y-5 shadow-card animate-slide-up anim-hidden delay-100"
              noValidate>

              {errors.general && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {errors.general}
                </div>
              )}

              <FloatInput label="Email Address" type="email" value={form.email}
                onChange={handleChange("email")} error={errors.email}
                name="email" autoComplete="email" required
              />

              <FloatInput label="Password" type="password" value={form.password}
                onChange={handleChange("password")} error={errors.password}
                name="password" autoComplete="current-password" required
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div onClick={() => setRememberMe((p) => !p)}
                    className={`rounded-[5px] border transition-all duration-200 flex items-center justify-center flex-shrink-0 cursor-pointer ${rememberMe ? "bg-brand border-brand shadow-glow" : "border-white/20 hover:border-violet-400"}`}
                    style={{ width: 18, height: 18 }}>
                    {rememberMe && (
                      <svg width="10" height="10" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors select-none">Remember me</span>
                </label>
                <button type="button" onClick={() => setShowModal(true)}
                  className="text-sm text-violet-400 hover:text-violet-200 transition-colors">
                  Forgot password?
                </button>
              </div>

              <GradientButton type="submit" loading={loading} className="w-full mt-1">
                {loading ? "Signing in…" : "Sign In"}
              </GradientButton>

              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-white/30">OR</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <GradientButton variant="outline" type="button" className="w-full gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </GradientButton>
            </form>

            <p className="text-center text-sm text-white/40 mt-6 animate-fade-in delay-300">
              Don't have an account?{" "}
              <Link to="/faculty/register" className="text-violet-400 hover:text-violet-200 transition-colors font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
