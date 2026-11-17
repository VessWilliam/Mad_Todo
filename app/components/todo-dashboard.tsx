"use client";

import { useEffect, useMemo, useState } from "react";
import { startOfDay } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { useHydrated } from "../hooks/use-hydrated";
import { applyFilters } from "../services/todo-filter-service";
import { useTodoStore } from "../stores/todo-store";
import { DEFAULT_FILTERS, type TodoFilters } from "../types/todo-filter";
import { TodoList } from "./todo-list";
import { TodoFiltersBar } from "./filter/todo-filter";

export const TodoDashboard = () => {
  const hydrated = useHydrated();
  const todos = useTodoStore((s) => s.todos);
  const [filters, setFilters] = useState<TodoFilters>(DEFAULT_FILTERS);

  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () =>
      setToday((prev) => {
        const next = startOfDay(new Date());
        return prev && prev.getTime() === next.getTime() ? prev : next;
      });

    tick();
    const id = setInterval(tick, 60_000);
    window.addEventListener("focus", tick);

    return () => {
      clearInterval(id);
      window.removeEventListener("focus", tick);
    };
  }, []);

  const stats = useMemo(() => {
    const done = todos.filter((t) => t.completed).length;
    return { total: todos.length, done, pending: todos.length - done };
  }, [todos]);

  const visible = useMemo(
    () => (today ? applyFilters(todos, filters, today) : todos),
    [todos, filters, today]
  );

  if (!hydrated || !today) {
    return <p className="text-sm text-zinc-500">Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Done" value={stats.done} valueClass="text-green-500" />
        <StatCard
          label="Pending"
          value={stats.pending}
          valueClass="text-yellow-500"
        />
      </div>

      <TodoFiltersBar filters={filters} onChange={setFilters} />

      <TodoList
        key={JSON.stringify(filters)}
        todos={visible}
        emptyMessage={
          todos.length === 0
            ? "No tasks yet. Click “Add task” to create one."
            : "No tasks match your filters."
        }
      />
    </>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  valueClass?: string;
}

function StatCard({ label, value, valueClass = "" }: StatCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-3 sm:p-5 flex flex-col items-center sm:items-start justify-center">
        <p className="mb-0.5 text-[10px] sm:text-sm text-zinc-400 uppercase sm:normal-case tracking-wider sm:tracking-normal">
          {label}
        </p>
        <p className={`text-xl sm:text-3xl font-semibold ${valueClass}`}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
