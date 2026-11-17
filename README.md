# Mad Todo List 🧸

A simple dark to-do list app. Tasks are saved in the browser, so they are still there after a reload.

## Tech Stack

- 🌀 Next.js 16
- ⚛️ React 19 + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- 🐻 zustand
- 📅 date-fns
- 📥 papaparse (CSV) and xlsx (Excel)

## What I Built ✨

- Add, edit, delete and complete tasks
- Category, priority and due date for each task
- Search, filter and sort tasks
- Import tasks from CSV or Excel
- Export tasks to Excel
- Tasks are saved after reload

## Storage 💾

I use `localStorage` through zustand `persist`. The app has no backend, and localStorage is simple and big enough for a task list.

## Run It 🚀

```bash
bun install
bun run dev
```

Open http://localhost:3000
