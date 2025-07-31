"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  PlusIcon,
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "ホーム", icon: HomeIcon, requireAuth: false },
    {
      href: "/about",
      label: "アバウト",
      icon: InformationCircleIcon,
      requireAuth: false,
    },
    {
      href: "/posts/new",
      label: "新規投稿",
      icon: PlusIcon,
      requireAuth: true,
    },
    {
      href: "/profile",
      label: "プロフィール",
      icon: UserIcon,
      requireAuth: true,
    },
  ];

  return (
    <>
      {/* グローバルスタイル */}
      <style jsx global>{`
        .header-blur {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .nav-item {
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .nav-item:hover::before {
          left: 100%;
        }
      `}</style>

      <header className="header-blur sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* 超モダンロゴ */}
            <Link
              href="/"
              className="flex items-center gap-4 text-lg font-bold text-gray-900 flex-shrink-0 group transition-all duration-500 hover:scale-105"
              style={{
                fontFamily: "Space Grotesk, Inter, sans-serif",
                userSelect: "none",
              }}
            >
              <div className="relative">
                {/* グロー効果付きロゴ */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-green-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 scale-110"></div>
                <div className="relative bg-gradient-to-br from-orange-100 to-green-100 p-3 rounded-2xl border border-orange-200/30 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-green-400 rounded-xl flex items-center justify-center shadow-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-green-500 bg-clip-text text-transparent tracking-tight">
                  モノノワ
                </span>
                <span
                  className="text-xs text-gray-500 font-semibold tracking-widest uppercase opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Office Recycle
                </span>
              </div>
            </Link>

            {/* 超モダンナビゲーション */}
            <nav className="hidden md:flex items-center space-x-2 bg-gray-50/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50">
              {navItems.map((item) => {
                if (item.requireAuth && !user) return null;

                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-item flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg shadow-orange-500/25 transform scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/80 hover:shadow-md hover:scale-105"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ユーザーセクション */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3 bg-gray-50/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center shadow-sm">
                      <span
                        className="text-white text-xs font-bold"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span
                      className="text-sm text-gray-700 font-medium"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {user.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                    ログアウト
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transform hover:scale-105"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                  ログイン
                </Link>
              )}
            </div>

            {/* 超モダンモバイルメニューボタン */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 hover:scale-105"
              aria-label="メニューを開く"
            >
              <span
                className="text-xs font-bold mr-2 tracking-wider"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                MENU
              </span>
              <div className="relative">
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5 transform rotate-90 transition-transform duration-300" />
                ) : (
                  <Bars3Icon className="h-5 w-5 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>

          {/* 超モダンモバイルメニュー */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100/50 pb-6 pt-6 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-lg rounded-b-3xl mt-2 shadow-2xl">
              <div className="flex flex-col space-y-2 px-2">
                {navItems.map((item) => {
                  if (item.requireAuth && !user) return null;

                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-4 text-base font-semibold transition-all duration-300 rounded-2xl ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/80 hover:shadow-md"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <Icon className="h-5 w-5 mr-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {user ? (
                  <div className="border-t border-gray-200/50 pt-4 mt-4 space-y-2">
                    <div className="flex items-center px-4 py-3 text-base text-gray-600 bg-gray-50/80 rounded-2xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center mr-4">
                        <span
                          className="text-white text-sm font-bold"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span
                        className="truncate font-medium"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {user.username}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-4 text-base font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 text-left rounded-2xl"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-4 flex-shrink-0" />
                      <span>ログアウト</span>
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-200/50 pt-4 mt-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-4 text-base font-bold bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600 transition-all duration-300 rounded-2xl shadow-lg"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-4 flex-shrink-0" />
                      <span>ログイン</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
