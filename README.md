# 🏋️ Multimerse — Coaches Admin Panel

A minimal full-stack **Admin Panel** to manage Coaches with end-to-end CRUD.
- **Frontend:** React + TypeScript + Vite + Tailwind + React Query + RHF + Zod + Axios + Sonner (+ shadcn/ui optional)
- **Backend:** Node.js (Express) + lowdb (JSON file DB) + Zod + nanoid + CORS

---

## ✅ Prerequisites (Install these first)

- **Node.js 18+ (LTS) or 20+** → https://nodejs.org  
  (Comes with **npm**. Verify with `node -v` and `npm -v`.)
- **Git** → https://git-scm.com (to clone & push)
- *(Optional)* A code editor like VS Code

---

## 📦 Clone & Project Structure

```bash
git clone https://github.com/<your-username>/multimerse-coaches-admin.git
cd multimerse-coaches-admin
```

Structure:
```
multimerse-coaches-admin/
├─ README.md
├─ backend/
│  ├─ package.json
│  ├─ .env.example
│  ├─ src/
│  │  ├─ server.js
│  │  ├─ db.js
│  │  ├─ validators.js
│  │  └─ routes/
│  │     └─ coaches.js
│  └─ db/
│     └─ coaches.json
└─ frontend/
   ├─ package.json
   ├─ index.html
   ├─ postcss.config.js
   ├─ tailwind.config.js
   ├─ tsconfig.json
   ├─ vite.config.ts
   └─ src/...
```

---

## 🔧 Backend Setup (Express + lowdb)

1) Go to backend and install:
```bash
cd backend
npm install
```

2) Create your `.env` from the example:

**Windows (cmd/PowerShell):**
```bat
copy .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

3) Start the API:
```bash
npm run dev
```

If it’s working, you’ll see:
```
API running on http://localhost:4000
```

4) Test in your browser:
```
http://localhost:4000/
```
Expected JSON:
```json
{ "ok": true, "service": "multimerse-backend" }
```

### Backend .env variables
```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

> If port 4000 is busy, change `PORT` here and also update the frontend’s `VITE_API_BASE`.

---

## 🎨 Frontend Setup (Vite + React + Tailwind)

1) Open a **new terminal** and go to frontend:
```bash
cd ../frontend
npm install
```

2) (Optional but recommended) Create `.env` to point to your API:
```env
# frontend/.env
VITE_API_BASE=http://localhost:4000
```

3) Run the dev server:
```bash
npm run dev
```

You should see:
```
VITE v5.x ready
➜ Local:  http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

---

## 🧪 What you can do in the app

- **Add** a coach (name, email, category, rating 1–5, status active/inactive)
- **Edit** a coach
- **Delete** a coach (with confirmation)
- **Search** by name/email
- **Filter** by category
- Star **rating display** & **status badge**
- Toast notifications on success/error

> Data persists to `backend/db/coaches.json` locally.

---

## 📡 API Endpoints (for testing)

Base URL: `http://localhost:4000`

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/coaches`         | List coaches (`?q=` search, `?category=`)    |
| GET    | `/coaches/:id`     | Get coach by id                               |
| POST   | `/coaches`         | Create coach                                  |
| PUT    | `/coaches/:id`     | Update coach                                  |
| DELETE | `/coaches/:id`     | Delete coach                                  |

### Sample body (POST/PUT)
```json
{
  "name": "Ananya Rao",
  "email": "ananya@fitcoach.com",
  "category": "Fitness",
  "rating": 5,
  "status": "active"
}
```

---

## 🪄 Optional: shadcn/ui (for polished UI)

> Already integrated in this repo if you followed the setup—if not, run these in `/frontend`:

1) Initialize:
```bash
npx shadcn@latest init
```

2) Add components:
```bash
npx shadcn@latest add button dialog alert-dialog input label select switch
```

Use imports like:
```ts
import { Button } from "@/components/ui/button";
```

If the CLI asks for **import alias**, ensure `frontend/tsconfig.json` has:
```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```
and `vite.config.ts` has:
```ts
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

---

## 🚀 Running Both (Quick Recap)

**Terminal 1 → Backend**
```bash
cd backend
npm install
npm run dev
# http://localhost:4000
```

**Terminal 2 → Frontend**
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

---

## 🧰 Troubleshooting

### Frontend shows `ERR_CONNECTION_REFUSED` to the API
- Backend terminal must show: `API running on http://localhost:4000`
- Visit `http://localhost:4000/` → should return JSON
- If backend uses a different port, set `frontend/.env`:
  ```
  VITE_API_BASE=http://localhost:<PORT>
  ```
  then **restart** `npm run dev` (frontend)

### CORS error in browser console
- Ensure `backend/.env` has:
  ```
  CORS_ORIGIN=http://localhost:5173
  ```
- Restart backend

### Port already in use
- Change `PORT` in `backend/.env` (e.g., 5001)
- Update `VITE_API_BASE` accordingly
- Restart both servers

### shadcn import error like `Cannot find module '@/components/ui/button'`
- Run `npx shadcn@latest add button` in `/frontend`
- Confirm alias in `tsconfig.json` & `vite.config.ts`
- Restart Vite and your editor (TS cache)

### Windows: copying `.env`
- Use `copy .env.example .env` (not `cp`)

---

## 📸 (Optional) Screenshots
Add a few images/GIFs showing:
- Table view
- Add/Edit form
- Delete confirmation
- Search + filter

---

## 🌐 (Optional) Deployment Quick Notes

**Frontend (Vercel):**
- Root: `/frontend`
- Env: `VITE_API_BASE=https://<your-backend-host>`

**Backend (Render):**
- Root: `/backend`
- Start: `node ./src/server.js`
- Env:  
  - `PORT` (Render provides)  
  - `CORS_ORIGIN=https://<your-vercel-app>.vercel.app`
  - (Optional) Persistent Disk: mount `/data`, set `DATA_DIR=/data`

---

## 📄 License
MIT
