const MAX_IDLE_MS = 5 * 60 * 1000;

const sessions = new Map();

export const touchSession = (sessionId) => {
  if (!sessionId) {
    return;
  }

  sessions.set(sessionId, Date.now());
};

export const pruneSessions = () => {
  const now = Date.now();

  for (const [sessionId, lastSeen] of sessions.entries()) {
    if (now - lastSeen > MAX_IDLE_MS) {
      sessions.delete(sessionId);
    }
  }
};

export const getActiveUsersNow = () => {
  pruneSessions();
  return sessions.size;
};
