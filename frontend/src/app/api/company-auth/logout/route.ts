import { NextResponse } from "next/server";

export async function POST() {
  console.log("🚪 Company logout request received");

  // Cookieを削除
  const response = NextResponse.json({
    success: true,
    message: "ログアウトしました",
  });

  response.cookies.delete("company-auth");

  console.log("✅ Company auth cookie deleted");

  return response;
}
