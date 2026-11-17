import type { Todo } from "../types/todo";

export type NewTodo = Omit<Todo, "id" | "order" | "createdAt" | "completed">

// Data Action
export const todoCreate = (todos: Todo[], input: NewTodo): Todo[] => {
  const todo: Todo = {
    ...input,
    id: crypto.randomUUID(),
    completed: false,
    order: todos.length,
    createdAt: new Date().toISOString(),
  }
  return [...todos, todo]
};

export const todoUpdate = (todos: Todo[], id: string, patch: Partial<Todo>): Todo[] =>
  todos.map(t => (t.id === id ? { ...t, ...patch } : t));

export const todoRemove = (todos: Todo[], id: string): Todo[] => reindex(todos.filter(t => t.id !== id));


// UI Action

export const todoToggle = (todos: Todo[], id: string): Todo[] =>
  todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);

export const todoReorder = (todos: Todo[], from: number, to: number) : Todo[] => {
  const next = [...todos];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return reindex(next)
}

export const todoMerge = (todos: Todo[], rows: NewTodo[]): Todo[] =>
  rows.reduce((acc, row) => todoCreate(acc, row), todos);

// Private Methods
const reindex = (todos: Todo[]): Todo[] =>
  todos.map((t, i) => ({ ...t, order: i }));
