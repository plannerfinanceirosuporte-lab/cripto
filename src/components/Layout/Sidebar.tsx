import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Bell, 
  History, 
  User, 
  LogOut,
  Bitcoin 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Wallets', href: '/wallets', icon: Wallet },
  { name: 'Alertas', href: '/alerts', icon: Bell },
  { name: 'Histórico', href: '/history', icon: History },
  { name: 'Perfil', href: '/profile', icon: User },
];

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Bitcoin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-gray-900">CryptoPortfolio</h1>
          <p className="text-sm text-gray-500">Manager</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </div>
  );
};