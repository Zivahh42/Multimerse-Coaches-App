import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import RatingStars from './RatingStars';
import StatusToggle from './StatusToggle';


const schema = z.object({
name: z.string().min(2),
email: z.string().email(),
category: z.string().min(2),
rating: z.number().min(1).max(5),
status: z.enum(['active','inactive'])
});


type FormData = z.infer<typeof schema>;


type Props = {
open: boolean;
initial?: Partial<FormData>;
onSubmit: (data: FormData) => void;
onClose: () => void;
};


export default function CoachFormModal({ open, initial, onSubmit, onClose }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', category: '', rating: 3, status: 'active' }
  });

  useEffect(() => {
    if (open) reset({
      name: initial?.name ?? '',
      email: initial?.email ?? '',
      category: initial?.category ?? '',
      rating: initial?.rating ?? 3,
      status: (initial?.status as 'active'|'inactive') ?? 'active'
    });
  }, [open, initial, reset]);

  const rating = watch('rating');
  const status = watch('status');

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl max-w-md w-full p-6 space-y-4">
        <h3 className="text-lg font-semibold">{initial ? 'Edit Coach' : 'Add Coach'}</h3>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full px-3 py-2 rounded-lg border bg-transparent" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full px-3 py-2 rounded-lg border bg-transparent" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input className="w-full px-3 py-2 rounded-lg border bg-transparent" {...register('category')} />
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Rating</label>
            <RatingStars value={rating} onChange={(value) => setValue('rating', value)} />
            {errors.rating && <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <StatusToggle checked={status === 'active'} onChange={(checked) => setValue('status', checked ? 'active' : 'inactive')} />
            {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-3 py-2 rounded-lg bg-blue-600 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}