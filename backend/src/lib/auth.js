import process from "node:process";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "portfolio_admin_session";
const SESSION_TTL_SEC = 8 * 60 * 60;

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

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  maxAge: SESSION_TTL_SEC * 1000,
  path: "/",
});

export const setAdminCookie = (response, token) => {
  response.cookie(COOKIE_NAME, token, getCookieOptions());
};

export const clearAdminCookie = (response) => {
  response.clearCookie(COOKIE_NAME, getCookieOptions());
};

export const readAdminTokenFromRequest = (request) => request.cookies?.[COOKIE_NAME] || null;
