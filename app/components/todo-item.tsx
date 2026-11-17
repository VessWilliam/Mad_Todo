"use client";

import { format, isBefore, parseISO, startOfToday } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Todo } from "../types/todo";
import { useTodoStore } from "../stores/todo-store";
import { CATEGORY_STYLES, PRIORITY_STYLES } from "../types/todo-style";

interface Props {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onEdit }: Props) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  const dueDate = todo.dueDate ? parseISO(todo.dueDate) : null;
  const isOverdue = !!dueDate && !todo.completed && isBefore(dueDate, startOfToday());

  return (
    <div className="flex items-center gap-3 border-b border-zinc-800/50 p-4 transition-colors last:border-b-0 hover:bg-zinc-800/20">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "not done" : "done"}`}
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm",
            todo.completed && "text-zinc-500 line-through"
          )}
        >
          {todo.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          {dueDate && (
            <span className={cn(isOverdue && "text-red-400")}>
              {isOverdue ? "Overdue · " : "Due "}
              {format(dueDate, "MMM d, yyyy")}
            </span>
          )}
          <span className={PRIORITY_STYLES[todo.priority]}>
            {todo.priority}
          </span>
          {todo.desc && <span className="truncate">· {todo.desc}</span>}
        </div>
      </div>

      <Badge variant="outline" className={CATEGORY_STYLES[todo.category]}>
        {todo.category}
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(todo)}
        aria-label="Edit task"
      >
        <Pencil className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete task"
      >
        <Trash2 className="size-4 text-red-400" />
      </Button>
    </div>
  );
}
