"use client";

import { useEffect } from "react";

export function useCompanyAuthCleanup() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon("/api/company-auth/logout");
      console.log("🚪 Browser closing - logging out from company auth");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
}
