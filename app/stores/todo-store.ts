import { appStorage } from "@/lib/storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type NewTodo, todoCreate, todoMerge, todoRemove, todoReorder, todoToggle, todoUpdate } from "../services/todo-service";
import type { Todo } from "../types/todo";
import { STORAGE_KEY } from "@/lib/constants";

interface TodoStates{
  todos: Todo[];
  addTodo: (input: NewTodo) => void;
  updateTodo: (id: string, patch: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reorderTodo: (from: number, to: number) => void;
  setTodos: (todos: Todo[]) => void;
  importTodos: (rows: NewTodo[]) => void;
}


export const useTodoStore = create<TodoStates>()(
  persist(
     (set) => ({
       todos: [],
       addTodo: (input) => set((s) => ({ todos: todoCreate(s.todos, input) })),
       updateTodo: (id, patch) =>
         set((s) => ({ todos: todoUpdate(s.todos, id, patch) })),
       deleteTodo: (id) => set((s) => ({ todos: todoRemove(s.todos, id) })),
       toggleTodo: (id) => set((s) => ({ todos: todoToggle(s.todos, id) })),
       reorderTodo: (from, to) =>
         set((s) => ({ todos: todoReorder(s.todos, from, to) })),
      setTodos: (todos) => set({ todos }),
      importTodos: (rows) => set((s) => ({ todos: todoMerge(s.todos, rows) })),
     }),
     {
       name: STORAGE_KEY,
       storage: appStorage,
       skipHydration: true,
     }
   )
);
