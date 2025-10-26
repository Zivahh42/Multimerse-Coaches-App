import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SearchFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  categories
}: {
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  categories: string[];
}) {
  // Filter out "All" from categories if it exists to prevent duplication
  const uniqueCategories = categories.filter(c => c !== "All");

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-72"
        placeholder="Search name or email"
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          {uniqueCategories.map(c => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}