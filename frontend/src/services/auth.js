// frontend/src/services/auth.js
export async function login(email, password) {
  try {
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || 'Login failed');
    return data.token; // backend should return { token: "..." }
  } catch (err) {
    throw err;
  }
}
