import type { NewTodo } from "@/app/services/todo-service";
import {
  CATEGORY,
  PRIORITY,
  type Category,
  type Priority,
} from "@/app/types/todo";

export interface TodoFormValues {
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  dueDate: string;
}

export type TodoFormErrors = Partial<Record<keyof TodoFormValues, string>>;
export const EMPTY_FORM: TodoFormValues = {
  title: "",
  description: "",
  category: CATEGORY.WORK,
  priority: PRIORITY.MEDIUM,
  dueDate: "",
};

export const FORM_ERRORS = {
  TITLE_REQUIRED: "Title is required",
} as const;

export const validateTodoForm = (values: TodoFormValues): TodoFormErrors => {
  const errors: TodoFormErrors = {};
  if (!values.title.trim()) errors.title = FORM_ERRORS.TITLE_REQUIRED;
  return errors;
};

export const toNewTodo = (values: TodoFormValues): NewTodo => ({
  title: values.title.trim(),
  desc: values.description.trim(),
  category: values.category,
  priority: values.priority,
  dueDate: values.dueDate || null,
});
