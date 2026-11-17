import { useEffect, useSyncExternalStore } from "react";
import { useTodoStore } from "../stores/todo-store";

export const useHydrated = () => {
  const hydrated = useSyncExternalStore(
    (onChange) => useTodoStore.persist.onFinishHydration(onChange),
    () => useTodoStore.persist.hasHydrated(),
    () => false
 )

  useEffect(() => {
    useTodoStore.persist.rehydrate();
  }, [])

  return hydrated;
}
