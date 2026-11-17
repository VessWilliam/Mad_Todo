export const CATEGORY = {
  WORK: "Work",
  PERSONAL: "Personal",
  URGENT: "Urgent",
} as const;

export const PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];
export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

export const CATEGORIES = Object.values(CATEGORY);
export const PRIORITIES = Object.values(PRIORITY);

export interface Todo {
  id: string;
  title: string;
  desc: string;
  category: Category;
  priority: Priority;
  dueDate: string | null;
  completed: boolean;
  order: number;
  createdAt: string;
}

export type NewTodo = Omit<Todo, "id" | "order" | "createdAt" | "completed">;
