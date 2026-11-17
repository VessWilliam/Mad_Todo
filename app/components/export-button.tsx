"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportTodosToExcel } from "../services/export-service";
import { useTodoStore } from "../stores/todo-store";

export function ExportButton() {
  const todos = useTodoStore((s) => s.todos);

  return (
    <Button
      variant="outline"
      className="h-10"
      disabled={todos.length === 0}
      onClick={() => exportTodosToExcel(todos)}
    >
      <Download className="mr-2 size-4" /> Export Excel
    </Button>
  );
}
