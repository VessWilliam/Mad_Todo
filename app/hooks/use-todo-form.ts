import { useState } from "react";

import type { NewTodo } from "../services/todo-service";
import { EMPTY_FORM, TodoFormErrors, TodoFormValues, toNewTodo, validateTodoForm } from "../types/todo-form";

export const useTodoForm = (initial: TodoFormValues = EMPTY_FORM) => {
  const [value, setValue] = useState<TodoFormValues>(initial);
  const [errors, setErrors] = useState<TodoFormErrors>({});

  const setField = <K extends keyof TodoFormValues>(
    key: K,
    value: TodoFormValues[K],
  ) => {
    setValue((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const reset = () => {
    setValue(initial);
    setErrors({});
  };
  const submit = (onValid: (input: NewTodo) => void): boolean => {
    const found = validateTodoForm(value);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return false;
    }

    onValid(toNewTodo(value));
    return true;
  };

  return {value , errors, setField, reset, submit}
};
