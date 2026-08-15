import { TBlogPayload } from "../schemas/blog.schema";
import { Blog } from "@/features/blogs/types/blog.admin";
import { mockBlogs } from "@/features/blogs/mocks/blog.mock";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const blogService = {
  /**
   * Lấy danh sách bài viết
   */
  async getBlogs(): Promise<Blog[]> {
    await delay(300); // Giả lập network latency
    return mockBlogs;
  },

  /**
   * Lấy chi tiết bài viết
   */
  async getBlogById(id: number): Promise<Blog | undefined> {
    await delay(200);
    return mockBlogs.find(b => b.id === id);
  },
  async createBlog(data: TBlogPayload): Promise<Blog> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return {
      id: Date.now(),
      title: data.title,
      category: data.category,
      author: "Admin",
      views: 0,
      status: data.status === "published" ? 'Đã xuất bản' : 'Bản nháp',
      date: new Date().toISOString().split("T")[0],
      thumbnail: data.thumbnail || "",
    };
  },
  async updateBlog(id: number, data: TBlogPayload): Promise<Blog> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return {
      id,
      title: data.title,
      category: data.category,
      author: "Admin",
      views: 0,
      status: data.status === "published" ? 'Đã xuất bản' : 'Bản nháp',
      date: new Date().toISOString().split("T")[0],
      thumbnail: data.thumbnail || "",
    };
  },
};





