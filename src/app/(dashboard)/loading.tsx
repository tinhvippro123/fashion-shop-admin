import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-zinc-50/50">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"></div>
        <p className="text-sm font-medium text-zinc-500">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}
