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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-muted/50">
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Đã xảy ra lỗi hệ thống!</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Rất tiếc, đã có sự cố trong quá trình xử lý yêu cầu.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Thử lại
          </button>
          <Link
            href="/dashboard"
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
