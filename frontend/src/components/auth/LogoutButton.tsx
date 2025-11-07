"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/company-auth/logout", {
        method: "POST",
      });
      router.push("/company-login");
      router.refresh();
    } catch (error) {
      console.error("ログアウトエラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoading ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}
