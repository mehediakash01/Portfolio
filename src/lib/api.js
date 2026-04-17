const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const toApiUrl = (path) => `${API_BASE_URL}${path}`;

const request = (path, options = {}) =>
  fetch(toApiUrl(path), {
    credentials: "include",
    ...options,
  }).then(ensureOk);

const ensureOk = async (response) => {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  let message = "Request failed";

  try {
    const errorBody = await response.json();
    message = errorBody.message || message;
  } catch {
    // no-op
  }

  throw new Error(message);
};

export const api = {
  getProjects: (scope = "public") =>
    request(`/api/projects${scope === "admin" ? "?scope=admin" : ""}`),

  getProjectBySlug: (slug) => request(`/api/projects/${slug}`),

  loginAdmin: (password) =>
    request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }),

  logoutAdmin: () =>
    request("/api/auth/logout", {
      method: "POST",
    }),

  getAdminSession: () => request("/api/auth/session"),

  addProject: (payload) =>
    request("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  deleteProject: (id) =>
    request(`/api/projects/${id}`, {
      method: "DELETE",
    }),

  getSkills: (category) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return request(`/api/skills${query}`);
  },

  addSkill: (payload) =>
    request("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  deleteSkill: (id) =>
    request(`/api/skills/${id}`, {
      method: "DELETE",
    }),

  getAnalyticsOverview: () => request("/api/analytics/overview"),

  trackPageView: (payload) =>
    request("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(payload),
    }),

  analyticsLiveUrl: () => toApiUrl("/api/analytics/live"),
};
