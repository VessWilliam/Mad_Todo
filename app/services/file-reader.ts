import Papa from "papaparse";
import * as XLSX from "xlsx";
import { FILE_TYPE, FileType, IMPORT_ERROR, RawRow, Reader } from "../types/todo-import";
import { getExtension, isFileType } from "@/lib/helper";


export const readCsv = async (file: File): Promise<RawRow[]> => {
  const text = await file.text();
  return Papa.parse<RawRow>(text, { header: true, skipEmptyLines: true }).data;
};

export const readExcel = async (file: File): Promise<RawRow[]> => {
  const book = XLSX.read(await file.arrayBuffer(), {
    type: "array",
    cellDates: true,
  });
  const sheet = book.Sheets[book.SheetNames[0]];
  return XLSX.utils.sheet_to_json<RawRow>(sheet, { defval: "" });
};


const READERS: Record<FileType, Reader> = {
  [FILE_TYPE.CSV]: readCsv,
  [FILE_TYPE.XLSX]: readExcel,
  [FILE_TYPE.XLS]: readExcel,
};

export const readRows = async (file: File): Promise<RawRow[]> => {
  const extension = getExtension(file.name);
  if (!isFileType(extension)) {
    throw new Error(IMPORT_ERROR.UNSUPPORTED_FILE);
  }
  return READERS[extension](file);
};
