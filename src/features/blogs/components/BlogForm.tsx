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
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center text-muted-foreground">�ang t?i b? so?n th?o...</div> 
});

const categoryOptions = [
  { key: "trends", label: "Xu hu?ng th?i trang" },
  { key: "tips", label: "M?o ph?i d?" },
  { key: "news", label: "Tin t?c c?a h�ng" },
  { key: "care", label: "Hu?ng d?n b?o qu?n" },
];

export function BlogForm({ initialData, mode = "create" }: { initialData?: Partial<TBlogPayload> & { id?: string | number }; mode?: "create" | "edit" }) {
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
      try {
        const payload = { ...values, status };
              if (mode === "create") {
                const res = await createBlogAction(payload);
                if (res.success) {
                  toast.success(status === "published" ? "�� xu?t b?n b�i vi?t th�nh c�ng!" : "�� luu nh�p b�i vi?t!");
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as any, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              } else {
                const res = await updateBlogAction(initialData?.id || 1, payload);
                if (res.success) {
                  toast.success(status === "published" ? "�� luu thay d?i th�nh c�ng!" : "�� c?p nh?t b?n nh�p!");
                } else {
                  toast.error(res.error as string);
                    if (res.details) {
                      Object.keys(res.details!).forEach((key) => {
                        form.setError(key as any, { type: "server", message: res.details![key as keyof typeof res.details]?.[0] });
                      });
                    }
                }
              }
      } catch (error) {
        toast.error("L?i k?t n?i d?n m�y ch?!");
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
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{mode === "create" ? "Vi?t b�i m?i" : "S?a b�i vi?t"}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{mode === "create" ? "So?n th?o v� xu?t b?n b�i vi?t l�n trang Blog." : "C?p nh?t n?i dung b�i vi?t."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/blogs" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none hidden sm:flex")}>
              H?y
            </Link>
            <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={onDraft} disabled={isPending}>
              Luu nh�p
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
                <CardTitle>N?i dung ch�nh</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Ti�u d? b�i vi?t <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="VD: 10 C�ch Ph?i �? �i �� L?t M�a L?nh C?c Xinh Cho N?" className="text-lg" {...field} />
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
                      <FormLabel className="font-semibold">�u?ng d?n tinh (Slug)</FormLabel>
                      <FormControl>
                        <Input placeholder="vd: 10-cach-phoi-do-di-da-lat" className="bg-muted/50" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>T? d?ng t?o t? ti�u d? n?u d? tr?ng. D�ng cho du?ng d?n SEO.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Tr�nh so?n th?o n?i dung <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="rounded-md border flex flex-col bg-card">
                          <RichTextEditor 
                            value={field.value} 
                            onChange={field.onChange} 
                            editorClassName="h-[400px] border-none"
                            placeholder="B?t d?u vi?t n?i dung t?i d�y..."
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
                <CardTitle>T?i uu SEO (T�y ch?n)</CardTitle>
                <CardDescription>Thi?t l?p c�c th? d? b�i vi?t d? d�ng l�n top Google.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Th? Ti�u d? SEO (Meta Title)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nh?p ti�u d? hi?n th? tr�n Google..." {...field} value={field.value || ""} />
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
                      <FormLabel>Th? M� t? (Meta Description)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="M� t? ng?n g?n n?i dung b�i vi?t..." rows={3} {...field} value={field.value || ""} />
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
                <CardTitle>Ph�n lo?i</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Chuy�n m?c <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Ch?n chuy�n m?c" />
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
                        <Input placeholder="VD: m�a d�ng, d� l?t, �o len..." {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Ph�n c�ch c�c th? b?ng d?u ph?y (,)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>?nh b�a (Thumbnail)</CardTitle>
                <CardDescription>K�ch thu?c khuy�n d�ng: 1200 x 630px.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Nh?n d? t?i ?nh l�n</p>
                  <p className="text-xs text-muted-foreground mt-1">H? tr? JPG, PNG (T?i da 2MB)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>C�i d?t kh�c</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="allowComment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base cursor-pointer">Cho ph�p b�nh lu?n</FormLabel>
                        <FormDescription>
                          Hi?n th? khung b�nh lu?n ? cu?i b�i.
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
                        <FormLabel className="text-base cursor-pointer">Ghim b�i vi?t</FormLabel>
                        <FormDescription>
                          Ghim l�n d?u trang Blog.
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

