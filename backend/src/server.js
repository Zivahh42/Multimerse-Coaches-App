import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { initDb } from './db.js';
import coachesRouter from './routes/coaches.js';


const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.CORS_ORIGIN || '*';


app.use(cors({ origin: ORIGIN }));
app.use(express.json());


app.get('/', (_, res) => res.json({ ok: true, service: 'multimerse-backend' }));
app.use('/coaches', coachesRouter);


await initDb();
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));