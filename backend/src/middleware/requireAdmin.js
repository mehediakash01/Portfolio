import { readAdminTokenFromRequest, verifyAdminToken } from "../lib/auth.js";

export const requireAdmin = (request, response, next) => {
  const token = readAdminTokenFromRequest(request);

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const payload = verifyAdminToken(token);

  if (!payload || payload.role !== "admin") {
    return response.status(401).json({ message: "Unauthorized" });
  }

  request.admin = payload;
  return next();
};
