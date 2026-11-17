import { HEADER_ROWS, IMPORT_ERROR, ImportResult } from "../types/todo-import";
import { validateRow } from "../validate/import-validate";
import { readRows } from "./file-reader";

export const parseImportFile = async (file: File): Promise<ImportResult> => {
  const rows = await readRows(file);
  if (rows.length === 0) throw new Error(IMPORT_ERROR.EMPTY_FILE);

  const result: ImportResult = { valid: [], errors: [] };

  rows.forEach((row, index) => {
    const checked = validateRow(row);
    if ("todo" in checked) {
      result.valid.push(checked.todo);
    } else {
      result.errors.push({
        row: index + 1 + HEADER_ROWS,
        messages: checked.messages,
      });
    }
  });

  return result;
};
