import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Wallets } from './pages/Wallets';
import { Alerts } from './pages/Alerts';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1F2937',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
        
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Layout title="Dashboard" subtitle="Visão geral do seu portfólio" />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/wallets" element={<Layout title="Wallets" subtitle="Gerencie suas carteiras e exchanges" />}>
              <Route index element={<Wallets />} />
            </Route>
            <Route path="/alerts" element={<Layout title="Alertas" subtitle="Configure alertas de preço e variação" />}>
              <Route index element={<Alerts />} />
            </Route>
            <Route path="/history" element={<Layout title="Histórico" subtitle="Todas suas transações em um só lugar" />}>
              <Route index element={<History />} />
            </Route>
            <Route path="/profile" element={<Layout title="Perfil" subtitle="Configurações da conta e segurança" />}>
              <Route index element={<Profile />} />
            </Route>
          </Routes>
        </ProtectedRoute>
      </div>
    </Router>
  );
}

export default App;