"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTodo } from "./edit-todo";
import { TodoItem } from "./todo-item";
import { Todo } from "../types/todo";

const DEFAULT_EMPTY_MESSAGE = "No tasks yet. Click “Add task” to create one.";
const ITEMS_PER_PAGE = 5;

interface Props {
  todos: Todo[];
  emptyMessage?: string;
}

export const TodoList = ({ todos, emptyMessage = DEFAULT_EMPTY_MESSAGE }: Props) => {
  const [editing, setEditing] = useState<Todo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(todos.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);

  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const visibleTodos = todos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <div className="border-b border-zinc-800 p-0">
        <h2 className="text-sm pb-2 pl-10 justify-start font-semibold">Tasks</h2>
      </div>

      {todos.length === 0 ? (
        <p className="p-2 text-center text-sm text-zinc-500">
          {emptyMessage}
        </p>
      ) : (
        <>
          <div className="flex flex-col">
            {visibleTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onEdit={setEditing} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-zinc-800 p-1 sm:p-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={validPage === 1}
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
              >
                Prev
              </Button>

              <span className="text-xs text-zinc-400">
                Page {validPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={validPage === totalPages}
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {editing && (
        <EditTodo
          key={editing.id}
          todo={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </Card>
  );
};
