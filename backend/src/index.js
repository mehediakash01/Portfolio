import process from "node:process";
import "dotenv/config";
import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projects.js";
import skillRoutes from "./routes/skills.js";
import analyticsRoutes from "./routes/analytics.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-api" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use((err, _req, res, next) => {
  void next;
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});
