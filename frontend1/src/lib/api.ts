export const API_URL = "http://127.0.0.1:8000/api";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
    
    // Auto-login for demo purposes
    if (!token && endpoint !== "/auth/login/access-token") {
      const isCEO = window.location.pathname.startsWith("/admin");
      const username = isCEO ? "ceo@glow.com" : "owner@glow.com";
      const password = isCEO ? "admin123" : "owner123";
      
      try {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);
        
        const loginRes = await fetch(`${API_URL}/auth/login/access-token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString()
        });
        
        if (loginRes.ok) {
          const data = await loginRes.json();
          token = data.access_token;
          localStorage.setItem("access_token", token);
        }
      } catch (e) {
        console.error("Auto-login failed", e);
      }
    }
  }
  
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
  
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Request failed with status ${res.status}`);
  }
  
  return res.json();
}
