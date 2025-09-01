import React, { useState } from 'react';
import { Download, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell' | 'transfer' | 'receive';
  asset: string;
  amount: number;
  price: number;
  value: number;
  fee: number;
  wallet: string;
  hash?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-01-07T10:30:00Z',
    type: 'buy',
    asset: 'Bitcoin',
    amount: 0.1,
    price: 65432,
    value: 6543.2,
    fee: 15.25,
    wallet: 'MetaMask Principal',
    hash: '0x1234...abcd',
  },
  {
    id: '2',
    date: '2025-01-06T15:45:00Z',
    type: 'sell',
    asset: 'Ethereum',
    amount: 0.5,
    price: 3450,
    value: 1725,
    fee: 8.50,
    wallet: 'Ledger Hardware',
    hash: '0x5678...efgh',
  },
  {
    id: '3',
    date: '2025-01-05T09:15:00Z',
    type: 'transfer',
    asset: 'Cardano',
    amount: 500,
    price: 0.85,
    value: 425,
    fee: 2.00,
    wallet: 'MetaMask Principal',
    hash: '0x9abc...ijkl',
  },
];

export const History: React.FC = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell' | 'transfer'>('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getTypeLabel = (type: Transaction['type']) => {
    const labels = {
      buy: 'Compra',
      sell: 'Venda',
      transfer: 'Transferência',
      receive: 'Recebimento',
    };
    return labels[type];
  };

  const getTypeColor = (type: Transaction['type']) => {
    const colors = {
      buy: 'bg-green-100 text-green-800',
      sell: 'bg-red-100 text-red-800',
      transfer: 'bg-blue-100 text-blue-800',
      receive: 'bg-purple-100 text-purple-800',
    };
    return colors[type];
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.wallet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalValue = filteredTransactions.reduce((sum, t) => sum + t.value, 0);
  const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0);

  const exportToCSV = () => {
    const headers = ['Data', 'Tipo', 'Ativo', 'Quantidade', 'Preço', 'Valor', 'Taxa', 'Wallet'];
    const rows = filteredTransactions.map(t => [
      format(new Date(t.date), 'dd/MM/yyyy HH:mm'),
      getTypeLabel(t.type),
      t.asset,
      t.amount,
      t.price,
      t.value,
      t.fee,
      t.wallet,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historico-transacoes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transacionado</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(totalValue)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total em Taxas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(totalFees)}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transações</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{filteredTransactions.length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os tipos</option>
              <option value="buy">Compras</option>
              <option value="sell">Vendas</option>
              <option value="transfer">Transferências</option>
            </select>
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Data</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tipo</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Ativo</th>
                <th className="text-right py-3 px-6 font-medium text-gray-700">Quantidade</th>
                <th className="text-right py-3 px-6 font-medium text-gray-700">Preço</th>
                <th className="text-right py-3 px-6 font-medium text-gray-700">Valor</th>
                <th className="text-right py-3 px-6 font-medium text-gray-700">Taxa</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Wallet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(transaction.date), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(transaction.date), 'HH:mm', { locale: ptBR })}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {getTypeLabel(transaction.type)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{transaction.asset}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-gray-900">
                      {transaction.amount.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(transaction.price)}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(transaction.value)}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="text-sm text-gray-600">
                      {formatCurrency(transaction.fee)}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{transaction.wallet}</p>
                    {transaction.hash && (
                      <p className="text-xs text-gray-500 font-mono">
                        {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-4)}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};