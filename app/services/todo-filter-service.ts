import { Todo } from "../types/todo";
import { addDays, isAfter, isBefore, isSameDay, parseISO } from "date-fns";
import {
  DUE_FILTER,
  DueFilter,
  PRIORITY_RANK,
  SORT_KEY,
  SortKey,
  STATUS_FILTER,
  TodoFilters,
} from "../types/todo-filter";

export const applyFilters = (
  todos: Todo[],
  f: TodoFilters,
  today: Date
): Todo[] => {
  const query = f.search.trim().toLowerCase();

  const filtered = todos.filter((t) => {
    if (query && !`${t.title} ${t.desc}`.toLowerCase().includes(query))
      return false;
    if (f.status === STATUS_FILTER.ACTIVE && t.completed) return false;
    if (f.status === STATUS_FILTER.COMPLETED && !t.completed) return false;
    if (f.category !== "All" && t.category !== f.category) return false;
    if (f.priority !== "All" && t.priority !== f.priority) return false;
    return matchesDue(t, f.due, today);
  });

  const sorted = sortTodos(filtered, f.sort);
  return f.reverse ? sorted.reverse() : sorted;
};

const sortTodos = (todos: Todo[], sort: SortKey): Todo[] => {
  const list = [...todos];

  switch (sort) {
    case SORT_KEY.MANUAL:
      return list.sort((a, b) => a.order - b.order);
    case SORT_KEY.DUE_DATE:
      return list.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    case SORT_KEY.PRIORITY:
      return list.sort(
        (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
      );
    case SORT_KEY.NEWEST:
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case SORT_KEY.TITLE:
      return list.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return list;
  }
};

const matchesDue = (todo: Todo, due: DueFilter, today: Date): boolean => {
  const date = todo.dueDate ? parseISO(todo.dueDate) : null;
  switch (due) {
    case DUE_FILTER.ALL:
      return true;
    case DUE_FILTER.NO_DATE:
      return !date;
    case DUE_FILTER.OVERDUE:
      return !!date && !todo.completed && isBefore(date, today);
    case DUE_FILTER.TODAY:
      return !!date && isSameDay(date, today);
    case DUE_FILTER.NEXT_7_DAYS:
      return (
        !!date && !isBefore(date, today) && !isAfter(date, addDays(today, 7))
      );
    default:
      return false;
  }
};
