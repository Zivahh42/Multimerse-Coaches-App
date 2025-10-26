

type Props = { value: number; onChange?: (n: number) => void; size?: 'sm'|'md'; };


export default function RatingStars({ value, onChange, size = 'md' }: Props) {
const stars = [1,2,3,4,5];
const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
return (
<div className="flex items-center gap-1">
{stars.map(n => (
<button
key={n}
type="button"
className={`inline-flex ${cls} ${n <= value ? 'text-yellow-500' : 'text-gray-300'}`}
onClick={() => onChange?.(n)}
aria-label={`Set rating ${n}`}
>★</button>
))}
</div>
);
}