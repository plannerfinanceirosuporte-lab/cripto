import React, { useState } from 'react';
import { Plus, Wallet, Link, Trash2, DollarSign } from 'lucide-react';

interface WalletData {
  id: string;
  name: string;
  type: 'metamask' | 'ledger' | 'coinbase' | 'trust';
  address: string;
  balance: number;
  isConnected: boolean;
}

const mockWallets: WalletData[] = [
  {
    id: '1',
    name: 'MetaMask Principal',
    type: 'metamask',
    address: '0x742d35Cc6aF06532857a7e92B87a7a24ccB',
    balance: 15420.50,
    isConnected: true,
  },
  {
    id: '2',
    name: 'Ledger Hardware',
    type: 'ledger',
    address: '0x8ba1f109551bD432803012645Hac189B739',
    balance: 8750.25,
    isConnected: true,
  },
];

export const Wallets: React.FC = () => {
  const [wallets, setWallets] = useState<WalletData[]>(mockWallets);
  const [showAddModal, setShowAddModal] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getWalletIcon = (type: string) => {
    const icons = {
      metamask: '🦊',
      ledger: '🔒',
      coinbase: '🔵',
      trust: '🛡️',
    };
    return icons[type as keyof typeof icons] || '💼';
  };

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total em Wallets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wallets Conectadas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {wallets.filter(w => w.isConnected).length}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Link className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Wallets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{wallets.length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Wallets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Suas Wallets</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Wallet
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getWalletIcon(wallet.type)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{wallet.name}</h3>
                      <p className="text-sm text-gray-500 font-mono">
                        {formatAddress(wallet.address)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      wallet.isConnected ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Saldo</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(wallet.balance)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-medium ${
                      wallet.isConnected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {wallet.isConnected ? 'Conectada' : 'Desconectada'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Wallet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Nova Wallet</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Wallet
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="metamask">MetaMask</option>
                  <option value="ledger">Ledger</option>
                  <option value="coinbase">Coinbase Wallet</option>
                  <option value="trust">Trust Wallet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Wallet
                </label>
                <input
                  type="text"
                  placeholder="Ex: Minha MetaMask"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Conectar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};