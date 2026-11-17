import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, PRIORITIES, Category, Priority } from "../types/todo";
import { cn } from "@/lib/utils";
import { TodoFormErrors, TodoFormValues } from "../types/todo-form";

interface Props {
  values: TodoFormValues;
  errors: TodoFormErrors;
  onChange: <K extends keyof TodoFormValues>(
    key: K,
    value: TodoFormValues[K]
  ) => void;
}

export function TodoForm({ values, errors, onChange }: Props) {
  return (
    <div className="grid gap-4">
      <FormField id="title" label="Title" error={errors.title}>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="What needs to be done?"
          aria-invalid={!!errors.title}
          className={inputErrorClass(errors.title)}
        />
      </FormField>

      <FormField id="description" label="Description" error={errors.description}>
        <Input
          id="description"
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Optional"
          aria-invalid={!!errors.description}
          className={inputErrorClass(errors.description)}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category" error={errors.category}>
          <Select
            value={values.category}
            onValueChange={(v) => v && onChange("category", v as Category)}
          >
            <SelectTrigger
              aria-invalid={!!errors.category}
              className={inputErrorClass(errors.category)}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Priority" error={errors.priority}>
          <Select
            value={values.priority}
            onValueChange={(v) => v && onChange("priority", v as Priority)}
          >
            <SelectTrigger
              aria-invalid={!!errors.priority}
              className={inputErrorClass(errors.priority)}
            >
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITIES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField id="dueDate" label="Due date" error={errors.dueDate}>
        <Input
          id="dueDate"
          type="date"
          value={values.dueDate}
          onChange={(e) => onChange("dueDate", e.target.value)}
          aria-invalid={!!errors.dueDate}
          className={inputErrorClass(errors.dueDate)}
        />
      </FormField>
    </div>
  );
}

const inputErrorClass = (error?: string) =>
  cn(error && "border-destructive focus-visible:ring-destructive");

const FormField = ({
  id,
  label,
  error,
  children,
}: {
  id?: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="grid gap-1.5">
    <label
      htmlFor={id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </label>
    {children}
    {error && (
      <p className="text-[0.8rem] font-medium text-destructive">{error}</p>
    )}
  </div>
);
