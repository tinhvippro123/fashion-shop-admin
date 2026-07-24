"use client";

import { BackButton } from "@/shared/ui/back-button";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Save, ImagePlus, X, Calendar as CalendarIcon, Clock, Eye, Upload } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import dynamic from "next/dynamic";

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
import { BlogSchema, TBlogPayload } from "../schemas/blog.schema";
import { createBlogAction, updateBlogAction } from "../actions/blog.action";

const RichTextEditor = dynamic(() => import("@/shared/ui/rich-text-editor").then((mod) => mod.RichTextEditor), { 
  ssr: false, 
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center text-muted-foreground">Ðang t?i b? so?n th?o...</div> 
});

const categoryOptions = [
  { key: "trends", label: "Xu hu?ng th?i trang" },
  { key: "tips", label: "M?o ph?i d?" },
  { key: "news", label: "Tin t?c c?a hàng" },
  { key: "care", label: "Hu?ng d?n b?o qu?n" },
];

export function BlogForm({ initialData, mode = "create" }: { initialData?: any; mode?: "create" | "edit" }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TBlogPayload>({
    resolver: zodResolver(BlogSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      seoTitle: "",
      seoDesc: "",
      category: "tips",
      tags: "",
      allowComment: true,
      isPinned: false,
      status: "draft"
    }
  });

  function onSubmit(values: TBlogPayload, status: "draft" | "published" = "published") {
    startTransition(async () => {
      const payload = { ...values, status };
      if (mode === "create") {
        const res = await createBlogAction(payload);
        if (res.success) {
          toast.success(status === "published" ? "Ðã xu?t b?n bài vi?t thành công!" : "Ðã luu nháp bài vi?t!");
        } else {
          toast.error(res.error as string);
        }
      } else {
        const res = await updateBlogAction(initialData?.id || 1, payload);
        if (res.success) {
          toast.success(status === "published" ? "Ðã luu thay d?i thành công!" : "Ðã c?p nh?t b?n nháp!");
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
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{mode === "create" ? "Vi?t bài m?i" : "S?a bài vi?t"}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{mode === "create" ? "So?n th?o và xu?t b?n bài vi?t lên trang Blog." : "C?p nh?t n?i dung bài vi?t."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/blogs" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
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
              <Save className="h-4 w-4" /> {mode === "create" ? "Xu?t b?n" : "Luu thay d?i"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content Area */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>N?i dung chính</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Tiêu d? bài vi?t <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: 10 Cách Ph?i Ð? Ði Ðà L?t Mùa L?nh C?c Xinh Cho N?" className="text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Ðu?ng d?n tinh (Slug)</FormLabel>
                      <FormControl>
                        <Input placeholder="vd: 10-cach-phoi-do-di-da-lat" className="bg-muted/50" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>T? d?ng t?o t? tiêu d? n?u d? tr?ng. Dùng cho du?ng d?n SEO.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Trình so?n th?o n?i dung <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="rounded-md border flex flex-col bg-card">
                          <RichTextEditor 
                            value={field.value} 
                            onChange={field.onChange} 
                            editorClassName="h-[400px] border-none"
                            placeholder="B?t d?u vi?t n?i dung t?i dây..."
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>T?i uu SEO (Tùy ch?n)</CardTitle>
                <CardDescription>Thi?t l?p các th? d? bài vi?t d? dàng lên top Google.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Th? Tiêu d? SEO (Meta Title)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nh?p tiêu d? hi?n th? trên Google..." {...field} value={field.value || ""} />
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
                      <FormLabel>Th? Mô t? (Meta Description)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Mô t? ng?n g?n n?i dung bài vi?t..." rows={3} {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar settings */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân lo?i</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Chuyên m?c <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Ch?n chuyên m?c" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((opt) => (
                            <SelectItem key={opt.key} value={opt.key}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Th? (Tags)</FormLabel>
                      <FormControl>
                        <Input placeholder="VD: mùa dông, dà l?t, áo len..." {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Phân cách các th? b?ng d?u ph?y (,)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>?nh bìa (Thumbnail)</CardTitle>
                <CardDescription>Kích thu?c khuyên dùng: 1200 x 630px.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Nh?n d? t?i ?nh lên</p>
                  <p className="text-xs text-muted-foreground mt-1">H? tr? JPG, PNG (T?i da 2MB)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài d?t khác</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="allowComment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base cursor-pointer">Cho phép bình lu?n</FormLabel>
                        <FormDescription>
                          Hi?n th? khung bình lu?n ? cu?i bài.
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
                <FormField
                  control={form.control}
                  name="isPinned"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base cursor-pointer">Ghim bài vi?t</FormLabel>
                        <FormDescription>
                          Ghim lên d?u trang Blog.
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
          </div>
        </div>
      </form>
    </Form>
  );
}
