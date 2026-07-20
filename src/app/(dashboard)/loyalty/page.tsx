import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Award, Coins, HelpCircle, Save } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function LoyaltyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Điểm Thưởng</h2>
          <p className="text-zinc-500">Cấu hình hệ thống tích điểm và tiêu điểm cho khách hàng trung thành.</p>
        </div>
        <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800">
          <Save className="h-4 w-4" /> Lưu cấu hình
        </Button>
      </div>

      {/* Main Switch */}
      <Card className="border-zinc-200 bg-zinc-50/50">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-start gap-4">
            <div className="bg-zinc-100 p-3 rounded-full text-zinc-900 mt-1">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Trạng thái Hệ thống Điểm Thưởng</h3>
              <p className="text-sm text-zinc-500 mt-1">
                Bật tính năng này để cho phép khách hàng tích lũy điểm khi mua sắm và sử dụng điểm để thanh toán.
              </p>
            </div>
          </div>
          <Switch defaultChecked className="data-[state=checked]:bg-zinc-900" />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tích điểm */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" /> Tỷ lệ Tích Điểm
            </CardTitle>
            <CardDescription>
              Khách hàng sẽ nhận được bao nhiêu điểm cho mỗi đơn hàng?
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label className="font-semibold flex items-center gap-2">
                Giá trị chi tiêu (VND)
              </Label>
              <div className="flex items-center gap-4">
                <Input type="number" defaultValue="100000" className="flex-1" />
                <span className="font-medium text-zinc-500">=</span>
                <Input type="number" defaultValue="1" className="w-24 text-center font-bold text-amber-600" />
                <span className="font-medium text-amber-600">Điểm</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">VD: Khách tiêu 100,000đ sẽ nhận được 1 Điểm thưởng.</p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <Label className="font-semibold cursor-pointer">Thưởng điểm Đăng ký mới</Label>
                <p className="text-xs text-zinc-500">Tặng điểm khi khách hàng tạo tài khoản thành công.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="grid gap-2">
              <Input type="number" defaultValue="50" placeholder="Số điểm tặng..." />
            </div>
          </CardContent>
        </Card>

        {/* Tiêu điểm */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-500" /> Tỷ lệ Quy Đổi (Tiêu Điểm)
            </CardTitle>
            <CardDescription>
              Giá trị của 1 Điểm khi khách hàng sử dụng để thanh toán.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label className="font-semibold flex items-center gap-2">
                Số điểm sử dụng
              </Label>
              <div className="flex items-center gap-4">
                <Input type="number" defaultValue="1" className="w-24 text-center font-bold text-amber-600" />
                <span className="font-medium text-zinc-500">=</span>
                <Input type="number" defaultValue="1000" className="flex-1 font-bold text-zinc-900" />
                <span className="font-medium text-zinc-900">VND</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">VD: 1 Điểm có thể trừ 1,000đ vào tổng hóa đơn.</p>
            </div>

            <div className="grid gap-2 border-t pt-4">
              <div className="flex items-center gap-2">
                <Label className="font-semibold">Điều kiện Tiêu điểm</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-pointer border-0 bg-transparent p-0">
                      <HelpCircle className="h-4 w-4 text-zinc-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Khách hàng phải đạt đủ số điểm này mới được quyền sử dụng điểm.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600">Tối thiểu phải có</span>
                <Input type="number" defaultValue="100" className="w-24 text-center" />
                <span className="text-sm text-zinc-600">Điểm trong ví</span>
              </div>
            </div>

            <div className="grid gap-2 border-t pt-4">
              <div className="flex items-center gap-2">
                <Label className="font-semibold">Giới hạn sử dụng / Đơn hàng</Label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600">Điểm trừ tối đa không quá</span>
                <Input type="number" defaultValue="50" className="w-24 text-center" />
                <span className="text-sm text-zinc-600">% giá trị đơn hàng</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
