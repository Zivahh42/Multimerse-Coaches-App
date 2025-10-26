import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles.css';
import { Toaster } from 'sonner';


const qc = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<QueryClientProvider client={qc}>
<App />
<Toaster richColors position="top-right" />
</QueryClientProvider>
</React.StrictMode>
);