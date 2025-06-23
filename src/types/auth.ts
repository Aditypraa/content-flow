// Authentication related types based on API documentation
export interface User {
  id: string;
  username: string;
  role: "User" | "Admin";
  password?: string; // Only included in register response
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  role: "User" | "Admin";
}

export interface LoginResponse {
  token: string;
  role: "User" | "Admin";
}

export interface RegisterResponse {
  id: string;
  username: string;
  role: "User" | "Admin";
  password: string; // Hashed password
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  id: string;
  username: string;
  role: "User" | "Admin";
}

export interface AuthState {
  user: ProfileResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
