import { PRIORITY, type Category, type Priority } from "./todo";

export const ALL = "All" as const;

export const PRIORITY_RANK: Record<Priority, number> = {
  [PRIORITY.HIGH]: 0,
  [PRIORITY.MEDIUM]: 1,
  [PRIORITY.LOW]: 2,
};

export const STATUS_FILTER = {
  ALL,
  ACTIVE: "Active",
  COMPLETED: "Completed",
} as const;

export const DUE_FILTER = {
  ALL,
  OVERDUE: "Overdue",
  TODAY: "Today",
  NEXT_7_DAYS: "Next 7 days",
  NO_DATE: "No date",
} as const;

export const SORT_KEY = {
  MANUAL: "Manual",
  DUE_DATE: "Due date",
  PRIORITY: "Priority",
  NEWEST: "Newest",
  TITLE: "Title",
} as const;

export type StatusFilter = (typeof STATUS_FILTER)[keyof typeof STATUS_FILTER];
export type DueFilter = (typeof DUE_FILTER)[keyof typeof DUE_FILTER];
export type SortKey = (typeof SORT_KEY)[keyof typeof SORT_KEY];

export const STATUS_OPTIONS = Object.values(STATUS_FILTER);
export const DUE_OPTIONS = Object.values(DUE_FILTER);
export const SORT_OPTIONS = Object.values(SORT_KEY);

export interface TodoFilters {
  search: string;
  status: StatusFilter;
  category: Category | typeof ALL;
  priority: Priority | typeof ALL;
  due: DueFilter;
  sort: SortKey;
  reverse: boolean;
}

export const DEFAULT_FILTERS: TodoFilters = {
  search: "",
  status: STATUS_FILTER.ALL,
  category: ALL,
  priority: ALL,
  due: DUE_FILTER.ALL,
  sort: SORT_KEY.MANUAL,
  reverse: false,
};

export const isDefaultFilters = (filters: TodoFilters): boolean =>
  (Object.keys(DEFAULT_FILTERS) as (keyof TodoFilters)[]).every(
    (key) => filters[key] === DEFAULT_FILTERS[key]
  );
