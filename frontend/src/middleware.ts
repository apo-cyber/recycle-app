import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 1. ログインページと認証APIは常に許可
  if (
    pathname === "/company-login" ||
    pathname.startsWith("/api/company-auth/")
  ) {
    return NextResponse.next();
  }

  // 2. 静的ファイルは許可（パフォーマンス向上）
  if (pathname.startsWith("/_next/") || pathname.startsWith("/static/")) {
    return NextResponse.next();
  }

  // 3. Company password認証のCookieをチェック
  const companyAuthCookie = request.cookies.get("company-auth");

  console.log("COOKIE:", companyAuthCookie?.value || "❌ NONE");

  // 4. Cookieがない、または値が'authenticated'でない場合はログインページへ
  if (!companyAuthCookie || companyAuthCookie.value !== "authenticated") {
    console.log("🚫 NOT AUTHENTICATED - REDIRECTING TO /company-login");
    const loginUrl = new URL("/company-login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 5. 認証済みの場合は通過
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * すべてのリクエストパスにマッチ（以下を除く）:
     * - api (APIルート)
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
