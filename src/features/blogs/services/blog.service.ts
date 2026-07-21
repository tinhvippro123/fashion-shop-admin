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
  }
};
