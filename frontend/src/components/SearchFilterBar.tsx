import React from 'react';


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
return (
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
<input
value={search}
onChange={(e) => setSearch(e.target.value)}
className="px-3 py-2 rounded-lg border bg-transparent w-full sm:w-72"
placeholder="Search name or email"
/>
<select
value={category}
onChange={(e) => setCategory(e.target.value)}
className="px-3 py-2 rounded-lg border bg-transparent"
>
<option>All</option>
{categories.map(c => <option key={c}>{c}</option>)}
</select>
</div>
);
}