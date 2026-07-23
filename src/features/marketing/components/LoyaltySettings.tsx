import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Award, Coins, HelpCircle, Save } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

export function LoyaltySettings() {
  return (
    <>
      {/* Main Switch */}
      <Card className="border-border bg-muted/30">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-start gap-4">
            <div className="bg-muted p-3 rounded-full text-foreground mt-1">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Trạng thái Hệ thống Điểm Thưởng</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Bật tính năng này để cho phép khách hàng tích lũy điểm khi mua sắm và sử dụng điểm để thanh toán.
              </p>
            </div>
          </div>
          <Switch defaultChecked className="data-[state=checked]:bg-primary" />
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
                <span className="font-medium text-muted-foreground">=</span>
                <Input type="number" defaultValue="1" className="w-24 text-center font-bold text-amber-600" />
                <span className="font-medium text-amber-600">Điểm</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">VD: Khách tiêu 100,000đ sẽ nhận được 1 Điểm thưởng.</p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <Label className="font-semibold cursor-pointer">Thưởng điểm Đăng ký mới</Label>
                <p className="text-xs text-muted-foreground">Tặng điểm khi khách hàng tạo tài khoản thành công.</p>
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
                <span className="font-medium text-muted-foreground">=</span>
                <Input type="number" defaultValue="1000" className="flex-1 font-bold text-foreground" />
                <span className="font-medium text-foreground">VND</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">VD: 1 Điểm có thể trừ 1,000đ vào tổng hóa đơn.</p>
            </div>

            <div className="grid gap-2 border-t pt-4">
              <div className="flex items-center gap-2">
                <Label className="font-semibold">Điều kiện Tiêu điểm</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-pointer border-0 bg-transparent p-0">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Khách hàng phải đạt đủ số điểm này mới được quyền sử dụng điểm.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tối thiểu phải có</span>
                <Input type="number" defaultValue="100" className="w-24 text-center" />
                <span className="text-sm text-muted-foreground">Điểm trong ví</span>
              </div>
            </div>

            <div className="grid gap-2 border-t pt-4">
              <div className="flex items-center gap-2">
                <Label className="font-semibold">Giới hạn sử dụng / Đơn hàng</Label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Điểm trừ tối đa không quá</span>
                <Input type="number" defaultValue="50" className="w-24 text-center" />
                <span className="text-sm text-muted-foreground">% giá trị đơn hàng</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
