import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, API_BASE } from './api/client';
import { Coach } from './types';
import CoachesTable from './components/CoachesTable';
import CoachFormModal from './components/CoachFormModal';
import SearchFilterBar from './components/SearchFilterBar';
import { toast } from 'sonner';

// ✅ shadcn/ui
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function App() {
  const qc = useQueryClient();
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Coach | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [coachToDelete, setCoachToDelete] = useState<Coach | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

    const { data: allCoaches = [] } = useQuery<Coach[]>({
      queryKey: ['coaches'],
      queryFn: async () => {
        const res = await api.get('/coaches');
        return res.data as Coach[];
      }
    });

    const { data: filteredCoaches = [] } = useQuery<Coach[]>({
      queryKey: ['coaches', { search, category }],
      queryFn: async () => {
        const params: any = {};
        if (search) params.q = search;
        if (category !== 'All') params.category = category;
        const res = await api.get('/coaches', { params });
        return res.data as Coach[];
      }
    });

    const categories = useMemo(
      () => Array.from(new Set(allCoaches.map(d => d.category).filter(Boolean))).sort(),
      [allCoaches]
    );

  const createMutation = useMutation({
    mutationFn: async (body: Omit<Coach, 'id' | 'createdAt'>) =>
      (await api.post('/coaches', body)).data as Coach,
    onSuccess: () => {
      toast.success('Coach created');
      qc.invalidateQueries({ queryKey: ['coaches'] });
      setOpenForm(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<Coach> }) =>
      (await api.put(`/coaches/${id}`, body)).data as Coach,
    onSuccess: () => {
      toast.success('Coach updated');
      qc.invalidateQueries({ queryKey: ['coaches'] });
      setEditing(null);
      setOpenForm(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/coaches/${id}`)).data,
    onSuccess: () => {
      toast.success('Coach deleted');
      qc.invalidateQueries({ queryKey: ['coaches'] });
    }
  });

  function onAdd() {
    setEditing(null);
    setOpenForm(true);
  }

  function onEdit(c: Coach) {
    setEditing(c);
    setOpenForm(true);
  }

  function onDelete(c: Coach) {
    setCoachToDelete(c);
    setConfirmOpen(true);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold">Coaches Admin</h1>
          <p className="text-sm text-neutral-500">
            API: <code>{API_BASE}</code>
          </p>
        </div>

        {/* ✅ shadcn Button */}
        <Button onClick={onAdd}>Add Coach</Button>
      </header>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

    <CoachesTable data={filteredCoaches} onEdit={onEdit} onDelete={onDelete} />

      {/* Existing modal kept for now */}
      <CoachFormModal
        open={openForm}
        initial={editing ?? undefined}
        onClose={() => {
          setOpenForm(false);
          setEditing(null);
        }}
        onSubmit={(form) => {
          if (editing) {
            updateMutation.mutate({ id: editing.id, body: form });
          } else {
            createMutation.mutate(form as any);
          }
        }}
      />

      {/* ✅ shadcn AlertDialog for delete confirm */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {coachToDelete?.name ?? 'Coach'}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the coach.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (coachToDelete) {
                  deleteMutation.mutate(coachToDelete.id);
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
