import { AddTodo } from "./components/add-todo";
import { ExportButton } from "./components/export-button";
import { ImportDialog } from "./components/import-dialog";
import { TodoDashboard } from "./components/todo-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 sm:p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mad Todo</h1>
            <p className="text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase mt-1">
              productivity dashboard
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
              <div className="[&>button]:w-full">
                <ImportDialog />
              </div>
              <div className="[&>button]:w-full">
                <ExportButton />
              </div>
            </div>
            <div className="w-full sm:w-auto [&>button]:w-full">
              <AddTodo />
            </div>

          </div>
        </header>

        <TodoDashboard />
      </div>
    </main>
  );
}
