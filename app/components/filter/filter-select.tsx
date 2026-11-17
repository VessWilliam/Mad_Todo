import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

export const FilterSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps<T>) => {
  return (
    <div className="grid gap-2">
      <label className="text-xs items-center pl-2 justify-center  text-zinc-400 ml-1">{label}</label>
      <Select value={value} onValueChange={(v) => v && onChange(v as T)}>
        <SelectTrigger className="border-zinc-800 bg-zinc-900 h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top" className="max-h-50 ">
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
      </Select>
    </div>
  );
};
