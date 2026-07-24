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
  async createBlog(data: TBlogPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id: Date.now(), ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  async updateBlog(id: number, data: TBlogPayload): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(800);
    return { id, ...data } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  },
};





