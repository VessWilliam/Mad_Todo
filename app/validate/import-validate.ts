import { COLUMN } from "../types/todo-column";

import {
  CATEGORIES,
  CATEGORY,
  PRIORITIES,
  PRIORITY,
  type Category,
  type NewTodo,
  type Priority,
} from "../types/todo";
import { IMPORT_ERROR, RawRow } from "../types/todo-import";
import { asText, getCell, matchOption, parseDueDate } from "@/lib/helper";

export type RowCheck = { todo: NewTodo } | { messages: string[] };

export const validateRow = (row: RawRow): RowCheck => {
  const messages: string[] = [];

  const title = asText(getCell(row, COLUMN.TITLE));
  if (!title) messages.push(IMPORT_ERROR.TITLE_REQUIRED);

  const categoryText = asText(getCell(row, COLUMN.CATEGORY));
  const category: Category | undefined = categoryText
    ? matchOption(categoryText, CATEGORIES)
    : CATEGORY.WORK;
  if (!category) messages.push(IMPORT_ERROR.INVALID_CATEGORY);

  const priorityText = asText(getCell(row, COLUMN.PRIORITY));
  const priority: Priority | undefined = priorityText
    ? matchOption(priorityText, PRIORITIES)
    : PRIORITY.MEDIUM;
  if (!priority) messages.push(IMPORT_ERROR.INVALID_PRIORITY);

  const dueDate = parseDueDate(getCell(row, COLUMN.DUE_DATE));
  if (dueDate === undefined) messages.push(IMPORT_ERROR.INVALID_DATE);

  if (messages.length > 0 || !category || !priority || dueDate === undefined) {
    return { messages };
  }

  return {
    todo: {
      title,
      desc: asText(getCell(row, COLUMN.DESCRIPTION)),
      category,
      priority,
      dueDate,
    },
  };
};
