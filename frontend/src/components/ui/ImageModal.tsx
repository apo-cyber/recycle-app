// src/components/ui/ImageModal.tsx

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  caption?: string;
}

export function ImageModal({
  src,
  alt,
  isOpen,
  onClose,
  caption,
}: ImageModalProps) {
  // ESCキーで閉じる
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // スクロールを無効化
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* 背景のオーバーレイ（クリック無効） */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* モーダルコンテンツ - 横幅を狭く */}
      <div className="relative z-10 w-full max-w-4xl animate-in fade-in zoom-in-95 duration-300">
        {/* グラデーションボーダー付き画像コンテナ */}
        <div className="p-1 bg-gradient-to-r from-orange-400 via-green-400 to-orange-400 rounded-lg shadow-2xl relative">
          {/* 閉じるボタン（画像の右上） */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-50 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="閉じる"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="bg-white rounded-md overflow-hidden">
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[75vh] w-auto h-auto object-contain mx-auto"
              priority
            />
          </div>
        </div>

        {/* キャプション */}
        {caption && (
          <div className="mt-4 text-center">
            <div className="inline-block bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                {caption}
              </p>
            </div>
          </div>
        )}

        {/* ヒントテキスト */}
        <div className="mt-3 text-center">
          <p className="text-white/70 text-xs sm:text-sm">
            右上の × ボタンまたは ESC キーで閉じる
          </p>
        </div>
      </div>
    </div>
  );
}
