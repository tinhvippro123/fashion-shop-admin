'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-50">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-zinc-900">Đã xảy ra lỗi hệ thống!</h2>
        <p className="mb-6 text-sm text-zinc-500">
          Rất tiếc, đã có sự cố trong quá trình xử lý yêu cầu.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Thử lại
          </button>
          <Link
            href="/dashboard"
            className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
