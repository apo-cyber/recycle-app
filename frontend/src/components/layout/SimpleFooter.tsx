// src/components/layout/SimpleFooter.tsx

import { HeartIcon } from "@heroicons/react/24/outline";

export function SimpleFooter() {
  return (
    <>
      {/* シンプルフッター用スタイル */}
      <style jsx global>{`
        .simple-footer-gradient {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .simple-cat-hover {
          transition: all 0.3s ease;
        }

        .simple-cat-hover:hover {
          transform: scale(1.05) rotate(2deg);
        }

        .footer-card-simple {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cat-bounce-simple {
          animation: gentle-bounce-simple 3s ease-in-out infinite;
        }

        @keyframes gentle-bounce-simple {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>

      <footer className="simple-footer-gradient border-t border-gray-200/50 mt-auto backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center justify-center text-center gap-3">
            {/* コンパクトな猫セクション */}
            <div className="footer-card-simple rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="cat-bounce-simple simple-cat-hover mb-2">
                <img
                  src="/cat.gif"
                  alt="Dancing cat"
                  className="w-12 h-auto mx-auto rounded-lg shadow-sm"
                />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center shadow-sm">
                  <svg
                    className="w-2 h-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <span
                  className="text-sm font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  モノノワ
                </span>
              </div>
            </div>

            {/* コンパクトなコピーライト */}
            <div className="text-center">
              <p
                className="text-gray-500 text-xs font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                © 2025 モノノワ
                <HeartIcon className="inline h-3 w-3 text-red-400 mx-1 animate-pulse" />
                Django & Next.js
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
