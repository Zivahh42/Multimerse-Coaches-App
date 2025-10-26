import React from 'react';
import { Coach } from '../types';
import RatingStars from './RatingStars';
import StatusBadge from './StatusBadge';


export default function CoachesTable({
data,
onEdit,
onDelete
}: {
data: Coach[];
onEdit: (c: Coach) => void;
onDelete: (c: Coach) => void;
}) {
return (
<div className="overflow-x-auto border rounded-xl">
<table className="min-w-full text-sm">
<thead className="bg-neutral-100 dark:bg-neutral-800">
<tr>
<th className="text-left p-3">Name</th>
<th className="text-left p-3">Email</th>
<th className="text-left p-3">Category</th>
<th className="text-left p-3">Rating</th>
<th className="text-left p-3">Status</th>
<th className="text-right p-3">Actions</th>
</tr>
</thead>
<tbody>
{data.map(c => (
<tr key={c.id} className="border-t">
<td className="p-3 font-medium">{c.name}</td>
<td className="p-3">{c.email}</td>
<td className="p-3">{c.category}</td>
<td className="p-3"><RatingStars value={c.rating} size="sm" /></td>
<td className="p-3"><StatusBadge status={c.status} /></td>
<td className="p-3 text-right space-x-2">
<button className="px-2 py-1 rounded-lg bg-blue-600 text-white" onClick={() => onEdit(c)}>Edit</button>
<button className="px-2 py-1 rounded-lg bg-red-600 text-white" onClick={() => onDelete(c)}>Delete</button>
</td>
</tr>
))}
{data.length === 0 && (
<tr>
<td colSpan={6} className="p-6 text-center text-neutral-500">No coaches found</td>
</tr>
)}
</tbody>
</table>
</div>
);
}