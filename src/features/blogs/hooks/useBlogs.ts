import { useState, useEffect } from 'react';
import { Blog } from "@/features/blogs/types/blog.admin";
import { blogService } from "@/features/blogs/services/blog.service";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      try {
        const data = await blogService.getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách bài viết:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBlogs();
  }, []);

  return { blogs, isLoading, setBlogs };
}
