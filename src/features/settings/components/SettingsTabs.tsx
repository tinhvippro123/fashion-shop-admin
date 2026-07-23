"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Mail, Store, User, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("store");
  const [emailTemplate, setEmailTemplate] = useState("Kính chào [CUSTOMER_NAME],<br><br>Cảm ơn bạn đã tin tưởng và đăng ký tài khoản tại LUXE Fashion. Chúng tôi rất hân hạnh được đồng hành cùng bạn trên con đường định hình phong cách cá nhân.<br><br>Dưới đây là mã giảm giá 10% cho đơn hàng đầu tiên của bạn: <strong>WELCOME10</strong><br><br>Trân trọng,<br>Đội ngũ [STORE_NAME]");

  return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="md:hidden mb-6">
          <Select value={activeTab} onValueChange={(val) => setActiveTab(val || "store")}>
            <SelectTrigger className="w-full bg-card h-11">
              <div className="flex items-center">
                {activeTab === "store" && <><Store className="w-4 h-4 mr-2" /> Cửa hàng</>}
                {activeTab === "email" && <><Mail className="w-4 h-4 mr-2" /> Mẫu Email (Templates)</>}
                {activeTab === "account" && <><User className="w-4 h-4 mr-2" /> Tài khoản</>}
                {activeTab === "shipping" && <><Truck className="w-4 h-4 mr-2" /> Vận chuyển</>}
                {activeTab === "payment" && <><CreditCard className="w-4 h-4 mr-2" /> Thanh toán</>}
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="store">
                <div className="flex items-center"><Store className="w-4 h-4 mr-2" />Cửa hàng</div>
              </SelectItem>
              <SelectItem value="email">
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />Mẫu Email (Templates)</div>
              </SelectItem>
              <SelectItem value="account">
                <div className="flex items-center"><User className="w-4 h-4 mr-2" />Tài khoản</div>
              </SelectItem>
              <SelectItem value="shipping">
                <div className="flex items-center"><Truck className="w-4 h-4 mr-2" />Vận chuyển</div>
              </SelectItem>
              <SelectItem value="payment">
                <div className="flex items-center"><CreditCard className="w-4 h-4 mr-2" />Thanh toán</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsList className="hidden md:grid w-full grid-cols-5 mb-6 bg-muted/50 p-1">
          <TabsTrigger value="store" className="w-full"><Store className="w-4 h-4 mr-2" />Cửa hàng</TabsTrigger>
          <TabsTrigger value="email" className="w-full"><Mail className="w-4 h-4 mr-2" />Mẫu Email</TabsTrigger>
          <TabsTrigger value="shipping" className="w-full"><Truck className="w-4 h-4 mr-2" />Vận chuyển</TabsTrigger>
          <TabsTrigger value="payment" className="w-full"><CreditCard className="w-4 h-4 mr-2" />Thanh toán</TabsTrigger>
          <TabsTrigger value="account" className="w-full"><User className="w-4 h-4 mr-2" />Tài khoản</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cửa hàng</CardTitle>
              <CardDescription>Cập nhật tên và địa chỉ liên hệ của cửa hàng.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Tên cửa hàng</Label>
                  <Input id="storeName" defaultValue="LUXE Fashion" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email liên hệ</Label>
                  <Input id="storeEmail" type="email" defaultValue="contact@luxefashion.vn" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Địa chỉ</Label>
                <Input id="storeAddress" defaultValue="123 Lê Lợi, Bến Nghé, Quận 1, TP.HCM" />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className=" ml-auto">Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Mẫu Email</CardTitle>
              <CardDescription>Chỉnh sửa nội dung email tự động gửi cho khách hàng.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Chọn mẫu cần sửa</Label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="welcome">Email Chào mừng (Đăng ký mới)</option>
                  <option value="order">Email Xác nhận đơn hàng</option>
                  <option value="reset_pass">Email Quên mật khẩu</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Tiêu đề Email</Label>
                <Input defaultValue="Chào mừng [CUSTOMER_NAME] đến với LUXE Fashion!" />
                <p className="text-[11px] text-muted-foreground">Biến hỗ trợ: [CUSTOMER_NAME], [STORE_NAME]</p>
              </div>

              <div className="space-y-2">
                <Label>Nội dung (Rich Text Editor)</Label>
                <RichTextEditor 
                  value={emailTemplate} 
                  onChange={setEmailTemplate} 
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-3 justify-between">
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full sm:w-auto">Gửi Email Test</Button>
              <Button className="w-full sm:w-auto">Lưu Mẫu Email</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình Vận chuyển</CardTitle>
              <CardDescription>Cài đặt phí vận chuyển và tích hợp đối tác giao hàng.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Phí vận chuyển mặc định</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Đơn hàng dưới 500k</Label>
                    <Input defaultValue="30,000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Đơn hàng trên 500k</Label>
                    <Input defaultValue="0" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Đối tác giao hàng</h4>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <p className="font-medium">Giao Hàng Tiết Kiệm (GHTK)</p>
                    <p className="text-sm text-muted-foreground">Trạng thái: Đã kết nối</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <p className="font-medium">Viettel Post</p>
                    <p className="text-sm text-muted-foreground">Trạng thái: Chưa kết nối</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className=" ml-auto">Lưu cài đặt</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình Thanh toán</CardTitle>
              <CardDescription>Quản lý các phương thức thanh toán hỗ trợ cho khách hàng.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div>
                  <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-sm text-muted-foreground">Khách hàng trả tiền mặt khi nhận được hàng.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex flex-col border p-4 rounded-md gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chuyển khoản / Quét mã QR</p>
                    <p className="text-sm text-muted-foreground">Thanh toán thủ công qua tài khoản ngân hàng hoặc mã QR.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-muted rounded-md border-2 border-dashed border-zinc-300 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground text-center px-2">Chưa có<br/>Mã QR</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="space-y-1">
                      <Label className="text-xs">Tên chủ tài khoản</Label>
                      <Input placeholder="VD: NGUYEN VAN A" className="h-8 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Số tài khoản & Ngân hàng</Label>
                      <Input placeholder="VD: 123456789 - Vietcombank" className="h-8 text-sm" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Tải lên ảnh mã QR mới
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div>
                  <p className="font-medium">Ví MoMo</p>
                  <p className="text-sm text-muted-foreground">Thanh toán nhanh qua ứng dụng MoMo.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className=" ml-auto">Lưu cài đặt</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tài khoản quản trị</CardTitle>
              <CardDescription>Cập nhật thông tin cá nhân và mật khẩu.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                  AD
                </div>
                <Button variant="outline" size="sm">Đổi ảnh đại diện</Button>
              </div>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Họ và tên</Label>
                  <Input id="adminName" defaultValue="Admin LUXE" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email đăng nhập</Label>
                  <Input id="adminEmail" type="email" defaultValue="admin@luxefashion.vn" disabled />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input id="newPassword" type="password" placeholder="Nhập mật khẩu mới nếu muốn thay đổi" />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className=" ml-auto">Cập nhật tài khoản</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
  );
}
