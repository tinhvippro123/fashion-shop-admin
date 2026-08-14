export type BlogAction = 'EDIT' | 'SOFT_DELETE' | 'RESTORE' | 'PERMANENT_DELETE';

import { Blog } from "../types/blog.admin";

export function getBlogActions(blog: Blog, context: { isTrashView?: boolean }): BlogAction[] {
  if (context.isTrashView) {
    return ['RESTORE', 'PERMANENT_DELETE'];
  }
  return ['EDIT', 'SOFT_DELETE'];
}
