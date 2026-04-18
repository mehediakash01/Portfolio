import { useEffect } from "react";
import { useLocation } from "react-router";
import { api } from "../lib/api";

const SESSION_KEY = "portfolio_session_id";

const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
};

const useAnalyticsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const payload = {
      sessionId: getSessionId(),
      eventType: "page_view",
      path: `${location.pathname}${location.search}`,
      referrer: document.referrer,
    };

    api.trackPageView(payload).catch(() => {
      // Avoid breaking UX because of analytics failures.
    });
  }, [location.pathname, location.search]);
};

export default useAnalyticsTracking;
