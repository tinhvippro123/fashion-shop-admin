"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Store, User } from "lucide-react";
import { useState } from "react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("store");
  const [emailTemplate, setEmailTemplate] = useState("Kính chào [CUSTOMER_NAME],<br><br>Cảm ơn bạn đã tin tưởng và đăng ký tài khoản tại LUXE Fashion. Chúng tôi rất hân hạnh được đồng hành cùng bạn trên con đường định hình phong cách cá nhân.<br><br>Dưới đây là mã giảm giá 10% cho đơn hàng đầu tiên của bạn: <strong>WELCOME10</strong><br><br>Trân trọng,<br>Đội ngũ [STORE_NAME]");

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
        <p className="text-zinc-500">Quản lý cấu hình cửa hàng và tài khoản quản trị.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="md:hidden mb-6">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-white h-11">
              <div className="flex items-center">
                {activeTab === "store" && <><Store className="w-4 h-4 mr-2" /> Cửa hàng</>}
                {activeTab === "email" && <><Mail className="w-4 h-4 mr-2" /> Mẫu Email (Templates)</>}
                {activeTab === "account" && <><User className="w-4 h-4 mr-2" /> Tài khoản</>}
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
            </SelectContent>
          </Select>
        </div>

        <TabsList className="hidden md:grid w-full grid-cols-3 mb-6 bg-zinc-100/50 p-1">
          <TabsTrigger value="store" className="w-full"><Store className="w-4 h-4 mr-2" />Cửa hàng</TabsTrigger>
          <TabsTrigger value="email" className="w-full"><Mail className="w-4 h-4 mr-2" />Mẫu Email (Templates)</TabsTrigger>
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
              <Button className="bg-zinc-900 hover:bg-zinc-800 ml-auto">Lưu thay đổi</Button>
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
                <p className="text-[11px] text-zinc-500">Biến hỗ trợ: [CUSTOMER_NAME], [STORE_NAME]</p>
              </div>

              <div className="space-y-2">
                <Label>Nội dung (Rich Text Editor)</Label>
                <RichTextEditor 
                  value={emailTemplate} 
                  onChange={setEmailTemplate} 
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">Gửi Email Test</Button>
              <Button className="bg-zinc-900 hover:bg-zinc-800">Lưu Mẫu Email</Button>
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
                <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center text-xl font-bold text-zinc-400">
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
              <Button className="bg-zinc-900 hover:bg-zinc-800 ml-auto">Cập nhật tài khoản</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
