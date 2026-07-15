import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.sessionStorage.getItem("visitor_session");
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem("visitor_session", id);
  }
  return id;
}

export function useVisitorTracking(path: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `viewed:${path}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    void supabase.from("page_views").insert({
      path,
      session_id: getSessionId(),
      user_agent: navigator.userAgent.slice(0, 500),
      referrer: document.referrer.slice(0, 500) || null,
    });
  }, [path]);
}