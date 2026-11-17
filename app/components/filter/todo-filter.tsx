"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CATEGORIES, PRIORITIES } from "../../types/todo";
import {
  ALL,
  DEFAULT_FILTERS,
  DUE_OPTIONS,
  SORT_KEY,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  isDefaultFilters,
  type TodoFilters,
} from "../../types/todo-filter";
import { FilterSelect } from "./filter-select";

interface Props {
  filters: TodoFilters;
  onChange: (filters: TodoFilters) => void;
}

export const TodoFiltersBar = ({ filters, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const set = <K extends keyof TodoFilters>(key: K, value: TodoFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const hasActiveFilters = !isDefaultFilters(filters) || filters.search !== "";

  const renderFilters = () => (
    // FIX 1: Added w-full and space-y-4 to this wrapper
    <div className="w-80 space-y-4">
      {/* FIX 2: Added w-full to the grid. Changed to grid-cols-2 so it's not squished. */}
      <div className="grid grid-cols-2 gap-10 w-full">
        <FilterSelect
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(v) => set("status", v)}
        />
        <FilterSelect
          label="Category"
          value={filters.category}
          options={[ALL, ...CATEGORIES]}
          onChange={(v) => set("category", v)}
        />
        <FilterSelect
          label="Priority"
          value={filters.priority}
          options={[ALL, ...PRIORITIES]}
          onChange={(v) => set("priority", v)}
        />
        <FilterSelect
          label="Due"
          value={filters.due}
          options={DUE_OPTIONS}
          onChange={(v) => set("due", v)}
        />
        <div className="col-span-2">
          <FilterSelect
            label="Sort by"
            value={filters.sort}
            options={SORT_OPTIONS}
            onChange={(v) =>
              onChange({
                ...filters,
                sort: v,
                reverse: v === SORT_KEY.MANUAL ? false : filters.reverse,
              })
            }
          />
        </div>
      </div>

      {/* Clear button stays here and fades in/out without shifting the layout */}
      <div
        className={`transition-opacity duration-200 ${
          hasActiveFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Button
          variant="ghost"
          className="w-full  h-10 text-zinc-400 hover:text-zinc-50 border border-zinc-800"
          onClick={() => onChange(DEFAULT_FILTERS)}
        >
          <X className="mr-2 size-4" /> Clear filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            placeholder="Search tasks..."
            className="border-zinc-800 bg-zinc-900 pl-9 h-10"
          />
        </div>

        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-zinc-800 bg-zinc-900 h-10 px-4 relative shrink-0"
        >
          <SlidersHorizontal className="size-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}
        </Button>

        {/* Responsive Drawer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="bottom"
            className="bg-zinc-950 border-zinc-800 rounded-t-2xl h-auto max-h-[85vh] overflow-y-auto pb-6 sm:max-w-md sm:mx-auto sm:mb-12 sm:rounded-xl border sm:border-zinc-800"
          >
            <SheetHeader className="mb-4">
              <SheetTitle className="text-left text-zinc-50 text-lg">
                Filters & Sorting
              </SheetTitle>
            </SheetHeader>

            {/* FIX 3: Added w-full here so the whole form stays stretched */}
            <div className="flex flex-col items-center space-y-4 w-full">
              {renderFilters()}

              <Button
                className="w-80 h-11 mt-2"
                onClick={() => setIsOpen(false)}
              >
                Show Results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
