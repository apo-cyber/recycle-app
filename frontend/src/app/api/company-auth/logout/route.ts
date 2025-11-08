import { NextResponse } from "next/server";

export async function POST() {
  console.log("🚪 Company logout request received");

  const response = NextResponse.json({
    success: true,
    message: "ログアウトしました",
  });

  response.cookies.set("company-auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  console.log("✅ Company auth cookie deleted");

  return response;
}
