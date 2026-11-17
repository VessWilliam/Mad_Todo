"use client";

import { Upload } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { parseImportFile } from "../services/import-service";
import { useTodoStore } from "../stores/todo-store";

import { COLUMN } from "../types/todo-column";
import { ACCEPTED_EXTENSIONS, IMPORT_ERROR, ImportResult } from "../types/todo-import";

const MAX_PREVIEW_ERRORS = 5;

const EXPECTED_COLUMNS = [
  COLUMN.TITLE,
  COLUMN.DESCRIPTION,
  COLUMN.CATEGORY,
  COLUMN.PRIORITY,
  COLUMN.DUE_DATE,
].join(", ");

export function ImportDialog() {
  const importTodos = useTodoStore((s) => s.importTodos);

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [fileError, setFileError] = useState("");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setResult(null);
      setFileError("");
    }
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setResult(await parseImportFile(file));
      setFileError("");
    } catch (error) {
      setResult(null);
      setFileError(
        error instanceof Error ? error.message : IMPORT_ERROR.READ_FAILED
      );
    }
  };

  const handleConfirm = () => {
    if (!result) return;
    importTodos(result.valid);
    handleOpenChange(false);
  };

  return (
    <>
      <Button
            className="h-10"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Upload className="mr-2 size-4" /> Import Excel
          </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import tasks</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <p className="text-xs text-zinc-400">
              Accepts CSV or Excel. Columns: {EXPECTED_COLUMNS}.
            </p>

            <Input
              type="file"
              accept={ACCEPTED_EXTENSIONS}
              onChange={handleFile}
            />

            {fileError && <p className="text-sm text-red-500">{fileError}</p>}

            {result && (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-green-500">
                    {result.valid.length} valid
                  </span>
                  {" · "}
                  <span className="text-red-400">
                    {result.errors.length} with errors (skipped)
                  </span>
                </p>

                {result.errors.length > 0 && (
                  <ul className="max-h-32 space-y-1 overflow-y-auto text-xs text-zinc-400">
                    {result.errors.slice(0, MAX_PREVIEW_ERRORS).map((e) => (
                      <li key={e.row}>
                        Row {e.row}: {e.messages.join(", ")}
                      </li>
                    ))}
                    {result.errors.length > MAX_PREVIEW_ERRORS && (
                      <li>
                        ...and {result.errors.length - MAX_PREVIEW_ERRORS} more
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button
              disabled={!result || result.valid.length === 0}
              onClick={handleConfirm}
            >
              Import {result?.valid.length ?? 0} tasks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
