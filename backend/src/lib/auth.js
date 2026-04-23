import process from "node:process";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "portfolio_admin_session";
const SESSION_TTL_SEC = 8 * 60 * 60;

const parseBoolean = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return null;
};

const isLocalOrigin = (origin) => {
  if (!origin) {
    return false;
  }

  return origin.includes("localhost") || origin.includes("127.0.0.1");
};

const getCookieSameSite = (request) => {
  const configuredSameSite = `${process.env.COOKIE_SAME_SITE ?? ""}`
    .trim()
    .toLowerCase();

  const requestOrigin = `${request?.headers?.origin ?? ""}`.trim();

  if (process.env.NODE_ENV === "production" && requestOrigin && !isLocalOrigin(requestOrigin)) {
    return "none";
  }

  if (["strict", "lax", "none"].includes(configuredSameSite)) {
    return configuredSameSite;
  }

  return process.env.NODE_ENV === "production" ? "none" : "lax";
};

const getCookieSecure = (sameSite) => {
  const configuredSecure = parseBoolean(process.env.COOKIE_SECURE);

  if (configuredSecure !== null) {
    if (sameSite === "none" && configuredSecure === false) {
      return true;
    }

    return configuredSecure;
  }

  return process.env.NODE_ENV === "production" || sameSite === "none";
};

const getJwtSecret = () => {
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET is required");
  }

  return secret;
};

const safeCompare = (valueA, valueB) => {
  const left = Buffer.from(valueA);
  const right = Buffer.from(valueB);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
};

export const verifyAdminPassword = async (inputPassword) => {
  const password = `${inputPassword ?? ""}`;

  if (!password) {
    return false;
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  const fallbackPassword = process.env.ADMIN_PASSWORD;

  if (!fallbackPassword) {
    throw new Error("Set ADMIN_PASSWORD_HASH (recommended) or ADMIN_PASSWORD");
  }

  return safeCompare(password, fallbackPassword);
};

export const issueAdminToken = () =>
  jwt.sign({ role: "admin" }, getJwtSecret(), {
    expiresIn: SESSION_TTL_SEC,
  });

export const verifyAdminToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
};

const getCookieOptions = (request) => {
  const sameSite = getCookieSameSite(request);
  const cookieDomain = `${process.env.COOKIE_DOMAIN ?? ""}`.trim();

  return {
    httpOnly: true,
    sameSite,
    secure: getCookieSecure(sameSite),
    maxAge: SESSION_TTL_SEC * 1000,
    path: "/",
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  };
};

export const setAdminCookie = (request, response, token) => {
  response.cookie(COOKIE_NAME, token, getCookieOptions(request));
};

export const clearAdminCookie = (request, response) => {
  response.clearCookie(COOKIE_NAME, getCookieOptions(request));
};

export const readAdminTokenFromRequest = (request) => request.cookies?.[COOKIE_NAME] || null;
