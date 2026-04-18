const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const toApiUrl = (path) => `${API_BASE_URL}${path}`;

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
    fetch(toApiUrl(`/api/projects${scope === "admin" ? "?scope=admin" : ""}`)).then(ensureOk),

  getProjectBySlug: (slug) => fetch(toApiUrl(`/api/projects/${slug}`)).then(ensureOk),

  addProject: (payload) =>
    fetch(toApiUrl("/api/projects"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(ensureOk),

  deleteProject: (id) =>
    fetch(toApiUrl(`/api/projects/${id}`), {
      method: "DELETE",
    }).then(ensureOk),

  getSkills: (category) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return fetch(toApiUrl(`/api/skills${query}`)).then(ensureOk);
  },

  addSkill: (payload) =>
    fetch(toApiUrl("/api/skills"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(ensureOk),

  deleteSkill: (id) =>
    fetch(toApiUrl(`/api/skills/${id}`), {
      method: "DELETE",
    }).then(ensureOk),

  getAnalyticsOverview: () => fetch(toApiUrl("/api/analytics/overview")).then(ensureOk),

  trackPageView: (payload) =>
    fetch(toApiUrl("/api/analytics/event"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(payload),
    }).then(ensureOk),

  analyticsLiveUrl: () => toApiUrl("/api/analytics/live"),
};
