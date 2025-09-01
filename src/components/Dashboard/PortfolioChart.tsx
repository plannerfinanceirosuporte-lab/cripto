import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data
const generateChartData = (period: '7d' | '30d' | '90d') => {
  const points = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const data = [];
  let baseValue = 25000;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * 2000;
    baseValue += change;
    data.push({
      date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(baseValue, 10000),
    });
  }
  
  return data;
};

export const PortfolioChart: React.FC = () => {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const data = generateChartData(period);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const periods = [
    { key: '7d', label: '7 dias' },
    { key: '30d', label: '30 dias' },
    { key: '90d', label: '90 dias' },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Performance do Portfólio</h2>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                period === p.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { 
                month: 'short', 
                day: 'numeric' 
              })}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
              }}
              formatter={(value: number) => [formatCurrency(value), 'Valor']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};