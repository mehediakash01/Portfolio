import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { api } from "../../lib/api";

const initialProjectForm = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  image: "",
  liveUrl: "",
  githubUrl: "",
  tech: "",
  features: "",
  glowColor: "from-cyan-500 to-blue-500",
  status: "published",
  featured: false,
};

const initialSkillForm = {
  name: "",
  category: "frontend",
  level: 75,
  color: "#38BDF8",
};

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

  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [skillForm, setSkillForm] = useState(initialSkillForm);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sortedSkills = useMemo(
    () => [...skills].sort((a, b) => b.level - a.level),
    [skills]
  );

  const loadAll = async () => {
    setError("");
    const [projectData, skillData, analyticsData] = await Promise.all([
      api.getProjects("admin"),
      api.getSkills(),
      api.getAnalyticsOverview(),
    ]);

    setProjects(projectData);
    setSkills(skillData);
    setOverview(analyticsData);
  };

  useEffect(() => {
    loadAll().catch((loadError) => {
      setError(loadError.message || "Failed to load dashboard data");
    });
  }, []);

  useEffect(() => {
    const source = new EventSource(api.analyticsLiveUrl());

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
  }, []);

  const refreshAfterMutation = async () => {
    const [projectData, skillData, analyticsData] = await Promise.all([
      api.getProjects("admin"),
      api.getSkills(),
      api.getAnalyticsOverview(),
    ]);
    setProjects(projectData);
    setSkills(skillData);
    setOverview(analyticsData);
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      await api.addProject({
        ...projectForm,
        tech: parseList(projectForm.tech),
        features: parseList(projectForm.features),
      });
      setProjectForm(initialProjectForm);
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
        level: Number(skillForm.level),
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
          <Link
            to="/"
            className="px-4 py-2 rounded-lg border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
          >
            Back To Portfolio
          </Link>
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
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Image URL"
              value={projectForm.image}
              onChange={(event) =>
                setProjectForm((prev) => ({ ...prev, image: event.target.value }))
              }
              required
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
              disabled={busy}
              className="w-full rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#007CFF] py-2 font-semibold disabled:opacity-50"
            >
              {busy ? "Saving..." : "Add Project"}
            </button>
          </form>

          <form
            onSubmit={handleSkillSubmit}
            className="rounded-xl border border-[#333] bg-[#151515] p-6 space-y-3"
          >
            <h2 className="text-xl font-semibold">Add Skill</h2>
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
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools</option>
            </select>
            <input
              type="number"
              min={0}
              max={100}
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Level (0-100)"
              value={skillForm.level}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, level: event.target.value }))
              }
              required
            />
            <input
              type="text"
              className="w-full rounded-lg bg-[#0f0f0f] border border-[#333] px-3 py-2"
              placeholder="Color hex"
              value={skillForm.color}
              onChange={(event) =>
                setSkillForm((prev) => ({ ...prev, color: event.target.value }))
              }
              required
            />
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
                    <p className="text-xs text-gray-400">/{project.slug} • {project.status}</p>
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
                      {skill.category} • {skill.level}%
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
