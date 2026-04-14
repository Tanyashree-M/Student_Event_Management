// src/utils/api.ts
import type { ApiResponse, FacultyData } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8083";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const config: RequestInit = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Server error: ${res.status}`);
    return { ok: true, data };
  } catch (err: any) {
    return { ok: false, error: err.message || "Network error. Please try again." };
  }
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  department: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  faculty: FacultyData;
};

export function registerFaculty(payload: RegisterPayload) {
  return request("/register", { method: "POST", body: JSON.stringify(payload) });
}

export function loginFaculty(payload: LoginPayload) {
  return request<LoginResponse>("/login", { method: "POST", body: JSON.stringify(payload) });
}

export function saveToken(token: string): void {
  localStorage.setItem("sem_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("sem_token");
}

export function clearToken(): void {
  localStorage.removeItem("sem_token");
  localStorage.removeItem("sem_remember");
}
