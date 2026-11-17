import { createJSONStorage, type StateStorage } from "zustand/middleware";

const localStorage: StateStorage = {
  getItem: () => null,
  setItem: () => { },
  removeItem : () => {}
}

export const appStorage = createJSONStorage(() => typeof window === "undefined"
  ? localStorage : window.localStorage);
