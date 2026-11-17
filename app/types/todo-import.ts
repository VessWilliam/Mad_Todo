import type { NewTodo } from "./todo";

export type Reader = (file: File) => Promise<RawRow[]>;

export const FILE_TYPE = { CSV: "csv", XLSX: "xlsx", XLS: "xls" } as const;

export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

export const ACCEPTED_EXTENSIONS = Object.values(FILE_TYPE)
  .map((ext) => `.${ext}`)
  .join(",");

export const HEADER_ROWS = 1;

export const IMPORT_ERROR = {
  UNSUPPORTED_FILE: "Unsupported file type. Use .csv, .xlsx or .xls",
  READ_FAILED: "Could not read the file",
  EMPTY_FILE: "The file has no rows",
  TITLE_REQUIRED: "Title is required",
  INVALID_CATEGORY: "Invalid category",
  INVALID_PRIORITY: "Invalid priority",
  INVALID_DATE: "Invalid due date (use yyyy-MM-dd)",
} as const;

export type RawRow = Record<string, unknown>;

export interface ImportRowError {
  row: number;
  messages: string[];
}

export interface ImportResult {
  valid: NewTodo[];
  errors: ImportRowError[];
}
