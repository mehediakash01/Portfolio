import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  clearAdminCookie,
  issueAdminToken,
  readAdminTokenFromRequest,
  setAdminCookie,
  verifyAdminPassword,
  verifyAdminToken,
} from "../lib/auth.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Try again later." },
});

router.post("/login", loginLimiter, async (request, response) => {
  const password = `${request.body?.password ?? ""}`;

  if (!password) {
    return response.status(400).json({ message: "Password is required" });
  }

  let isPasswordValid = false;

  try {
    isPasswordValid = await verifyAdminPassword(password);
  } catch {
    return response.status(500).json({ message: "Server auth is not configured" });
  }

  if (!isPasswordValid) {
    return response.status(401).json({ message: "Invalid credentials" });
  }

  const token = issueAdminToken();
  setAdminCookie(response, token);

  return response.json({ ok: true });
});

router.get("/session", (request, response) => {
  const token = readAdminTokenFromRequest(request);

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const payload = verifyAdminToken(token);

  if (!payload || payload.role !== "admin") {
    return response.status(401).json({ message: "Unauthorized" });
  }

  return response.json({ authenticated: true });
});

router.post("/logout", (_request, response) => {
  clearAdminCookie(response);
  return response.json({ ok: true });
});

export default router;
