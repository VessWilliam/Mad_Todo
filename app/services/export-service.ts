import { format } from "date-fns";
import * as XLSX from "xlsx";
import type { Todo } from "../types/todo";
import { DATE_FORMAT } from "@/lib/constants";
import { SHEET_NAME } from "../types/todo-column";
import { toRow } from "../types/todo-export";

export const exportTodosToExcel = (todos: Todo[]): void => {
  const sheet = XLSX.utils.json_to_sheet(todos.map(toRow));
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, SHEET_NAME);

  const fileName = `todos-${format(new Date(), DATE_FORMAT.STORAGE)}.xlsx`;
  XLSX.writeFile(book, fileName);
};
