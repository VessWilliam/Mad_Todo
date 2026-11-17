import { Todo } from "./todo";
import { COLUMN, STATUS_LABEL } from "./todo-column";

export const toRow = (todo: Todo) => ({
  [COLUMN.TITLE]: todo.title,
  [COLUMN.DESCRIPTION]: todo.desc,
  [COLUMN.CATEGORY]: todo.category,
  [COLUMN.PRIORITY]: todo.priority,
  [COLUMN.DUE_DATE]: todo.dueDate ?? "",
  [COLUMN.STATUS]: todo.completed
    ? STATUS_LABEL.COMPLETED
    : STATUS_LABEL.PENDING,
  [COLUMN.CREATED_AT]: todo.createdAt,
});
