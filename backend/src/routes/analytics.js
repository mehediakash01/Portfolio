import { Router } from "express";
import { prisma } from "../lib/db.js";
import { getActiveUsersNow, touchSession } from "../lib/liveSessions.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const getTodayStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

router.post("/event", async (req, res) => {
  const sessionId = `${req.body.sessionId ?? ""}`.trim();
  const path = `${req.body.path ?? "/"}`.trim();

  if (!sessionId) {
    return res.status(400).json({ message: "sessionId is required" });
  }

  touchSession(sessionId);

  await prisma.analyticsEvent.create({
    data: {
      sessionId,
      path,
      eventType: `${req.body.eventType ?? "page_view"}`.trim(),
      referrer: `${req.body.referrer ?? ""}`.trim() || null,
      userAgent: `${req.headers["user-agent"] ?? ""}`.trim() || null,
    },
  });

  return res.status(201).json({ ok: true });
});

router.get("/overview", requireAdmin, async (_req, res) => {
  const todayStart = getTodayStart();

  const [
    totalVisits,
    todayVisits,
    topPages,
    uniqueVisitorsRaw,
    dailyVisitsRaw,
  ] = await Promise.all([
    prisma.analyticsEvent.count(),
    prisma.analyticsEvent.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.analyticsEvent.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 6,
    }),
    prisma.$queryRaw`
      SELECT COUNT(DISTINCT "sessionId")::int AS count
      FROM "AnalyticsEvent"
    `,
    prisma.$queryRaw`
      SELECT DATE("createdAt") AS day, COUNT(*)::int AS visits
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= NOW() - INTERVAL '7 days'
      GROUP BY DATE("createdAt")
      ORDER BY day ASC
    `,
  ]);

  return res.json({
    totalVisits,
    todayVisits,
    uniqueVisitors: uniqueVisitorsRaw[0]?.count ?? 0,
    activeUsersNow: getActiveUsersNow(),
    topPages: topPages.map((item) => ({
      path: item.path,
      visits: item._count.path,
    })),
    dailyVisits: dailyVisitsRaw,
  });
});

router.get("/live", requireAdmin, async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendSnapshot = async () => {
    const todayVisits = await prisma.analyticsEvent.count({
      where: { createdAt: { gte: getTodayStart() } },
    });

    res.write(
      `data: ${JSON.stringify({
        timestamp: new Date().toISOString(),
        activeUsersNow: getActiveUsersNow(),
        todayVisits,
      })}\n\n`
    );
  };

  await sendSnapshot();

  const interval = setInterval(() => {
    sendSnapshot().catch(() => {
      clearInterval(interval);
    });
  }, 3000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

export default router;
