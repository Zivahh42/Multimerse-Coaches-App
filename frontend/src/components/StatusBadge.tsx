export default function StatusBadge({ status }: { status: 'active'|'inactive' }) {
const isActive = status === 'active';
return (
<span className={`px-2 py-1 text-xs rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
{isActive ? 'Active' : 'Inactive'}
</span>
);
}