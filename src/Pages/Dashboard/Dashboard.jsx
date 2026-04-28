import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { api } from "../../lib/api";
import { ICON_KEYS, resolveIconComponent } from "../../lib/iconMap";
import { SKILL_SECTIONS } from "../../lib/skillsBlueprint";

const initialProjectForm = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  image: "",
  videoPreview: "",
  liveUrl: "",
  githubUrl: "",
  tech: "",
  features: "",
  role: "",
  duration: "",
  glowColor: "from-cyan-500 to-blue-500",
  status: "published",
  featured: false,
};

const initialSkillForm = {
  name: "",
  category: "Frontend Precision",
  detail: "",
  tier: "Primary Stack",
  iconName: "FaReact",
  color: "#61dafb",
  isLearning: false,
  order: 0,
};

const SKILL_TIERS = [
  "Primary Stack",
  "Core Standard",
  "UI Foundation",
  "Runtime",
  "API Layer",
  "Data Access",
  "Data Layer",
  "Daily Driver",
  "Deployment Ops",
  "Rapid Systems",
  "Production Hosting",
  "Active Learning",
  "Blueprint Space",
];

const parseList = (value) =>
  `${value}`
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [overview, setOverview] = useState(null);
  const [live, setLive] = useState({ activeUsersNow: 0, todayVisits: 0 });
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [skillForm, setSkillForm] = useState(initialSkillForm);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authError, setAuthError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const sortedSkills = useMemo(() => {
    const sectionOrder = new Map(SKILL_SECTIONS.map((section, index) => [section.title, index]));

    return [...skills].sort((a, b) => {
      const categoryOrder =
        (sectionOrder.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
        (sectionOrder.get(b.category) ?? Number.MAX_SAFE_INTEGER);

      if (categoryOrder !== 0) {
        return categoryOrder;
      }

      const skillOrder = (a.order ?? 0) - (b.order ?? 0);
      if (skillOrder !== 0) {
        return skillOrder;
      }

      return `${a.name ?? ""}`.localeCompare(`${b.name ?? ""}`);
    });
  }, [skills]);

  const loadAll = async () => {
    setError("");
    const [projectData, skillData, analyticsData] = await Promise.all([
      api.getProjects("admin"),
      api.getSkills(undefined, { force: true }),
      api.getAnalyticsOverview(),
    ]);

    setProjects(projectData);
    setSkills(skillData);
    setOverview(analyticsData);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await api.getAdminSession();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    loadAll().catch((loadError) => {
      if (loadError.message === "Unauthorized") {
        setIsAuthenticated(false);
        setAuthError("Session expired. Please login again.");
        return;
      }

      setError(loadError.message || "Failed to load dashboard data");
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const source = new EventSource(api.analyticsLiveUrl(), { withCredentials: true });

    source.onmessage = (event) => {
      try {
        setLive(JSON.parse(event.data));
      } catch {
        // ignore malformed events
      }
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, [isAuthenticated]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setAuthError("");

    try {
      await api.loginAdmin(password);
      await api.getAdminSession();
      setPassword("");
      setIsAuthenticated(true);
      setError("");
      setSuccess("");
    } catch (loginError) {
      setAuthError(loginError.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      await api.logoutAdmin();
    } finally {
      setBusy(false);
      setIsAuthenticated(false);
      setProjects([]);
      setSkills([]);
      setOverview(null);
      setLive({ activeUsersNow: 0, todayVisits: 0 });
    }
  };

  const refreshAfterMutation = async () => {
    const [projectData, skillData, analyticsData] = await Promise.all([
      api.getProjects("admin"),
      api.getSkills(undefined, { force: true }),
      api.getAnalyticsOverview(),
    ]);
    setProjects(projectData);
    setSkills(skillData);
    setOverview(analyticsData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);

    if (!file) {
      setImagePreview("");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setProjectForm((prev) => ({ ...prev, image: "" }));
  };

  const uploadSelectedImage = async () => {
    if (projectForm.image) {
      return projectForm.image;
    }

    if (!imageFile) {
      throw new Error("Please select a project image");
    }

    setUploadingImage(true);

    try {
      const uploaded = await api.uploadProjectImage(imageFile);
      const imageUrl = uploaded.url;

      setProjectForm((prev) => ({ ...prev, image: imageUrl }));
      return imageUrl;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      const imageUrl = await uploadSelectedImage();

      await api.addProject({
        ...projectForm,
        image: imageUrl,
        tech: parseList(projectForm.tech),
        features: parseList(projectForm.features),
      });

      setProjectForm(initialProjectForm);
      setImageFile(null);
      setImagePreview("");
      await refreshAfterMutation();
      setSuccess("Project added successfully");
    } catch (submitError) {
      setError(submitError.message || "Could not add project");
    } finally {
      setBusy(false);
    }
  };

  const handleSkillSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      await api.addSkill({
        ...skillForm,
        order: Number(skillForm.order),
      });
      setSkillForm(initialSkillForm);
      await refreshAfterMutation();
      setSuccess("Skill added successfully");
    } catch (submitError) {
      setError(submitError.message || "Could not add skill");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteProject = async (id) => {
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      await api.deleteProject(id);
      await refreshAfterMutation();
      setSuccess("Project deleted");
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete project");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      await api.deleteSkill(id);
      await refreshAfterMutation();
      setSuccess("Skill deleted");
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete skill");
    } finally {
      setBusy(false);
    }
  };

  const SelectedSkillIcon = resolveIconComponent(skillForm.iconName);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <p className="text-gray-300">Checking admin session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-10 md:px-8">
        <div className="max-w-lg mx-auto rounded-2xl border border-[#333] bg-[#151515] p-8">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-2">
            Admin Login
          </h1>
          <p className="text-gray-400 mb-6">Enter your admin password to access dashboard.</p>

          {authError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200 mb-4">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Admin password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#007CFF] py-2 font-semibold disabled:opacity-50"
            >
              {busy ? "Signing in..." : "Login"}
            </button>
          </form>

          <Link
            to="/"
            className="inline-block mt-5 text-sm text-[#00ADB5] hover:underline"
          >
            Back To Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-10 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">
              Portfolio Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage projects, skills, and live traffic analytics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
            >
              Back To Portfolio
            </Link>
            <button
              onClick={handleLogout}
              disabled={busy}
              className="px-4 py-2 rounded-lg border border-red-400/40 text-red-300 hover:bg-red-500/10 disabled:opacity-50"
            >
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200">
            {success}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Visits", value: overview?.totalVisits ?? 0 },
            { label: "Unique Visitors", value: overview?.uniqueVisitors ?? 0 },
            { label: "Active Users Now", value: live.activeUsersNow ?? 0 },
            { label: "Today Visits", value: live.todayVisits || overview?.todayVisits || 0 },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-[#333] bg-[#151515] p-5"
            >
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-3xl font-semibold mt-2">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-xl border border-[#333] bg-[#151515] p-6">
            <h2 className="text-xl font-semibold mb-4">Top Pages</h2>
            <div className="space-y-3">
              {(overview?.topPages || []).map((page) => (
                <div key={page.path} className="flex items-center justify-between">
                  <span className="text-gray-300">{page.path}</span>
                  <span className="text-[#00ADB5] font-semibold">{page.visits}</span>
                </div>
              ))}
              {!overview?.topPages?.length && (
                <p className="text-gray-400">No traffic data yet.</p>
              )}
            </div>
          </article>

          <article className="rounded-xl border border-[#333] bg-[#151515] p-6">
            <h2 className="text-xl font-semibold mb-4">Last 7 Days</h2>
            <div className="space-y-3">
              {(overview?.dailyVisits || []).map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-gray-300">{new Date(day.day).toLocaleDateString()}</span>
                  <span className="text-[#007CFF] font-semibold">{day.visits}</span>
                </div>
              ))}
              {!overview?.dailyVisits?.length && (
                <p className="text-gray-400">No daily analytics yet.</p>
              )}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <form
            onSubmit={handleProjectSubmit}
            className="rounded-xl border border-[#333] bg-[#151515] p-6 space-y-3"
          >
            <h2 className="text-xl font-semibold">Add Project</h2>
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Title"
              value={projectForm.title}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, title: event.target.value }))
              }
              required
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Slug (optional)"
              value={projectForm.slug}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, slug: event.target.value }))
              }
            />
            <textarea
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2 min-h-20"
              placeholder="Summary"
              value={projectForm.summary}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, summary: event.target.value }))
              }
              required
            />
            <textarea
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2 min-h-24"
              placeholder="Description"
              value={projectForm.description}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, description: event.target.value }))
              }
              required
            />
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-[#00ADB5]/20 file:px-3 file:py-2 file:text-[#00ADB5]"
              onChange={handleImageChange}
              required={!projectForm.image}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected project"
                className="w-full h-44 object-cover rounded-lg border border-[#333]"
              />
            )}

            {projectForm.image && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                Image uploaded successfully.
              </div>
            )}
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Video preview URL (optional)"
              value={projectForm.videoPreview}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, videoPreview: event.target.value }))
              }
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Live URL"
              value={projectForm.liveUrl}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, liveUrl: event.target.value }))
              }
              required
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="GitHub URL"
              value={projectForm.githubUrl}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, githubUrl: event.target.value }))
              }
              required
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Tech (comma separated)"
              value={projectForm.tech}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, tech: event.target.value }))
              }
              required
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Role (e.g. Full Stack Developer)"
              value={projectForm.role || ""}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, role: event.target.value }))
              }
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Duration (e.g. 3 Months)"
              value={projectForm.duration || ""}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, duration: event.target.value }))
              }
            />
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Features (comma separated)"
              value={projectForm.features}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, features: event.target.value }))
              }
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                className="rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
                value={projectForm.status}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, status: event.target.value }))
                }
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <input
                className="rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
                placeholder="Glow classes"
                value={projectForm.glowColor}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, glowColor: event.target.value }))
                }
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={projectForm.featured}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, featured: event.target.checked }))
                }
              />
              Featured Project
            </label>

            <button
              type="submit"
              disabled={busy || uploadingImage}
              className="w-full rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#007CFF] py-2 font-semibold disabled:opacity-50"
            >
              {uploadingImage ? "Uploading image..." : busy ? "Saving..." : "Add Project"}
            </button>
          </form>

          <form
            onSubmit={handleSkillSubmit}
            className="rounded-xl border border-[#333] bg-[#151515] p-6 space-y-3"
          >
            <h2 className="text-xl font-semibold">Add Skill Blueprint</h2>
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Skill name"
              value={skillForm.name}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
            <select
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              value={skillForm.category}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, category: event.target.value }))
              }
            >
              {SKILL_SECTIONS.map((section) => (
                <option key={section.title} value={section.title}>
                  {section.title}
                </option>
              ))}
            </select>
            <input
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Detail (e.g., SSR/ISR)"
              value={skillForm.detail}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, detail: event.target.value }))
              }
              required
            />
            <select
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              value={skillForm.tier}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, tier: event.target.value }))
              }
            >
              {SKILL_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>

            <input
              list="icon-key-options"
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Icon key (searchable, e.g., SiNextdotjs)"
              value={skillForm.iconName}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, iconName: event.target.value.trim() }))
              }
              required
            />
            <datalist id="icon-key-options">
              {ICON_KEYS.map((iconKey) => (
                <option key={iconKey} value={iconKey} />
              ))}
            </datalist>

            <div className="rounded-lg border border-[#333] bg-[#0f0f0f] px-3 py-2 text-sm text-gray-300 flex items-center gap-3">
              <span className="text-lg" style={{ color: skillForm.color }}>
                <SelectedSkillIcon />
              </span>
              <span>
                Live icon preview for <span className="text-white">{skillForm.iconName}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2 flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="color"
                  className="h-8 w-10 rounded border border-[#333] bg-transparent"
                  value={skillForm.color}
                  onChange={(event) =>
                    setSkillForm((prev) => ({ ...prev, color: event.target.value }))
                  }
                />
                Skill color
              </label>

              <input
                type="number"
                min={0}
                className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
                placeholder="Grid order"
                value={skillForm.order}
                onChange={(event) =>
                  setSkillForm((prev) => ({ ...prev, order: event.target.value }))
                }
                required
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={skillForm.isLearning}
                onChange={(event) =>
                  setSkillForm((prev) => ({ ...prev, isLearning: event.target.checked }))
                }
              />
              Mark as Active Learning
            </label>

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#007CFF] py-2 font-semibold disabled:opacity-50"
            >
              {busy ? "Saving..." : "Add Skill"}
            </button>
          </form>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <article className="rounded-xl border border-[#333] bg-[#151515] p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Projects ({projects.length})</h2>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-[#333] bg-[#101010] p-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-xs text-gray-400">
                      /{project.slug} • {project.status} • {project.videoPreview ? "video-ready" : "static"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 rounded-md border border-red-500/40 text-red-300 hover:bg-red-500/10"
                    disabled={busy}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {!projects.length && <p className="text-gray-400">No projects found.</p>}
            </div>
          </article>

          <article className="rounded-xl border border-[#333] bg-[#151515] p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Skills ({skills.length})</h2>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {sortedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-lg border border-[#333] bg-[#101010] p-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-xs text-gray-400">
                      {skill.category} • {skill.tier} • order {skill.order}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="px-3 py-1 rounded-md border border-red-500/40 text-red-300 hover:bg-red-500/10"
                    disabled={busy}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {!skills.length && <p className="text-gray-400">No skills found.</p>}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
