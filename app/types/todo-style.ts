import {
  CATEGORY,
  PRIORITY,
  type Category,
  type Priority,
} from "@/app/types/todo";

export const CATEGORY_STYLES: Record<Category, string> = {
  [CATEGORY.WORK]: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  [CATEGORY.PERSONAL]: "bg-green-500/10 text-green-400 border-green-500/20",
  [CATEGORY.URGENT]: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const PRIORITY_STYLES: Record<Priority, string> = {
  [PRIORITY.LOW]: "text-zinc-400",
  [PRIORITY.MEDIUM]: "text-yellow-400",
  [PRIORITY.HIGH]: "text-red-400",
};
