"use client";

import { ReturnTable } from "@/features/orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function ReturnsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
          <TabsTrigger value="trash">Thùng rác</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-0">
          <ReturnTable />
        </TabsContent>
        <TabsContent value="trash" className="mt-0">
          <ReturnTable isTrashView={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
