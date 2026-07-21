import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { PageForm } from "@/features/content";

export default function CreateStaticPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center gap-4">
        <Link 
          href="/pages" 
          className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tạo trang tĩnh</h2>
          <p className="text-zinc-500">Soạn thảo nội dung cho trang mới.</p>
        </div>
      </div>

      <PageForm />
    </div>
  );
}
