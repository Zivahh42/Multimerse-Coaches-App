type Props = { checked: boolean; onChange: (v: boolean) => void };
export default function StatusToggle({ checked, onChange }: Props) {
return (
<button
type="button"
onClick={() => onChange(!checked)}
className={`w-12 h-6 rounded-full transition-all ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
aria-label="Toggle status"
>
<span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-all ${checked ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} />
</button>
);
}