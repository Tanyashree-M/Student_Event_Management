// src/types/index.ts
// All shared TypeScript types used across the project

export type FacultyData = {
  facultyId: string;
  facultyName: string;
};

export type Event = {
  id: string;
  studName: string;
  rollNo: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
  facultyId: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  facultyId: string; 
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
};

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

export type PasswordStrength = {
  level: number;
  label: string;
  color: string;
};

export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export type Department = {
  value: string;
  label: string;
};
