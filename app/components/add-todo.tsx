"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


import { TodoForm } from "./todo-form";
import { useTodoForm } from "../hooks/use-todo-form";
import { useTodoStore } from "../stores/todo-store";

export const AddTodo = () => {
  const addTodo = useTodoStore((s) => s.addTodo);
  const [open, setOpen] = useState(false);
  const form = useTodoForm();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) form.reset();
  };

  const handleSubmit = () => {
    if (form.submit(addTodo)) handleOpenChange(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-1 size-4" /> Add task
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>

          <TodoForm
            values={form.value}
            errors={form.errors}
            onChange={form.setField}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
