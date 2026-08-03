import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AppSinhala from './AppSinhala.tsx';
import AdminPage from './AdminPage.tsx';
import './index.css';

const path = window.location.pathname;
const isSinhala = path.toLowerCase().startsWith('/sinhala');
const isAdmin = path.toLowerCase().startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  isAdmin ? <AdminPage /> : isSinhala ? <AppSinhala /> : <App />,
);
