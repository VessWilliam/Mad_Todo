import { format, isValid, parseISO } from "date-fns";
import { DATE_FORMAT } from "./constants";
import { FILE_TYPE, FileType, RawRow } from "@/app/types/todo-import";

export const getExtension = (fileName: string): string =>
  fileName.split(".").pop()?.toLowerCase() ?? "";

export const asText = (value: unknown): string =>
  value == null ? "" : String(value).trim();

export const getCell = (row: RawRow, column: string): unknown => {
  const key = Object.keys(row).find(
    (k) => k.trim().toLowerCase() === column.toLowerCase()
  );
  return key === undefined ? "" : row[key];
};

export const matchOption = <T extends string>(
  value: string,
  options: readonly T[]
): T | undefined =>
  options.find((option) => option.toLowerCase() === value.toLowerCase());

export const isFileType = (extension: string): extension is FileType =>
  (Object.values(FILE_TYPE) as string[]).includes(extension);


export const parseDueDate = (value: unknown): string | null | undefined => {
  if (value instanceof Date) {
    return isValid(value) ? format(value, DATE_FORMAT.STORAGE) : undefined;
  }
  const text = asText(value);
  if (!text) return null;
  const parsed = parseISO(text);
  return isValid(parsed) ? format(parsed, DATE_FORMAT.STORAGE) : undefined;
};
