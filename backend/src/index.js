import process from "node:process";
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import skillRoutes from "./routes/skills.js";
import analyticsRoutes from "./routes/analytics.js";
import uploadRoutes from "./routes/uploads.js";

const app = express();

const defaultOrigins = ["http://localhost:5173", "http://mehedi-akash01.surge.sh"];
const configuredOrigins = [process.env.FRONTEND_URLS, process.env.FRONTEND_URL]
  .filter(Boolean)
  .flatMap((value) =>
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  );
const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

app.use(
  cors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(requestOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/uploads", uploadRoutes);

app.use((err, _req, res, next) => {
  void next;
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});