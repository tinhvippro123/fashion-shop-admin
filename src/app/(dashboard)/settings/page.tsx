"use client";

import { SettingsTabs } from "@/features/settings";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
        <p className="text-muted-foreground">Quản lý cấu hình cửa hàng và tài khoản quản trị.</p>
      </div>

      <SettingsTabs />
    </div>
  );
}
