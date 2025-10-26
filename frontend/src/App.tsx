import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, API_BASE } from './api/client';
import { Coach } from './types';
import CoachesTable from './components/CoachesTable';
import CoachFormModal from './components/CoachFormModal';
import ConfirmDialog from './components/ConfirmDialog';
import SearchFilterBar from './components/SearchFilterBar';
import { toast } from 'sonner';


export default function App() {
const qc = useQueryClient();
const [openForm, setOpenForm] = useState(false);
const [editing, setEditing] = useState<Coach | null>(null);
const [confirm, setConfirm] = useState<{open: boolean; coach?: Coach}>({open: false});
const [search, setSearch] = useState('');
const [category, setCategory] = useState('All');


const { data = [], isLoading, refetch } = useQuery<Coach[]>({
queryKey: ['coaches', { search, category }],
queryFn: async () => {
const params: any = {};
if (search) params.q = search;
if (category) params.category = category;
const res = await api.get('/coaches', { params });
return res.data as Coach[];
}
});


const categories = useMemo(() => Array.from(new Set(data.map(d => d.category))).sort(), [data]);


const createMutation = useMutation({
mutationFn: async (body: Omit<Coach,'id'|'createdAt'>) => (await api.post('/coaches', body)).data as Coach,
onSuccess: () => { toast.success('Coach created'); qc.invalidateQueries({ queryKey: ['coaches'] }); setOpenForm(false); }
});


const updateMutation = useMutation({
mutationFn: async ({ id, body }: { id: string; body: Partial<Coach> }) => (await api.put(`/coaches/${id}`, body)).data as Coach,
onSuccess: () => { toast.success('Coach updated'); qc.invalidateQueries({ queryKey: ['coaches'] }); setEditing(null); setOpenForm(false); }
});


const deleteMutation = useMutation({
mutationFn: async (id: string) => (await api.delete(`/coaches/${id}`)).data,
onSuccess: () => { toast.success('Coach deleted'); qc.invalidateQueries({ queryKey: ['coaches'] }); }
});


function onAdd() {
setEditing(null);
setOpenForm(true);
}
function onEdit(c: Coach) {
setEditing(c);
setOpenForm(true);
}
}