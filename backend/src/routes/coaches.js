import { Router } from 'express';
const router = Router();

// GET /coaches
router.get('/', async (req, res) => {
  const { category } = req.query;
  await db.read();
  let list = db.data.coaches;
  if (category && category !== 'All') {
	list = list.filter(c => c.category.toLowerCase() === String(category).toLowerCase());
  }
  res.json(list);
});


// GET /coaches/:id
router.get('/:id', async (req, res) => {
await db.read();
const coach = db.data.coaches.find(c => c.id === req.params.id);
if (!coach) return res.status(404).json({ message: 'Coach not found' });
res.json(coach);
});


// POST /coaches
router.post('/', async (req, res) => {
try {
const data = parseCoach({ ...req.body, rating: Number(req.body.rating) });
const coach = {
id: nanoid(),
name: data.name,
email: data.email,
category: data.category,
rating: data.rating,
status: data.status,
createdAt: new Date().toISOString()
};
await db.read();
db.data.coaches.push(coach);
await db.write();
res.status(201).json(coach);
} catch (e) {
res.status(400).json({ message: e.errors?.[0]?.message || e.message });
}
});


// PUT /coaches/:id
router.put('/:id', async (req, res) => {
try {
const patch = parseCoach({ ...req.body, rating: Number(req.body.rating) });
await db.read();
const idx = db.data.coaches.findIndex(c => c.id === req.params.id);
if (idx === -1) return res.status(404).json({ message: 'Coach not found' });


const prev = db.data.coaches[idx];
const updated = { ...prev, ...patch, id: prev.id, createdAt: prev.createdAt };
db.data.coaches[idx] = updated;
await db.write();
res.json(updated);
} catch (e) {
res.status(400).json({ message: e.errors?.[0]?.message || e.message });
}
});


// DELETE /coaches/:id
router.delete('/:id', async (req, res) => {
await db.read();
const before = db.data.coaches.length;
db.data.coaches = db.data.coaches.filter(c => c.id !== req.params.id);
if (db.data.coaches.length === before) {
return res.status(404).json({ message: 'Coach not found' });
}
await db.write();
res.status(204).send();
});


export default router;
