import React, { useState } from 'react';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface Alert {
  id: string;
  asset: string;
  type: 'price_above' | 'price_below' | 'percentage_change';
  target: number;
  current: number;
  isActive: boolean;
  createdAt: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    asset: 'Bitcoin',
    type: 'price_above',
    target: 70000,
    current: 65432,
    isActive: true,
    createdAt: '2025-01-07',
  },
  {
    id: '2',
    asset: 'Ethereum',
    type: 'price_below',
    target: 3200,
    current: 3450,
    isActive: true,
    createdAt: '2025-01-06',
  },
  {
    id: '3',
    asset: 'Cardano',
    type: 'percentage_change',
    target: 15,
    current: 2.3,
    isActive: false,
    createdAt: '2025-01-05',
  },
];

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showAddModal, setShowAddModal] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getAlertTypeLabel = (type: Alert['type']) => {
    const labels = {
      price_above: 'Preço acima de',
      price_below: 'Preço abaixo de',
      percentage_change: 'Variação de',
    };
    return labels[type];
  };

  const getAlertIcon = (type: Alert['type']) => {
    const icons = {
      price_above: TrendingUp,
      price_below: TrendingDown,
      percentage_change: Bell,
    };
    const Icon = icons[type];
    return <Icon className="w-4 h-4" />;
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertas de Preço</h1>
          <p className="text-gray-600 mt-1">Configure alertas para seus ativos favoritos</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Alerta
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertas Ativos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {alerts.filter(a => a.isActive).length}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Alertas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{alerts.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disparados Hoje</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Seus Alertas</h2>
        </div>

        <div className="p-6">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum alerta configurado</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Criar seu primeiro alerta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      alert.type === 'price_above' ? 'bg-green-50' :
                      alert.type === 'price_below' ? 'bg-red-50' : 'bg-blue-50'
                    }`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.asset}</h3>
                      <p className="text-sm text-gray-600">
                        {getAlertTypeLabel(alert.type)} {' '}
                        {alert.type === 'percentage_change' 
                          ? `${alert.target}%` 
                          : formatCurrency(alert.target)
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        Valor atual: {formatCurrency(alert.current)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alert.isActive}
                        onChange={() => toggleAlert(alert.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Alerta</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ativo
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="cardano">Cardano (ADA)</option>
                  <option value="chainlink">Chainlink (LINK)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Alerta
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="price_above">Preço acima de</option>
                  <option value="price_below">Preço abaixo de</option>
                  <option value="percentage_change">Variação percentual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Alvo
                </label>
                <input
                  type="number"
                  placeholder="Ex: 70000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                Criar Alerta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};