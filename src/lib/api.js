const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const SKILLS_CACHE_TTL_MS = 5 * 60 * 1000;

const skillsCache = new Map();

const toApiUrl = (path) => `${API_BASE_URL}${path}`;

const skillCacheKey = (category) => (category ? `category:${category}` : "all");

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

const getSkillsFromApi = (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/api/skills${query}`);
};

const invalidateSkillsCache = () => {
  skillsCache.clear();
};

const getCachedSkills = (category, options = {}) => {
  const key = skillCacheKey(category);
  const now = Date.now();
  const force = Boolean(options.force);

  if (force) {
    skillsCache.delete(key);
  }

  const entry = skillsCache.get(key);

  if (entry?.data && now - entry.timestamp < SKILLS_CACHE_TTL_MS) {
    return Promise.resolve(entry.data);
  }

  if (entry?.promise) {
    return entry.promise;
  }

  const promise = getSkillsFromApi(category)
    .then((data) => {
      skillsCache.set(key, {
        data,
        timestamp: Date.now(),
        promise: null,
      });

      return data;
    })
    .catch((error) => {
      if (!entry?.data) {
        skillsCache.delete(key);
        throw error;
      }

      skillsCache.set(key, {
        data: entry.data,
        timestamp: entry.timestamp,
        promise: null,
      });

      return entry.data;
    });

  skillsCache.set(key, {
    data: entry?.data ?? null,
    timestamp: entry?.timestamp ?? 0,
    promise,
  });

  return promise;
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

  uploadProjectImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return request("/api/uploads/image", {
      method: "POST",
      body: formData,
    });
  },

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

  getSkills: (category, options) => getCachedSkills(category, options),

  invalidateSkillsCache,

  addSkill: (payload) =>
    request("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((response) => {
      invalidateSkillsCache();
      return response;
    }),

  deleteSkill: (id) =>
    request(`/api/skills/${id}`, {
      method: "DELETE",
    }).then((response) => {
      invalidateSkillsCache();
      return response;
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
