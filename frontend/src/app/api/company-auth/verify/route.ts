import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = process.env.COMPANY_PASSWORD || "test123456";

    console.log("🔐 Company password verification attempt");

    if (password === correctPassword) {
      console.log("✅ Password correct - setting 1-hour cookie");

      const response = NextResponse.json({
        success: true,
        message: "認証成功",
      });

      // 1時間の有効期限（確実に動作）
      response.cookies.set("company-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1時間 = 3600秒
        path: "/",
      });

      return response;
    } else {
      console.log("❌ Password incorrect");
      return NextResponse.json(
        {
          success: false,
          message: "パスワードが間違っています",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("❌ Verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "サーバーエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
