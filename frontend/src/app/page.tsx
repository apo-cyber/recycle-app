// src/app/page.tsx

"use client";

import { useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useTags } from "@/hooks/useTags";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Header } from "@/components/layout/Header";
import { SimpleFooter } from "@/components/layout/SimpleFooter";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [ordering, setOrdering] = useState("-created_at");
  const [page, setPage] = useState(1);
  const [hideSoldOut, setHideSoldOut] = useState(false); // SOLD OUT非表示フラグ

  const {
    data: postsData,
    isLoading,
    error,
  } = useBlogPosts({
    page,
    search,
    tag: selectedTag,
    ordering,
  });

  const { data: tags = [] } = useTags();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  // SOLD OUT商品をフィルタリング
  const filteredResults = postsData?.results.filter((post) => {
    if (hideSoldOut && post.is_sold_out) {
      return false; // SOLD OUT商品を除外
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* コンパクトなヒーローセクション */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-orange-100">
          <div className="text-center">
            {/* コンパクトなアイコン付きロゴ */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-green-50 px-4 py-2 rounded-full border border-orange-200/50">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center shadow-sm">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <span
                  className="text-xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "Space Grotesk, Inter, sans-serif" }}
                >
                  モノノワ
                </span>
              </div>
            </div>

            <h1
              className="text-2xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              社内の<span className="text-orange-500">不要備品</span>を
              <span className="text-green-500">有効活用</span>しませんか？
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              部署間でオフィス用品を共有し、調達コストを削減。環境にも優しい循環型オフィスを実現しましょう。
            </p>
          </div>
        </div>
        {/* 検索・フィルター */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="記事を検索..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button type="submit">検索</Button>
          </form>

          <div className="flex flex-wrap gap-4 items-center">
            {/* タグフィルター */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedTag}
                onChange={(e) => {
                  setSelectedTag(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">すべてのタグ</option>
                {tags?.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ソート */}
            <select
              value={ordering}
              onChange={(e) => {
                setOrdering(e.target.value);
                setPage(1);
              }}
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="-created_at">新しい順</option>
              <option value="created_at">古い順</option>
              <option value="-updated_at">更新順</option>
            </select>

            {/* SOLD OUT非表示チェックボックス */}
            <label className="flex items-center gap-2 cursor-pointer bg-orange-50 px-3 py-1.5 rounded-md border border-orange-200 hover:bg-orange-100 transition-colors">
              <input
                type="checkbox"
                checked={hideSoldOut}
                onChange={(e) => setHideSoldOut(e.target.checked)}
                className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">
                SOLD OUT商品を非表示
              </span>
            </label>
          </div>
        </div>

        {/* 記事一覧 */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">エラーが発生しました</p>
          </div>
        ) : filteredResults?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">記事が見つかりませんでした</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults?.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {/* ページネーション */}
            {postsData && (postsData.next || postsData.previous) && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="secondary"
                  disabled={!postsData.previous}
                  onClick={() => setPage(page - 1)}
                >
                  前のページ
                </Button>
                <span className="flex items-center px-4 py-2 text-gray-700">
                  ページ {page}
                </span>
                <Button
                  variant="secondary"
                  disabled={!postsData.next}
                  onClick={() => setPage(page + 1)}
                >
                  次のページ
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      <SimpleFooter />
    </div>
  );
}
