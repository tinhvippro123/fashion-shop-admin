"use client";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full cursor-pointer", className)}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}
