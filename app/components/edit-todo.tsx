"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import type { Todo } from "../types/todo";
import { TodoForm } from "./todo-form";
import { useTodoForm } from "../hooks/use-todo-form";
import { useTodoStore } from "../stores/todo-store";

interface Props {
  todo: Todo;
  onClose: () => void;
}

export function EditTodo({ todo, onClose }: Props) {
  const updateTodo = useTodoStore((s) => s.updateTodo);

  const form = useTodoForm({
    title: todo.title,
    description: todo.desc,
    category: todo.category,
    priority: todo.priority,
    dueDate: todo.dueDate ?? "",
  });

  const handleSubmit = () => {
    const ok = form.submit((input) => updateTodo(todo.id, input));
    if (ok) onClose();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>

        <TodoForm
          values={form.value}
          errors={form.errors}
          onChange={form.setField}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
