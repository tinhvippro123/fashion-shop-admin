"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { cn } from "@/shared/utils/utils";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/shared/ui/switch";
import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { BackButton } from "@/shared/ui/back-button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";

import { PageSchema, TPagePayload } from "../schemas/page.schema";
import { createPageAction, updatePageAction } from "../actions/page.action";

const RichTextEditor = dynamic(() => import("@/shared/ui/rich-text-editor").then((mod) => mod.RichTextEditor), { 
  ssr: false, 
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center text-muted-foreground">Ðang t?i b? so?n th?o...</div> 
});

export function PageForm({ initialData, mode = "create" }: { initialData?: any; mode?: "create" | "edit" }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TPagePayload>({
    resolver: zodResolver(PageSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      seoTitle: "",
      seoDesc: "",
      isActive: true,
      status: "draft"
    }
  });

  function onSubmit(values: TPagePayload, status: "draft" | "published" = "published") {
    startTransition(async () => {
      const payload = { ...values, status };
      if (mode === "create") {
        const res = await createPageAction(payload);
        if (res.success) {
          toast.success(status === "published" ? "Ðã luu trang thành công!" : "Ðã luu nháp trang!");
        } else {
          toast.error(res.error as string);
        }
      } else {
        const res = await updatePageAction(initialData?.id || 1, payload);
        if (res.success) {
          toast.success(status === "published" ? "Ðã luu thay d?i trang!" : "Ðã c?p nh?t b?n nháp!");
        } else {
          toast.error(res.error as string);
        }
      }
    });
  }

  const onDraft = () => {
    form.handleSubmit((values) => onSubmit(values, "draft"))();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values, "published"))} className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sm:mb-0">
          <div className="flex items-start sm:items-center gap-2 sm:gap-4">
            <div className="mt-1 sm:mt-0"><BackButton /></div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{mode === "create" ? "T?o trang m?i" : "S?a trang"}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{mode === "create" ? "Thi?t k? các trang n?i dung tinh." : "C?p nh?t n?i dung trang."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/pages" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
              H?y
            </Link>
            <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={onDraft} disabled={isPending}>
              Luu nháp
            </Button>
            <Button 
              type="submit"
              className="flex-1 sm:flex-none gap-2"
              disabled={isPending}
            >
              <Save className="h-4 w-4" /> Luu trang
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* C?t trái: Form thông tin & Editor */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>N?i dung trang</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Tiêu d? trang <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: V? chúng tôi..." className="text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">N?i dung (Rich Text) <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="rounded-md border flex flex-col bg-card">
                          <RichTextEditor 
                            value={field.value}
                            onChange={field.onChange}
                            editorClassName="h-[400px] border-none"
                            placeholder="B?t d?u so?n th?o n?i dung trang..."
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* C?t ph?i: Cài d?t SEO & Tr?ng thái */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài d?t hi?n th?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Ðu?ng d?n (Slug)</FormLabel>
                      <FormControl>
                        <Input placeholder="ve-chung-toi" className="bg-muted/50" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>T? d?ng t?o t? tiêu d? n?u d? tr?ng.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base cursor-pointer">Xu?t b?n trang</FormLabel>
                        <FormDescription>
                          Trang s? hi?n th? công khai ngay.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SEO (Tìm ki?m)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Th? tiêu d? (Meta Title)</FormLabel>
                      <FormControl>
                        <Input placeholder="Tiêu d? hi?n th? trên Google..." {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoDesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô t? (Meta Description)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ðo?n mô t? ng?n hi?n th? trên Google..." className="min-h-24" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
