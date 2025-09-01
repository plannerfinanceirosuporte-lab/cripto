import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PortfolioAsset } from '../../hooks/useCryptoData';

interface AssetTableProps {
  assets: PortfolioAsset[];
}

export const AssetTable: React.FC<AssetTableProps> = ({ assets }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Seus Ativos</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Ativo</th>
              <th className="text-right py-3 px-6 font-medium text-gray-700">Preço</th>
              <th className="text-right py-3 px-6 font-medium text-gray-700">Holdings</th>
              <th className="text-right py-3 px-6 font-medium text-gray-700">Valor</th>
              <th className="text-right py-3 px-6 font-medium text-gray-700">24h</th>
              <th className="text-right py-3 px-6 font-medium text-gray-700">Alocação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => {
              const isPositive = asset.price_change_percentage_24h >= 0;
              
              return (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={asset.image} 
                        alt={asset.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{asset.name}</p>
                        <p className="text-sm text-gray-500 uppercase">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(asset.current_price)}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-gray-900">
                      {asset.holdings.toLocaleString('pt-BR', { 
                        maximumFractionDigits: 6 
                      })}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(asset.value)}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {formatPercentage(asset.price_change_percentage_24h)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${asset.allocation}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {asset.allocation.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};