// src/utils/validate.ts
import type { RegisterForm, LoginForm, PasswordStrength } from "../types";

export function validateRegister(form: RegisterForm): Partial<RegisterForm> {
  const errors: Partial<RegisterForm> = {};
  const { name, email, password, confirmPassword } = form;

  if (!form.facultyId) {
  errors.facultyId = "Faculty ID is required";
}

  if (!name.trim()) {
    errors.name = "Full name is required";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[A-Z])/.test(password)) {
    errors.password = "Include at least one uppercase letter";
  } else if (!/(?=.*[0-9])/.test(password)) {
    errors.password = "Include at least one number";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }


  return errors;
}

export function validateLogin(form: LoginForm): Partial<LoginForm> {
  const errors: Partial<LoginForm> = {};

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8)            score++;
  if (password.length >= 12)           score++;
  if (/[A-Z]/.test(password))          score++;
  if (/[0-9]/.test(password))          score++;
  if (/[^A-Za-z0-9]/.test(password))   score++;

  if (score <= 1) return { level: 1, label: "Weak",        color: "bg-red-500" };
  if (score === 2) return { level: 2, label: "Fair",        color: "bg-amber-500" };
  if (score === 3) return { level: 3, label: "Good",        color: "bg-yellow-400" };
  if (score === 4) return { level: 4, label: "Strong",      color: "bg-green-400" };
  return            { level: 5, label: "Very Strong",   color: "bg-emerald-400" };
}
