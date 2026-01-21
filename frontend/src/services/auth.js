import axios from "axios";

export async function login(email, password) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/auth/login", { email, password });
    return response.data; // should contain token
  } catch (error) {
    throw error.response?.data?.detail || "Login failed";
  }
}


export function getToken() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}