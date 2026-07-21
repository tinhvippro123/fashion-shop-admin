import { ReviewTable } from "@/features/reviews";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Đánh giá sản phẩm</h2>
          <p className="text-zinc-500 hidden sm:block">Quản lý phản hồi và đánh giá từ khách hàng.</p>
        </div>
      </div>

      <ReviewTable />
    </div>
  );
}
